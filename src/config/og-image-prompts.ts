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
    route: '/grok',
    filename: 'grok.png',
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
    
Main text: "API Documentation"
Subtitle: "Complete Developer Guide"
Secondary text: "REST API • Code Examples • SDKs"

Visual elements: 
- Code editor interface mockup with syntax highlighting
- API endpoint diagrams showing request/response flow
- Code snippets in multiple languages (JavaScript, Python, cURL)
- Terminal window with example commands
- Developer tool icons and symbols
- Documentation structure visualization

Background: 
- Purple (#7C3AED) to blue (#3B82F6) gradient
- Code editor backdrop with subtle syntax highlighting
- Developer-focused tech aesthetic
- Geometric patterns suggesting code structure

Add: Code brackets </>, terminal icon, API key symbol, SDK badges, documentation icon
Style: Technical, developer-focused, comprehensive, clear, professional
Mood: Developer-friendly, detailed, accessible, well-documented`,
    priority: 5,
  },
  {
    route: '/learn',
    filename: 'learn.png',
    title: 'Learn AI - Courses & Resources',
    prompt: `${basePrompt}
    
Main text: "Learn AI"
Subtitle: "Tutorials • Guides • Best Practices"
Secondary text: "Master AI Platform Features"

Visual elements: 
- Educational icons (books, video play buttons, graduation cap)
- Learning path diagram showing progression
- Tutorial completion checkmarks
- Video thumbnail mockups
- Course module representations
- Interactive learning elements

Background: 
- Bright purple (#7C3AED) to blue (#3B82F6) gradient
- Educational theme with clean design
- Subtle patterns suggesting knowledge and growth
- Upward progression visual elements

Add: Play button icons, checkmarks, tutorial steps (1-2-3), lightbulb for learning, certificate/badge elements
Style: Educational, inspiring, approachable, organized, progressive
Mood: Learning-focused, encouraging, comprehensive, accessible`,
    priority: 6,
  },
  {
    route: '/community',
    filename: 'community.png',
    title: 'AI Developer Community',
    prompt: `${basePrompt}
    
Main text: "Developer Community"
Subtitle: "Connect • Collaborate • Share Knowledge"
Secondary text: "Join AI Developers & Experts"

Visual elements: 
- Connected user avatar circles forming a network
- Chat and collaboration icons
- Discussion forum elements
- Knowledge sharing symbols (lightbulb, question marks, answers)
- Network connection lines between community members
- Collaboration workspace visualization

Background: 
- Warm purple (#7C3AED) gradient with connecting lines
- Network pattern showing interconnected nodes
- Community-focused design with human element
- Collaborative atmosphere with energy flow

Add: People icons, chat bubbles, connection lines, collaboration symbols, community badges
Style: Welcoming, collaborative, vibrant, social, engaging
Mood: Connected, supportive, collaborative, inclusive, active`,
    priority: 7,
  },
  {
    route: '/enterprise',
    filename: 'enterprise.png',
    title: 'Enterprise AI Solutions',
    prompt: `${basePrompt}
    
Main text: "Enterprise AI"
Subtitle: "Scalable Solutions for Organizations"
Secondary text: "Security • Compliance • Team Collaboration"

Visual elements: 
- Corporate/enterprise iconography (building, organization chart)
- Security shield with lock symbol
- Team collaboration visualization
- Scalability indicators (growth arrows, expanding networks)
- Professional dashboard mockup
- Enterprise feature badges (SSO, audit logs, admin controls)

Background: 
- Professional dark purple (#7C3AED) to blue (#3B82F6) gradient
- Enterprise-grade aesthetic with structure
- Secure, stable, corporate design elements
- Organized grid patterns suggesting scale

Add: Security shields, team icons, scale indicators, compliance badges, admin controls
Style: Professional, corporate, trustworthy, secure, scalable
Mood: Enterprise-ready, robust, secure, professional, reliable`,
    priority: 8,
  },
  {
    route: '/api-access',
    filename: 'api-access.png',
    title: 'API Access & Integration',
    prompt: `${basePrompt}
    
Main text: "API Integration"
Subtitle: "Connect AI to Your Applications"
Secondary text: "REST API • Webhooks • Real-Time Access"

Visual elements: 
- API key icon with lock for security
- Integration diagram showing connections between systems
- Webhook flow visualization
- Code integration snippets
- Plug/socket icons representing connectivity
- Data flow arrows between applications

Background: 
- Tech purple (#7C3AED) to blue (#3B82F6) gradient
- API connection lines forming network
- Integration-focused design
- Secure, connected aesthetic

Add: Lock symbols for security, plug icons, API endpoint badges, integration flow arrows, code brackets
Style: Technical, secure, integration-focused, developer-friendly, connected
Mood: Powerful, flexible, secure, developer-centric, accessible`,
    priority: 9,
  },
  {
    route: '/tutorials',
    filename: 'tutorials.png',
    title: 'AI Tutorials & Guides',
    prompt: `${basePrompt}
    
Main text: "Step-by-Step Tutorials"
Subtitle: "Learn AI Platform Features"
Secondary text: "Beginner to Advanced Guides"

Visual elements: 
- Tutorial step indicators (numbered 1-2-3 progression)
- Video tutorial thumbnails with play buttons
- How-to guide representations
- Checklist with completion marks
- Learning path flow diagram
- Progress indicators

Background: 
- Educational purple (#7C3AED) to blue (#3B82F6) gradient
- Learning-focused design
- Step progression visual flow
- Approachable, friendly aesthetic

Add: Play button icons, numbered steps, checkmarks, lightbulb for insights, forward arrows showing progress
Style: Educational, approachable, step-by-step, clear, guiding
Mood: Helpful, instructive, encouraging, progressive, accessible`,
    priority: 10,
  },
  {
    route: '/mission',
    filename: 'mission.png',
    title: 'Our Mission',
    prompt: `${basePrompt}
    
Main text: "Our Mission"
Subtitle: "Making AI Accessible"
Secondary text: "Unified Platform • Multiple Models • One Vision"

Visual elements: 
- Globe with connection points showing global reach
- Target/goal icon representing mission focus
- Upward arrows suggesting progress and accessibility
- Diverse representation through abstract people icons
- Connection lines showing unified approach
- Vision/mission statement design elements

Background: 
- Inspirational purple (#7C3AED) gradient with blue accents
- World map outline or global connection pattern
- Uplifting, forward-looking design
- Unity and accessibility theme

Add: Target icon, upward progress arrows, global connection points, unity symbols
Style: Inspirational, mission-driven, purposeful, global, unified
Mood: Purposeful, accessible, forward-thinking, unified, ambitious`,
    priority: 11,
  },
  {
    route: '/team',
    filename: 'team.png',
    title: 'Our Team',
    prompt: `${basePrompt}
    
Main text: "Our Team"
Subtitle: "AI Engineers & Innovators"
Secondary text: "Building the Future of AI Platforms"

Visual elements: 
- Team member silhouettes or abstract representations
- Collaboration icons (handshake, teamwork symbols)
- Diverse team representation through varied icons
- Professional workspace elements
- Innovation symbols (lightbulb, gear, forward arrows)
- Team structure or organization visualization

Background: 
- Warm purple (#7C3AED) to blue gradient
- Collaborative atmosphere design
- Professional yet approachable aesthetic
- Human-centered focus with technical elements

Add: People icons, collaboration symbols, innovation indicators, professional badges
Style: Professional, personable, team-oriented, collaborative, innovative
Mood: Collaborative, expert, approachable, innovative, unified`,
    priority: 12,
  },
  {
    route: '/partners',
    filename: 'partners.png',
    title: 'Partner Program',
    prompt: `${basePrompt}
    
Main text: "Partner Program"
Subtitle: "Grow with 3BI.AI"
Secondary text: "Collaboration • Integration • Success"

Visual elements: 
- Partnership handshake icon
- Connected company/organization symbols
- Growth chart showing mutual success
- Integration pathway visualization
- Partner badge/certification elements
- Collaboration network diagram

Background: 
- Professional purple (#7C3AED) to blue gradient
- Partnership connection patterns
- Growth-oriented design
- Professional B2B aesthetic

Add: Handshake icon, growth arrows, partner badges, connection lines, success indicators
Style: Professional, collaborative, growth-focused, trustworthy, partnership-oriented
Mood: Collaborative, mutually beneficial, growth-driven, professional, opportunity-focused`,
    priority: 13,
  },
  {
    route: '/usage-analytics',
    filename: 'analytics.png',
    title: 'Usage Analytics & Insights',
    prompt: `${basePrompt}
    
Main text: "Usage Analytics"
Subtitle: "Real-Time Platform Insights"
Secondary text: "Track • Analyze • Optimize"

Visual elements: 
- Analytics dashboard mockup with charts
- Bar charts showing usage metrics
- Line graphs tracking trends over time
- Pie charts for distribution visualization
- Data points and metric badges
- Real-time data flow indicators

Background: 
- Data-driven purple (#7C3AED) to blue (#3B82F6) gradient
- Dashboard backdrop with chart elements
- Analytical, metrics-focused design
- Professional data visualization aesthetic

Add: Bar charts, line graphs, pie charts, metric badges, data points, trend indicators
Style: Data-focused, analytical, insightful, professional, metrics-driven
Mood: Insightful, data-driven, actionable, comprehensive, real-time`,
    priority: 14,
  },
  {
    route: '/memory',
    filename: 'memory.png',
    title: 'Multi-Modal AI Memory',
    prompt: `${basePrompt}
    
Main text: "Multi-Modal Memory"
Subtitle: "Persistent AI Context"
Secondary text: "Text • Images • Voice • Code"

Visual elements: 
- Memory chip/circuit board icons
- Brain neural network pattern showing memory connections
- Data storage visualization (database cylinders, memory blocks)
- Multi-modal indicators (text, image, audio, code icons)
- Connection nodes showing persistent context
- Memory retrieval flow diagram

Background: 
- Tech purple (#7C3AED) to blue (#3B82F6) gradient
- Neural network pattern overlay
- Memory/storage theme with digital aesthetic
- Connected data visualization

Add: Brain icon, database symbols, memory chips, neural connections, multi-modal icons, storage indicators
Style: Technical, innovative, memory-focused, intelligent, persistent
Mood: Advanced, persistent, intelligent, comprehensive, contextual`,
    priority: 15,
  },
];
