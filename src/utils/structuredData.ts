/**
 * Utility functions for generating structured data (JSON-LD) for SEO
 */

interface Organization {
  name: string;
  url: string;
  logo: string;
  description: string;
  sameAs?: string[];
  contactPoint?: {
    "@type": string;
    telephone?: string;
    email?: string;
    contactType: string;
  };
}

interface WebSite {
  url: string;
  name: string;
  description: string;
  potentialAction?: {
    "@type": string;
    target: string;
    "query-input": string;
  };
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface PricingPlan {
  name: string;
  price: string;
  priceCurrency: string;
  description: string;
  features: string[];
}

interface Tutorial {
  name: string;
  description: string;
  duration: string;
  level: string;
  url: string;
}

/**
 * Generate Organization structured data
 */
export function generateOrganizationSchema(customData?: Partial<Organization>) {
  const org: Organization = {
    name: "3BI.AI",
    url: "https://3bi.ai",
    logo: "https://3bi.ai/og-image.png",
    description: "Enterprise AI Platform integrating Grok, Claude 4, GPT-5, and more. Advanced multi-modal memory, real-time collaboration, and enterprise-grade AI tools.",
    sameAs: [
      "https://twitter.com/3bi_ai",
      "https://linkedin.com/company/3bi-ai",
      "https://github.com/3bi-ai",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "contact@3bi.ai",
      contactType: "Customer Support",
    },
    ...customData,
  };

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    ...org,
  };
}

/**
 * Generate WebSite structured data with search action
 */
export function generateWebsiteSchema(customData?: Partial<WebSite>) {
  const website: WebSite = {
    url: "https://3bi.ai",
    name: "3BI.AI",
    description: "Premium AI platform integrating Grok, Claude 4, GPT-5, and more.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://3bi.ai/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
    ...customData,
  };

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    ...website,
  };
}

/**
 * Generate BreadcrumbList structured data
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate FAQPage structured data
 */
export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate Product structured data for pricing plans
 */
export function generateProductSchema(plan: PricingPlan) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: plan.name,
    description: plan.description,
    offers: {
      "@type": "Offer",
      price: plan.price,
      priceCurrency: plan.priceCurrency,
      availability: "https://schema.org/InStock",
    },
  };
}

/**
 * Generate SoftwareApplication structured data
 */
export function generateSoftwareAppSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "3BI.AI",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, iOS, Android",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description: "Unified AI platform with 12 premium models including Grok 3, Claude Opus 4, GPT-5, and Gemini 2.0 Pro. Enterprise workflows, team collaboration, and advanced analytics.",
  };
}

/**
 * Generate Course structured data for tutorials
 */
export function generateCourseSchema(tutorial: Tutorial) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: tutorial.name,
    description: tutorial.description,
    provider: {
      "@type": "Organization",
      name: "3BI.AI",
      sameAs: "https://3bi.ai",
    },
    coursePrerequisites: tutorial.level === "Beginner" ? "None" : "Basic AI knowledge",
    timeRequired: tutorial.duration,
    educationalLevel: tutorial.level,
    url: tutorial.url,
  };
}

/**
 * Generate TechArticle structured data for documentation
 */
export function generateTechArticleSchema(article: {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: article.title,
    description: article.description,
    url: article.url,
    datePublished: article.datePublished || new Date().toISOString(),
    dateModified: article.dateModified || new Date().toISOString(),
    author: {
      "@type": "Organization",
      name: "3BI.AI",
    },
    publisher: {
      "@type": "Organization",
      name: "3BI.AI",
      logo: {
        "@type": "ImageObject",
        url: "https://3bi.ai/og-image.png",
      },
    },
  };
}

/**
 * Generate VideoObject structured data
 */
export function generateVideoSchema(video: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration: string;
  contentUrl: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: video.name,
    description: video.description,
    thumbnailUrl: video.thumbnailUrl,
    uploadDate: video.uploadDate,
    duration: video.duration,
    contentUrl: video.contentUrl,
    embedUrl: video.contentUrl,
  };
}

/**
 * Combine multiple structured data schemas
 */
export function combineSchemas(...schemas: object[]) {
  return {
    "@context": "https://schema.org",
    "@graph": schemas,
  };
}
