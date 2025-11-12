import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { requireAuth } from '../_shared/auth.ts';
import { validateUrl } from '../_shared/validation.ts';
import { isRateLimited, getRateLimitHeaders, createRateLimitResponse } from '../_shared/rateLimit.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Require authentication
    const user = await requireAuth(req);
    
    // Rate limiting: 10 requests per minute (scraping is resource-intensive)
    const rateLimitResult = isRateLimited(user.id, { windowMs: 60000, maxRequests: 10 });
    const rateLimitHeaders = getRateLimitHeaders(user.id, { windowMs: 60000, maxRequests: 10 });
    
    if (rateLimitResult.limited) {
      return createRateLimitResponse(rateLimitResult.resetAt);
    }

    const { url, options = {} } = await req.json();
    
    // Validate URL
    validateUrl(url, 'url');

    console.log('Scraping website:', url);
    
    // Use a web scraping service or API
    // For demo purposes, we'll create a simple scraper
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch website: ${response.status}`);
    }

    const html = await response.text();
    
    // Extract useful information
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1] : 'No title found';
    
    const metaDescMatch = html.match(/<meta[^>]*name=["\']description["\'][^>]*content=["\']([^"']+)["\'][^>]*>/i);
    const description = metaDescMatch ? metaDescMatch[1] : 'No description found';
    
    // Extract headings
    const headingMatches = html.match(/<h[1-6][^>]*>([^<]+)<\/h[1-6]>/gi);
    const headings = headingMatches ? headingMatches.map(h => h.replace(/<[^>]*>/g, '')) : [];
    
    // Extract links
    const linkMatches = html.match(/<a[^>]*href=["\']([^"']+)["\'][^>]*>([^<]*)<\/a>/gi);
    const links = linkMatches ? linkMatches.slice(0, 10).map(link => {
      const hrefMatch = link.match(/href=["\']([^"']+)["\']/);
      const textMatch = link.match(/>([^<]*)</);
      return {
        url: hrefMatch ? hrefMatch[1] : '',
        text: textMatch ? textMatch[1] : ''
      };
    }) : [];

    // Extract text content (simplified)
    const textContent = html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, 2000);

    const scrapedData = {
      url,
      title,
      description,
      headings: headings.slice(0, 10),
      links,
      textContent,
      timestamp: new Date().toISOString(),
      wordCount: textContent.split(' ').length
    };

    return new Response(JSON.stringify({
      success: true,
      data: scrapedData
    }), {
      headers: { ...corsHeaders, ...rateLimitHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in web-scraper function:', error);
    return new Response(JSON.stringify({ 
      success: false,
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});