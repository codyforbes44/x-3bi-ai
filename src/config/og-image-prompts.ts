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
    title: 'Home - Unified AI Platform',
    prompt: `${basePrompt}

Main text: "3BI.AI"
Subtitle: "Access 12 AI Models in One Platform"
Secondary text: "Grok 3 • Claude Opus 4 • GPT-5 • Gemini 2.0 Pro"

Visual elements: 
- Multi-layered energy background with flowing particles and neural network patterns
- Abstract representation of AI models connecting in a unified hub
- Glowing energy orbs representing different AI capabilities (chat, code, image, voice)
- Subtle grid pattern with pulsing connections between nodes
- Floating holographic interface elements showing model names

Background: 
- Deep purple (#7C3AED) to dark blue (#3B82F6) gradient
- Dark base (near-black #0F0F23) with luminous accents
- Energy particles flowing from corners toward center
- Diagonal light rays emanating from central hub
- Neural network mesh pattern overlay with glow effect

Technical style:
- Sleek, modern, premium tech aesthetic
- High-energy, dynamic composition
- Professional enterprise feel with futuristic elements
- Glass morphism effects on UI elements
- Neon glow accents on key elements

Color palette:
- Primary: Purple (#7C3AED) and Blue (#3B82F6) gradients
- Accents: Cyan (#06B6D4), Pink (#EC4899), Orange (#F97316)
- Base: Very dark blue/black (#0F0F23, #1A1A2E)
- Highlights: White (#FFFFFF) with high contrast

Typography:
- Main title: Bold, modern sans-serif, large (96-120px)
- Subtitle: Medium weight, 36-48px
- Model names: Clean, tech font, 24-32px with separator dots

Mood: Energetic, innovative, professional, powerful, unified
Quality: Ultra-sharp, high-resolution, production-ready
Aspect ratio: Exactly 1200x630px (16:9)`,
    priority: 1,
  },
  {
    route: '/pricing',
    filename: 'pricing.png',
    title: 'Pricing Plans',
    prompt: `${basePrompt}
    
Main text: "Access 12 AI Models"
Subtitle: "Transparent Pricing for Every Team"
Secondary text: "Grok 3 • Claude Opus 4 • GPT-5 • Gemini 2.0 Pro"

Visual elements: 
- Clean pricing cards showing different plan tiers
- Model icons arranged in a grid formation
- Checkmark badges for included features
- Professional pricing table elements
- Subtle connection lines between features

Background: 
- Purple (#7C3AED) to blue (#3B82F6) gradient
- Clean, organized layout with card shadows
- Minimal geometric patterns
- Professional business aesthetic

Add: Feature checkmarks, plan comparison elements, value indicators
Style: Clean, professional, trust-building, transparent, business-focused
Mood: Professional, clear, trustworthy, value-driven`,
    priority: 2,
  },
  {
    route: '/features',
    filename: 'ai-tools.png',
    title: '27 AI Features & Tools',
    prompt: `${basePrompt}
    
Main text: "27 AI Capabilities"
Subtitle: "12 Models • One Unified Platform"
Secondary text: "Chat • Code • Image • Voice • Workflows • Analytics"

Visual elements: 
- Grid showcase of AI model icons (Grok, Claude, GPT, Gemini logos)
- Connected nodes showing unified platform integration
- Feature category icons (chat bubble, code brackets, image, microphone, workflow diagram, chart)
- Holographic UI elements displaying capabilities
- Interconnected neural network pattern

Background: 
- Dynamic purple (#7C3AED) to blue (#3B82F6) gradient
- Floating technology elements and icons
- Subtle grid with connection lines
- Energy particles linking features

Add: AI model badges, capability icons, integration lines, feature indicators
Style: Dynamic, feature-rich, comprehensive, modern, energetic
Mood: Powerful, versatile, unified, professional, innovative`,
    priority: 3,
  },
  {
    route: '/grok-chat',
    filename: 'grok-chat.png',
    title: 'Grok AI Chat',
    prompt: `${basePrompt}
    
Main text: "Grok 3"
Subtitle: "xAI Conversational AI"
Secondary text: "Real-Time Streaming • Multi-Modal • Persistent History"

Visual elements: 
- Modern chat interface mockup with streaming message bubbles
- Grok logo or xAI branding elements
- Conversation flow visualization
- Message bubbles with AI responses
- Streaming indicator (typing animation visual)
- Multi-modal icons (text, image analysis)

Background: 
- Deep purple (#7C3AED) gradient with dark base
- Chat interface backdrop
- Subtle message bubble patterns
- Professional conversation UI aesthetic

Add: Lightning bolt for real-time speed, chat bubbles, vision icon for Grok Vision, streaming indicators
Style: Conversational, modern, fast, responsive, intelligent
Mood: Advanced, real-time, conversational, powerful, accessible`,
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
