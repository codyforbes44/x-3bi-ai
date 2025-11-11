import { Helmet } from 'react-helmet-async';
import { SEO_CONFIG } from '@/config/seo-config';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogImageWidth?: string;
  ogImageHeight?: string;
  ogType?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterSite?: string;
  twitterCreator?: string;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
  robots?: string;
  lang?: string;
  structuredData?: object | object[];
  preconnect?: string[];
  dnsPrefetch?: string[];
  noIndex?: boolean;
  breadcrumbs?: Array<{ name: string; url: string }>;
}

export function SEO({
  title,
  description = SEO_CONFIG.defaultDescription,
  keywords = SEO_CONFIG.coreKeywords,
  canonical,
  ogImage = SEO_CONFIG.ogImages.default,
  ogImageAlt,
  ogImageWidth = '1200',
  ogImageHeight = '630',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  twitterSite = SEO_CONFIG.twitterSite,
  twitterCreator = SEO_CONFIG.twitterHandle,
  article,
  robots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  lang = 'en',
  structuredData,
  preconnect = SEO_CONFIG.preconnectDomains,
  dnsPrefetch = SEO_CONFIG.dnsPrefetchDomains,
  noIndex = false,
  breadcrumbs,
}: SEOProps) {
  const fullTitle = title ? `${title} | ${SEO_CONFIG.siteName}` : SEO_CONFIG.defaultTitle;
  const currentUrl = canonical || window.location.href;
  const imageAlt = ogImageAlt || fullTitle;
  
  // Generate breadcrumb structured data
  const breadcrumbSchema = breadcrumbs ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${SEO_CONFIG.siteUrl}${crumb.url}`,
    })),
  } : null;
  
  // Combine all structured data
  const allStructuredData = [
    structuredData,
    breadcrumbSchema,
  ].filter(Boolean);

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <html lang={lang} />
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <link rel="canonical" href={currentUrl} />
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : robots} />
      <meta name="googlebot" content={noIndex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'} />
      <meta name="bingbot" content={noIndex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'} />
      <meta name="language" content="English" />
      <meta name="author" content={SEO_CONFIG.siteName} />
      <meta name="geo.region" content="US" />
      <meta name="geo.placename" content="United States" />
      
      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content={SEO_CONFIG.siteName} />
      
      {/* Performance & Security */}
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="referrer" content="no-referrer-when-downgrade" />
      
      {/* Theme Color */}
      <meta name="theme-color" content="#7C3AED" />
      <meta name="msapplication-TileColor" content="#7C3AED" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:image:width" content={ogImageWidth} />
      <meta property="og:image:height" content={ogImageHeight} />
      <meta property="og:site_name" content="3BI.AI" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content={twitterSite} />
      <meta name="twitter:creator" content={twitterCreator} />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={imageAlt} />

      {/* Article Meta Tags */}
      {article && (
        <>
          {article.publishedTime && (
            <meta property="article:published_time" content={article.publishedTime} />
          )}
          {article.modifiedTime && (
            <meta property="article:modified_time" content={article.modifiedTime} />
          )}
          {article.author && (
            <meta property="article:author" content={article.author} />
          )}
          {article.section && (
            <meta property="article:section" content={article.section} />
          )}
          {article.tags && article.tags.map((tag) => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Preconnect & DNS Prefetch */}
      {preconnect.map((url) => (
        <link key={`preconnect-${url}`} rel="preconnect" href={url} crossOrigin="anonymous" />
      ))}
      {dnsPrefetch.map((url) => (
        <link key={`dns-${url}`} rel="dns-prefetch" href={url} />
      ))}

      {/* Structured Data */}
      {allStructuredData.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify(
            allStructuredData.length === 1 
              ? allStructuredData[0] 
              : { '@graph': allStructuredData }
          )}
        </script>
      )}
      
      {/* Additional SEO enhancements */}
      <link rel="alternate" hrefLang="en" href={currentUrl} />
      <link rel="alternate" hrefLang="es" href={currentUrl.replace('3bi.ai', '3bi.ai/es')} />
      <link rel="alternate" hrefLang="fr" href={currentUrl.replace('3bi.ai', '3bi.ai/fr')} />
      <link rel="alternate" hrefLang="x-default" href={currentUrl} />
    </Helmet>
  );
}
