-- Seed sample integrations for the marketplace
INSERT INTO integrations (name, slug, description, category, logo_url, config_schema, pricing_model, is_verified, install_count) VALUES
  (
    'Google Drive',
    'google-drive',
    'Sync files and folders with Google Drive. Upload, download, and manage your documents seamlessly.',
    'productivity',
    'https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg',
    '{"fields": [{"name": "folder_id", "type": "text", "label": "Folder ID", "required": true}, {"name": "sync_direction", "type": "select", "label": "Sync Direction", "options": ["upload", "download", "both"], "required": true}]}'::jsonb,
    'free',
    true,
    1523
  ),
  (
    'Slack',
    'slack',
    'Send notifications and messages to Slack channels. Connect your workflows to team communication.',
    'communication',
    'https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg',
    '{"fields": [{"name": "webhook_url", "type": "text", "label": "Webhook URL", "required": true}, {"name": "channel", "type": "text", "label": "Channel", "required": false}]}'::jsonb,
    'free',
    true,
    2847
  ),
  (
    'GitHub',
    'github',
    'Integrate with GitHub repositories. Create issues, manage pull requests, and automate your development workflow.',
    'developer',
    'https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg',
    '{"fields": [{"name": "repository", "type": "text", "label": "Repository", "placeholder": "owner/repo", "required": true}, {"name": "access_token", "type": "password", "label": "Access Token", "required": true}]}'::jsonb,
    'free',
    true,
    1956
  ),
  (
    'Stripe',
    'stripe',
    'Process payments and manage subscriptions. Integrate Stripe payment processing into your workflows.',
    'payments',
    'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg',
    '{"fields": [{"name": "api_key", "type": "password", "label": "API Key", "required": true}, {"name": "webhook_secret", "type": "password", "label": "Webhook Secret", "required": false}]}'::jsonb,
    'free',
    true,
    892
  ),
  (
    'Notion',
    'notion',
    'Create and update Notion pages and databases. Sync your knowledge base with AI-powered workflows.',
    'productivity',
    'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png',
    '{"fields": [{"name": "api_key", "type": "password", "label": "API Key", "required": true}, {"name": "database_id", "type": "text", "label": "Database ID", "required": false}]}'::jsonb,
    'free',
    true,
    734
  ),
  (
    'Linear',
    'linear',
    'Create and manage Linear issues. Streamline your project management with automated issue creation.',
    'productivity',
    'https://asset.brandfetch.io/idE2JcjXSL/idwpJFjW4c.svg',
    '{"fields": [{"name": "api_key", "type": "password", "label": "API Key", "required": true}, {"name": "team_id", "type": "text", "label": "Team ID", "required": true}]}'::jsonb,
    'free',
    true,
    456
  ),
  (
    'Microsoft Teams',
    'microsoft-teams',
    'Send messages and notifications to Microsoft Teams channels. Keep your team informed in real-time.',
    'communication',
    'https://upload.wikimedia.org/wikipedia/commons/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg',
    '{"fields": [{"name": "webhook_url", "type": "text", "label": "Webhook URL", "required": true}]}'::jsonb,
    'free',
    true,
    1234
  ),
  (
    'Airtable',
    'airtable',
    'Sync data with Airtable bases. Automate your database operations and manage records programmatically.',
    'productivity',
    'https://upload.wikimedia.org/wikipedia/commons/4/4b/Airtable_Logo.svg',
    '{"fields": [{"name": "api_key", "type": "password", "label": "API Key", "required": true}, {"name": "base_id", "type": "text", "label": "Base ID", "required": true}, {"name": "table_name", "type": "text", "label": "Table Name", "required": true}]}'::jsonb,
    'free',
    true,
    567
  ),
  (
    'Zapier',
    'zapier',
    'Connect to 5000+ apps with Zapier. Create powerful automation workflows without coding.',
    'automation',
    'https://cdn.zapier.com/zapier/images/logos/zapier-logomark.png',
    '{"fields": [{"name": "webhook_url", "type": "text", "label": "Webhook URL", "required": true}]}'::jsonb,
    'free',
    true,
    3421
  ),
  (
    'Twilio',
    'twilio',
    'Send SMS messages and make phone calls. Add communication capabilities to your workflows.',
    'communication',
    'https://static1.twilio.com/marketing/bundles/marketing/img/logos/wordmark/twilio-logo-red.svg',
    '{"fields": [{"name": "account_sid", "type": "text", "label": "Account SID", "required": true}, {"name": "auth_token", "type": "password", "label": "Auth Token", "required": true}, {"name": "phone_number", "type": "text", "label": "Phone Number", "required": true}]}'::jsonb,
    'freemium',
    true,
    234
  ),
  (
    'SendGrid',
    'sendgrid',
    'Send transactional and marketing emails. Automate your email communications with powerful templates.',
    'communication',
    'https://sendgrid.com/brand/sg-logo-300.png',
    '{"fields": [{"name": "api_key", "type": "password", "label": "API Key", "required": true}, {"name": "from_email", "type": "text", "label": "From Email", "required": true}]}'::jsonb,
    'freemium',
    true,
    678
  ),
  (
    'Trello',
    'trello',
    'Create and manage Trello cards and boards. Organize your projects with visual task management.',
    'productivity',
    'https://cdn.worldvectorlogo.com/logos/trello.svg',
    '{"fields": [{"name": "api_key", "type": "password", "label": "API Key", "required": true}, {"name": "token", "type": "password", "label": "Token", "required": true}, {"name": "board_id", "type": "text", "label": "Board ID", "required": true}]}'::jsonb,
    'free',
    true,
    445
  ),
  (
    'Dropbox',
    'dropbox',
    'Upload and sync files with Dropbox. Manage your cloud storage with automated file operations.',
    'productivity',
    'https://upload.wikimedia.org/wikipedia/commons/7/78/Dropbox_Icon.svg',
    '{"fields": [{"name": "access_token", "type": "password", "label": "Access Token", "required": true}, {"name": "folder_path", "type": "text", "label": "Folder Path", "required": false}]}'::jsonb,
    'free',
    true,
    789
  ),
  (
    'Jira',
    'jira',
    'Create and track Jira issues. Integrate project management with your development workflows.',
    'productivity',
    'https://cdn.worldvectorlogo.com/logos/jira-1.svg',
    '{"fields": [{"name": "domain", "type": "text", "label": "Domain", "placeholder": "your-domain.atlassian.net", "required": true}, {"name": "email", "type": "text", "label": "Email", "required": true}, {"name": "api_token", "type": "password", "label": "API Token", "required": true}, {"name": "project_key", "type": "text", "label": "Project Key", "required": true}]}'::jsonb,
    'free',
    true,
    1123
  ),
  (
    'Mailchimp',
    'mailchimp',
    'Manage email campaigns and subscriber lists. Automate your email marketing with powerful segmentation.',
    'marketing',
    'https://upload.wikimedia.org/wikipedia/commons/6/6e/Mailchimp_Logo.svg',
    '{"fields": [{"name": "api_key", "type": "password", "label": "API Key", "required": true}, {"name": "list_id", "type": "text", "label": "List ID", "required": true}]}'::jsonb,
    'freemium',
    true,
    543
  )
ON CONFLICT (slug) DO NOTHING;