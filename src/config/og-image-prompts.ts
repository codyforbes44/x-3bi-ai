/**
 * OG Image Generation Prompts
 * Consistent prompts for generating Open Graph images for all routes
 */

export interface OGImageConfig {
  route: string;
  filename: string;
  title: string;
  prompt: string;
  priority: number;
}

// Base prompt template for consistency
const basePrompt = `Create a professional Open Graph social media image in 1200x630px dimensions (16:9 aspect ratio). 
Ultra high resolution, modern gradient design with purple (#7C3AED) to blue (#3B82F6) color scheme. 
Clean, minimalist design with bold typography. Professional tech aesthetic.`;

export const OG_IMAGE_CONFIGS: OGImageConfig[] = [
  {
    route: '/',
    filename: 'home.png',
    title: 'Home - Enterprise AI Platform',
    prompt: `${basePrompt}
    
Main text: "3BI.AI - Enterprise AI Platform"
Subtitle: "Grok, Claude 4, GPT-5 & 27+ AI Models"
Visual elements: Abstract AI neural network pattern, floating holographic UI elements
Background: Deep purple to blue gradient with subtle grid pattern
Add: Glowing AI particles, modern tech iconography
Style: Futuristic, professional, premium feel`,
    priority: 1,
  },
  {
    route: '/pricing',
    filename: 'pricing.png',
    title: 'Pricing Plans',
    prompt: `${basePrompt}
    
Main text: "Simple, Transparent Pricing"
Subtitle: "Plans starting at $49/month"
Visual elements: Three pricing tiers represented as elegant cards, upward trending graph
Background: Purple gradient with pricing table silhouettes
Add: Dollar sign icon, checkmark badges, premium badge
Style: Clean, professional, trust-building`,
    priority: 2,
  },
  {
    route: '/features',
    filename: 'ai-tools.png',
    title: '27 AI Features & Tools',
    prompt: `${basePrompt}
    
Main text: "27 Powerful AI Features"
Subtitle: "Chat • Image • Voice • Workflows • Analytics"
Visual elements: Grid of colorful AI tool icons, connected nodes
Background: Dynamic purple-blue gradient with floating tool icons
Add: AI brain icon, workflow diagram, analytics charts
Style: Dynamic, feature-rich, comprehensive`,
    priority: 3,
  },
  {
    route: '/grok-chat',
    filename: 'grok-chat.png',
    title: 'Grok AI Chat',
    prompt: `${basePrompt}
    
Main text: "Grok AI Chat"
Subtitle: "xAI's Advanced Conversational AI"
Visual elements: Chat bubbles with AI responses, Grok logo-inspired elements
Background: Dark purple gradient with chat interface mockup
Add: Lightning bolt for speed, message bubbles, AI avatar
Style: Conversational, modern, fast-paced`,
    priority: 4,
  },
  {
    route: '/documentation',
    filename: 'documentation.png',
    title: 'API Documentation',
    prompt: `${basePrompt}
    
Main text: "Complete API Documentation"
Subtitle: "REST API • SDKs • Code Examples"
Visual elements: Code snippets, API endpoint diagrams, developer tools
Background: Purple gradient with code editor mockup
Add: Terminal window, code brackets, documentation icon
Style: Technical, developer-focused, comprehensive`,
    priority: 5,
  },
  {
    route: '/learn',
    filename: 'learn.png',
    title: 'Learn AI - Courses & Resources',
    prompt: `${basePrompt}
    
Main text: "Master AI"
Subtitle: "500+ Courses, Tutorials & Resources"
Visual elements: Books, video play buttons, graduation cap, learning path diagram
Background: Bright purple-blue gradient with education icons
Add: Checkmark for completed courses, star ratings, certificate badge
Style: Educational, inspiring, comprehensive`,
    priority: 6,
  },
  {
    route: '/community',
    filename: 'community.png',
    title: 'AI Developer Community',
    prompt: `${basePrompt}
    
Main text: "Join Our Community"
Subtitle: "50K+ Developers • 25K+ Projects Built"
Visual elements: Connected user avatars, chat bubbles, collaboration icons
Background: Warm purple gradient with network connections
Add: People icons, Discord logo, GitHub icon
Style: Welcoming, collaborative, vibrant`,
    priority: 7,
  },
  {
    route: '/enterprise',
    filename: 'enterprise.png',
    title: 'Enterprise AI Solutions',
    prompt: `${basePrompt}
    
Main text: "Enterprise Solutions"
Subtitle: "Scalable AI for Large Organizations"
Visual elements: Corporate building, security shield, team collaboration icons
Background: Professional dark purple gradient with enterprise graphics
Add: Security badge, scale icon, SLA guarantee badge
Style: Professional, corporate, trustworthy`,
    priority: 8,
  },
  {
    route: '/api-access',
    filename: 'api-access.png',
    title: 'API Access & Integration',
    prompt: `${basePrompt}
    
Main text: "Powerful API Access"
Subtitle: "Integrate AI into Any Application"
Visual elements: API key, webhook icons, integration diagram
Background: Tech purple gradient with API connection lines
Add: Lock for security, plug icon for integration, code symbols
Style: Technical, secure, integration-focused`,
    priority: 9,
  },
  {
    route: '/tutorials',
    filename: 'tutorials.png',
    title: 'AI Tutorials & Guides',
    prompt: `${basePrompt}
    
Main text: "Step-by-Step Tutorials"
Subtitle: "From Beginner to Advanced AI"
Visual elements: Tutorial steps (1-2-3), video tutorials, how-to guides
Background: Educational purple-blue gradient with learning icons
Add: Play button, checklist, lightbulb for ideas
Style: Educational, approachable, step-by-step`,
    priority: 10,
  },
  {
    route: '/mission',
    filename: 'mission.png',
    title: 'Our Mission',
    prompt: `${basePrompt}
    
Main text: "Democratizing AI"
Subtitle: "Making Advanced AI Accessible to Everyone"
Visual elements: Globe with connection points, people reaching goals, mission statement
Background: Inspirational purple gradient with world map
Add: Target icon, upward arrow, diversity of people icons
Style: Inspirational, mission-driven, global`,
    priority: 11,
  },
  {
    route: '/team',
    filename: 'team.png',
    title: 'Our Team',
    prompt: `${basePrompt}
    
Main text: "Meet Our Team"
Subtitle: "AI Experts & Innovators"
Visual elements: Team silhouettes, collaboration icons, diverse team representation
Background: Warm purple gradient with team collaboration visuals
Add: People icons, handshake, star team members
Style: Professional, personable, team-oriented`,
    priority: 12,
  },
  {
    route: '/partners',
    filename: 'partners.png',
    title: 'Partner Program',
    prompt: `${basePrompt}
    
Main text: "Partner with 3BI.AI"
Subtitle: "Grow Together with AI Innovation"
Visual elements: Partnership handshake, connected companies, growth chart
Background: Professional purple gradient with partnership icons
Add: Handshake icon, growth arrow, partner badges
Style: Professional, collaborative, growth-focused`,
    priority: 13,
  },
  {
    route: '/usage-analytics',
    filename: 'analytics.png',
    title: 'Usage Analytics & Insights',
    prompt: `${basePrompt}
    
Main text: "Usage Analytics"
Subtitle: "Real-Time AI Performance Insights"
Visual elements: Analytics dashboards, charts, graphs, data visualization
Background: Data-driven purple gradient with chart backgrounds
Add: Bar charts, line graphs, pie charts, metric badges
Style: Data-focused, analytical, insightful`,
    priority: 14,
  },
  {
    route: '/memory',
    filename: 'memory.png',
    title: 'Multi-Modal AI Memory',
    prompt: `${basePrompt}
    
Main text: "Multi-Modal Memory"
Subtitle: "Persistent Context Across All AI Interactions"
Visual elements: Memory chips, brain neural network, data storage visualization
Background: Tech purple gradient with memory patterns
Add: Brain icon, database cylinders, connection nodes
Style: Technical, innovative, memory-focused`,
    priority: 15,
  },
];
