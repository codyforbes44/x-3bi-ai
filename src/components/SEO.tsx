import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  structuredData?: object;
}

const defaultTitle = '3BI.AI - Enterprise AI Platform with Grok, Claude 4, GPT-5';
const defaultDescription = 'Premium AI platform integrating Grok, Claude 4, GPT-5, and more. Advanced multi-modal memory, real-time collaboration, and enterprise-grade AI tools.';
const defaultKeywords = ['AI platform', 'Grok AI', 'Claude 4', 'GPT-5', 'enterprise AI', 'AI chat', 'multi-modal AI', 'AI memory system'];
const defaultOgImage = 'https://3bi.ai/og-image.png';

export function SEO({
  title,
  description = defaultDescription,
  keywords = defaultKeywords,
  canonical,
  ogImage = defaultOgImage,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  structuredData,
}: SEOProps) {
  const fullTitle = title ? `${title} | 3BI.AI` : defaultTitle;
  const currentUrl = canonical || window.location.href;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="3BI.AI" />

      {/* Twitter */}
      <meta property="twitter:card" content={twitterCard} />
      <meta property="twitter:url" content={currentUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="author" content="3BI.AI" />

      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}
