import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, apiKey, config, deploymentId } = await req.json();

    if (!action) {
      throw new Error('Action is required');
    }

    console.log(`Processing Deploypad action: ${action}`);

    let response;
    let result;

    const DEPLOYPAD_API_BASE = 'https://api.deploypad.app/v1';
    const headers = {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    };

    switch (action) {
      case 'validate':
        // Validate API key
        response = await fetch(`${DEPLOYPAD_API_BASE}/auth/validate`, {
          method: 'GET',
          headers: headers,
        });

        if (response.ok) {
          const userData = await response.json();
          result = { valid: true, user: userData };
        } else {
          result = { valid: false, error: 'Invalid API key' };
        }
        break;

      case 'deploy':
        // Deploy project
        if (!config) {
          throw new Error('Deployment config is required');
        }

        // Prepare deployment payload
        const deploymentPayload = {
          name: config.projectName,
          domain: config.domain || undefined,
          description: config.description,
          environment: config.environment || 'production',
          autoRedeploy: config.autoRedeploy || true,
          source: {
            type: 'lovable',
            projectId: config.projectId,
            framework: 'react-vite',
            buildCommand: 'npm run build',
            outputDirectory: 'dist',
            nodeVersion: '18'
          },
          env: config.envVars || {}
        };

        response = await fetch(`${DEPLOYPAD_API_BASE}/deploy`, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(deploymentPayload),
        });

        if (response.ok) {
          result = await response.json();
          console.log(`Deployment started: ${result.id}`);
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Deployment failed');
        }
        break;

      case 'list':
        // List deployments
        response = await fetch(`${DEPLOYPAD_API_BASE}/deployments`, {
          method: 'GET',
          headers: headers,
        });

        if (response.ok) {
          result = await response.json();
        } else {
          throw new Error('Failed to fetch deployments');
        }
        break;

      case 'status':
        // Get deployment status
        if (!deploymentId) {
          throw new Error('Deployment ID is required');
        }

        response = await fetch(`${DEPLOYPAD_API_BASE}/deployments/${deploymentId}`, {
          method: 'GET',
          headers: headers,
        });

        if (response.ok) {
          result = await response.json();
        } else {
          throw new Error('Failed to fetch deployment status');
        }
        break;

      case 'logs':
        // Get deployment logs
        if (!deploymentId) {
          throw new Error('Deployment ID is required');
        }

        response = await fetch(`${DEPLOYPAD_API_BASE}/deployments/${deploymentId}/logs`, {
          method: 'GET',
          headers: headers,
        });

        if (response.ok) {
          result = await response.json();
        } else {
          throw new Error('Failed to fetch deployment logs');
        }
        break;

      case 'redeploy':
        // Redeploy existing deployment
        if (!deploymentId) {
          throw new Error('Deployment ID is required');
        }

        response = await fetch(`${DEPLOYPAD_API_BASE}/deployments/${deploymentId}/redeploy`, {
          method: 'POST',
          headers: headers,
        });

        if (response.ok) {
          result = await response.json();
        } else {
          throw new Error('Failed to redeploy');
        }
        break;

      case 'delete':
        // Delete deployment
        if (!deploymentId) {
          throw new Error('Deployment ID is required');
        }

        response = await fetch(`${DEPLOYPAD_API_BASE}/deployments/${deploymentId}`, {
          method: 'DELETE',
          headers: headers,
        });

        if (response.ok) {
          result = { success: true, message: 'Deployment deleted successfully' };
        } else {
          throw new Error('Failed to delete deployment');
        }
        break;

      case 'domains':
        // Manage custom domains
        const { domain, deploymentIdForDomain } = await req.json();
        
        if (!domain || !deploymentIdForDomain) {
          throw new Error('Domain and deployment ID are required');
        }

        response = await fetch(`${DEPLOYPAD_API_BASE}/deployments/${deploymentIdForDomain}/domains`, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({ domain }),
        });

        if (response.ok) {
          result = await response.json();
        } else {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to configure domain');
        }
        break;

      default:
        throw new Error(`Unsupported action: ${action}`);
    }

    console.log(`Action ${action} completed successfully`);

    return new Response(
      JSON.stringify({
        success: true,
        action: action,
        data: result,
        timestamp: new Date().toISOString()
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in Deploypad integration:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'An unexpected error occurred',
        timestamp: new Date().toISOString()
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});