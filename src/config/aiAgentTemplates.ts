export const AI_AGENT_TEMPLATES = [
  {
    id: 'competitive-intelligence',
    name: 'Competitive Intelligence',
    description: 'Monitor competitor websites and extract pricing/features',
    icon: 'Globe',
    steps: [
      {
        name: 'Scrape Competitor Site',
        type: 'ai_web_scraping',
        config: {
          url: '{{competitor_url}}',
          extraction_goal: 'Extract product names, pricing, and key features from the pricing page'
        }
      },
      {
        name: 'Analyze Competitive Data',
        type: 'ai_data_analysis',
        config: {
          analysis_type: 'extract_insights',
          instructions: 'Compare competitor pricing and features with our offerings. Identify gaps and opportunities.'
        }
      },
      {
        name: 'Generate Report',
        type: 'ai_content_generation',
        config: {
          content_type: 'report',
          template: 'Create a competitive intelligence report summarizing the findings, including: 1) Competitor pricing analysis, 2) Feature comparison, 3) Recommendations for our product strategy'
        }
      },
      {
        name: 'Send to Slack',
        type: 'http_request',
        config: {
          url: '{{slack_webhook_url}}',
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        }
      }
    ]
  },
  {
    id: 'automated-research',
    name: 'Automated Research',
    description: 'Research topics and compile comprehensive reports',
    icon: 'FileSearch',
    steps: [
      {
        name: 'Web Search & Scrape',
        type: 'ai_web_scraping',
        config: {
          url: '{{research_url}}',
          extraction_goal: 'Extract main content, key points, statistics, and sources'
        }
      },
      {
        name: 'Analyze & Summarize',
        type: 'ai_data_analysis',
        config: {
          analysis_type: 'summarize',
          instructions: 'Create a comprehensive summary highlighting key findings, statistics, and actionable insights'
        }
      },
      {
        name: 'Generate Research Report',
        type: 'ai_content_generation',
        config: {
          content_type: 'report',
          template: 'Generate a professional research report with: Executive Summary, Key Findings, Detailed Analysis, Conclusions, and Recommendations. Use markdown formatting.'
        }
      }
    ]
  },
  {
    id: 'smart-email-routing',
    name: 'Smart Email Routing',
    description: 'Classify emails and route to appropriate department',
    icon: 'Brain',
    steps: [
      {
        name: 'Classify Email',
        type: 'ai_data_analysis',
        config: {
          analysis_type: 'classify',
          instructions: 'Classify this email into one of: Sales, Support, Billing, General Inquiry. Also extract urgency level (low/medium/high).'
        }
      },
      {
        name: 'Decide Routing',
        type: 'ai_decision',
        config: {
          goal: 'Determine the best team to route this email to based on classification and urgency',
          options: ['sales_team', 'support_team', 'billing_team', 'general_inbox']
        }
      },
      {
        name: 'Generate Auto-Reply',
        type: 'ai_content_generation',
        config: {
          content_type: 'email',
          template: 'Generate a professional auto-reply acknowledging receipt and informing them their email has been routed to {{department}}. Estimated response time: {{response_time}}'
        }
      },
      {
        name: 'Route to Team',
        type: 'ai_api_orchestration',
        config: {
          orchestration_goal: 'Create a ticket in the appropriate team system and send the auto-reply email',
          available_apis: [
            { name: 'createTicket', url: 'https://api.helpdesk.com/tickets', method: 'POST' },
            { name: 'sendEmail', url: 'https://api.email.com/send', method: 'POST' }
          ]
        }
      }
    ]
  },
  {
    id: 'social-media-content',
    name: 'Social Media Content Pipeline',
    description: 'Generate and schedule social media posts',
    icon: 'Sparkles',
    steps: [
      {
        name: 'Analyze Topic Trends',
        type: 'ai_data_analysis',
        config: {
          analysis_type: 'extract_insights',
          instructions: 'Analyze current trending topics and hashtags related to {{industry}}. Identify 3-5 trending themes.'
        }
      },
      {
        name: 'Generate Posts',
        type: 'ai_content_generation',
        config: {
          content_type: 'social_post',
          template: 'Create 5 engaging social media posts about {{topic}}. Each post should: 1) Be platform-optimized (Twitter/LinkedIn), 2) Include relevant hashtags, 3) Have a clear CTA, 4) Be under 280 characters for Twitter'
        }
      },
      {
        name: 'Schedule Posts',
        type: 'ai_api_orchestration',
        config: {
          orchestration_goal: 'Schedule the generated posts across social media platforms at optimal times',
          available_apis: [
            { name: 'bufferAPI', url: 'https://api.bufferapp.com/1/updates/create.json', method: 'POST' }
          ]
        }
      }
    ]
  },
  {
    id: 'data-enrichment',
    name: 'Lead Data Enrichment',
    description: 'Enrich lead data from multiple sources',
    icon: 'Network',
    steps: [
      {
        name: 'Fetch Company Data',
        type: 'ai_api_orchestration',
        config: {
          orchestration_goal: 'Fetch company information from multiple data providers (Clearbit, LinkedIn, etc.)',
          available_apis: [
            { name: 'clearbit', url: 'https://company.clearbit.com/v2/companies/find?domain={{domain}}', method: 'GET' },
            { name: 'hunter', url: 'https://api.hunter.io/v2/domain-search?domain={{domain}}', method: 'GET' }
          ]
        }
      },
      {
        name: 'Merge & Analyze Data',
        type: 'ai_data_analysis',
        config: {
          analysis_type: 'custom',
          instructions: 'Merge data from all sources, resolve conflicts, identify missing fields, and calculate a lead quality score (0-100) based on completeness and company metrics.'
        }
      },
      {
        name: 'Generate Insights',
        type: 'ai_content_generation',
        config: {
          content_type: 'report',
          template: 'Create a lead profile summary with: Company Overview, Key Contacts, Technology Stack, Estimated Deal Size, and Next Best Action recommendations.'
        }
      }
    ]
  },
  {
    id: 'content-moderation',
    name: 'AI Content Moderation',
    description: 'Automatically moderate user-generated content',
    icon: 'Shield',
    steps: [
      {
        name: 'Analyze Content',
        type: 'ai_data_analysis',
        config: {
          analysis_type: 'custom',
          instructions: 'Analyze the content for: 1) Inappropriate language, 2) Spam indicators, 3) Topic relevance, 4) Sentiment. Rate each category 0-100.'
        }
      },
      {
        name: 'Make Moderation Decision',
        type: 'ai_decision',
        config: {
          goal: 'Decide the appropriate action based on content analysis scores',
          options: ['approve', 'flag_for_review', 'reject', 'require_edit']
        }
      },
      {
        name: 'Generate Feedback',
        type: 'ai_content_generation',
        config: {
          content_type: 'text',
          template: 'If content was flagged or rejected, generate helpful feedback explaining why and how to improve it. Be constructive and specific.'
        }
      }
    ]
  }
] as const;

export type AIAgentTemplate = typeof AI_AGENT_TEMPLATES[number];
