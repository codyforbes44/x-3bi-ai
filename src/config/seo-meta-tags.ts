/**
 * Additional SEO Meta Tags Configuration
 * Platform-wide meta tags for enhanced SEO
 */

export const ADDITIONAL_META_TAGS = {
  // Dublin Core meta tags for better semantic understanding
  dublinCore: {
    'DC.title': '3BI.AI - Enterprise AI Platform',
    'DC.creator': '3BI.AI Team',
    'DC.subject': 'Artificial Intelligence, Machine Learning, AI Platform',
    'DC.description': 'Enterprise AI platform with advanced capabilities',
    'DC.publisher': '3BI.AI',
    'DC.type': 'InteractiveResource',
    'DC.format': 'text/html',
    'DC.language': 'en',
  },

  // Additional Open Graph tags
  openGraph: {
    'og:site_name': '3BI.AI',
    'og:locale:alternate': ['es_ES', 'fr_FR', 'de_DE', 'ja_JP', 'zh_CN'],
    'fb:app_id': '', // Add if you have Facebook app integration
  },

  // Twitter Card enhancements
  twitter: {
    'twitter:site:id': '', // Add Twitter account ID if available
    'twitter:app:name:iphone': '3BI.AI',
    'twitter:app:name:ipad': '3BI.AI',
    'twitter:app:name:googleplay': '3BI.AI',
  },

  // Apple-specific meta tags
  apple: {
    'apple-itunes-app': '', // Add when app is published: app-id=YOUR_APP_ID
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': '3BI.AI',
    'format-detection': 'telephone=no',
  },

  // Microsoft-specific meta tags
  microsoft: {
    'msapplication-TileColor': '#7C3AED',
    'msapplication-config': '/browserconfig.xml',
    'msapplication-tooltip': '3BI.AI - Enterprise AI Platform',
  },

  // Schema.org Article meta tags
  article: {
    'article:publisher': 'https://3bi.ai',
    'article:author': '3BI.AI Team',
  },

  // Performance & Security hints
  resourceHints: {
    'dns-prefetch': [
      'https://jmazzsxnatfewblgpxfq.supabase.co',
      'https://fonts.googleapis.com',
      'https://www.google-analytics.com',
    ],
    preconnect: [
      'https://jmazzsxnatfewblgpxfq.supabase.co',
      'https://ai.gateway.lovable.dev',
    ],
    prefetch: [
      '/og/default.png',
    ],
  },
};

// Page-specific schema.org types
export const SCHEMA_TYPES = {
  home: 'WebSite',
  product: 'Product',
  article: 'TechArticle',
  faq: 'FAQPage',
  documentation: 'TechArticle',
  pricing: 'OfferCatalog',
  contact: 'ContactPage',
  about: 'AboutPage',
};

// Rich snippet configuration
export const RICH_SNIPPETS = {
  breadcrumbs: true,
  searchBox: true,
  siteLinks: true,
  logo: true,
  socialProfiles: true,
  organization: true,
};
