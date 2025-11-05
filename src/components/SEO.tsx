import { Helmet } from 'react-helmet-async';

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
  ogImageAlt,
  ogImageWidth = '1200',
  ogImageHeight = '630',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  twitterSite = '@3bi_ai',
  twitterCreator = '@3bi_ai',
  article,
  robots = 'index, follow',
  lang = 'en',
  structuredData,
  preconnect = [],
  dnsPrefetch = [],
}: SEOProps) {
  const fullTitle = title ? `${title} | 3BI.AI` : defaultTitle;
  const currentUrl = canonical || window.location.href;
  const imageAlt = ogImageAlt || fullTitle;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <html lang={lang} />
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <link rel="canonical" href={currentUrl} />
      <meta name="robots" content={robots} />
      <meta name="language" content="English" />
      <meta name="author" content="3BI.AI" />

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
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(structuredData) ? structuredData : structuredData)}
        </script>
      )}
    </Helmet>
  );
}
