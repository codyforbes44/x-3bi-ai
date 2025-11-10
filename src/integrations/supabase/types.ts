export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      agent_collaborations: {
        Row: {
          agent_id: string
          conversation_id: string
          created_at: string | null
          id: string
          message: string
          message_type: string
          metadata: Json | null
          target_agent_id: string | null
        }
        Insert: {
          agent_id: string
          conversation_id: string
          created_at?: string | null
          id?: string
          message: string
          message_type: string
          metadata?: Json | null
          target_agent_id?: string | null
        }
        Update: {
          agent_id?: string
          conversation_id?: string
          created_at?: string | null
          id?: string
          message?: string
          message_type?: string
          metadata?: Json | null
          target_agent_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "agent_collaborations_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "ai_agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_collaborations_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "agent_conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agent_collaborations_target_agent_id_fkey"
            columns: ["target_agent_id"]
            isOneToOne: false
            referencedRelation: "ai_agents"
            referencedColumns: ["id"]
          },
        ]
      }
      agent_conversations: {
        Row: {
          conversation_history: Json | null
          created_at: string | null
          final_output: Json | null
          goal: string
          id: string
          metadata: Json | null
          participating_agents: string[] | null
          status: string | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          conversation_history?: Json | null
          created_at?: string | null
          final_output?: Json | null
          goal: string
          id?: string
          metadata?: Json | null
          participating_agents?: string[] | null
          status?: string | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          conversation_history?: Json | null
          created_at?: string | null
          final_output?: Json | null
          goal?: string
          id?: string
          metadata?: Json | null
          participating_agents?: string[] | null
          status?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      ai_agents: {
        Row: {
          capabilities: string[] | null
          created_at: string | null
          id: string
          is_active: boolean | null
          model: string | null
          name: string
          performance_metrics: Json | null
          persona: Json
          role: string
          system_prompt: string
          temperature: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          capabilities?: string[] | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          model?: string | null
          name: string
          performance_metrics?: Json | null
          persona: Json
          role: string
          system_prompt: string
          temperature?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          capabilities?: string[] | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          model?: string | null
          name?: string
          performance_metrics?: Json | null
          persona?: Json
          role?: string
          system_prompt?: string
          temperature?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      ai_settings: {
        Row: {
          created_at: string
          id: string
          settings: Json
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          settings?: Json
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          settings?: Json
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      api_keys: {
        Row: {
          created_at: string
          expires_at: string | null
          id: string
          is_active: boolean
          key_hash: string
          key_prefix: string
          last_used_at: string | null
          metadata: Json | null
          name: string
          scopes: Json | null
          user_id: string
        }
        Insert: {
          created_at?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean
          key_hash: string
          key_prefix: string
          last_used_at?: string | null
          metadata?: Json | null
          name: string
          scopes?: Json | null
          user_id: string
        }
        Update: {
          created_at?: string
          expires_at?: string | null
          id?: string
          is_active?: boolean
          key_hash?: string
          key_prefix?: string
          last_used_at?: string | null
          metadata?: Json | null
          name?: string
          scopes?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      api_rate_limits: {
        Row: {
          api_key_id: string | null
          created_at: string | null
          endpoint: string
          id: string
          limit_per_day: number | null
          limit_per_hour: number | null
        }
        Insert: {
          api_key_id?: string | null
          created_at?: string | null
          endpoint: string
          id?: string
          limit_per_day?: number | null
          limit_per_hour?: number | null
        }
        Update: {
          api_key_id?: string | null
          created_at?: string | null
          endpoint?: string
          id?: string
          limit_per_day?: number | null
          limit_per_hour?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "api_rate_limits_api_key_id_fkey"
            columns: ["api_key_id"]
            isOneToOne: false
            referencedRelation: "api_keys"
            referencedColumns: ["id"]
          },
        ]
      }
      api_requests: {
        Row: {
          api_key_id: string | null
          created_at: string | null
          endpoint: string
          id: string
          method: string
          response_time_ms: number | null
          status_code: number | null
        }
        Insert: {
          api_key_id?: string | null
          created_at?: string | null
          endpoint: string
          id?: string
          method: string
          response_time_ms?: number | null
          status_code?: number | null
        }
        Update: {
          api_key_id?: string | null
          created_at?: string | null
          endpoint?: string
          id?: string
          method?: string
          response_time_ms?: number | null
          status_code?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "api_requests_api_key_id_fkey"
            columns: ["api_key_id"]
            isOneToOne: false
            referencedRelation: "api_keys"
            referencedColumns: ["id"]
          },
        ]
      }
      application_logs: {
        Row: {
          context: Json | null
          correlation_id: string | null
          created_at: string
          id: string
          level: string
          message: string
          session_id: string | null
          stack: string | null
          timestamp: string
          user_id: string | null
        }
        Insert: {
          context?: Json | null
          correlation_id?: string | null
          created_at?: string
          id?: string
          level: string
          message: string
          session_id?: string | null
          stack?: string | null
          timestamp?: string
          user_id?: string | null
        }
        Update: {
          context?: Json | null
          correlation_id?: string | null
          created_at?: string
          id?: string
          level?: string
          message?: string
          session_id?: string | null
          stack?: string | null
          timestamp?: string
          user_id?: string | null
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          created_at: string
          event_type: string
          id: string
          ip_address: string | null
          metadata: Json | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          event_type: string
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          event_type?: string
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      compliance_reports: {
        Row: {
          created_at: string | null
          generated_by: string | null
          id: string
          report_data: Json
          report_type: string
          workspace_id: string | null
        }
        Insert: {
          created_at?: string | null
          generated_by?: string | null
          id?: string
          report_data: Json
          report_type: string
          workspace_id?: string | null
        }
        Update: {
          created_at?: string | null
          generated_by?: string | null
          id?: string
          report_data?: Json
          report_type?: string
          workspace_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "compliance_reports_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          status: string
          subject: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          status?: string
          subject: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          status?: string
          subject?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      digital_twin_interactions: {
        Row: {
          context: Json | null
          created_at: string | null
          id: string
          interaction_type: string
          metadata: Json | null
          prediction_accuracy: number | null
          twin_prediction: string | null
          user_decision: string | null
          user_id: string
          user_input: string | null
        }
        Insert: {
          context?: Json | null
          created_at?: string | null
          id?: string
          interaction_type: string
          metadata?: Json | null
          prediction_accuracy?: number | null
          twin_prediction?: string | null
          user_decision?: string | null
          user_id: string
          user_input?: string | null
        }
        Update: {
          context?: Json | null
          created_at?: string | null
          id?: string
          interaction_type?: string
          metadata?: Json | null
          prediction_accuracy?: number | null
          twin_prediction?: string | null
          user_decision?: string | null
          user_id?: string
          user_input?: string | null
        }
        Relationships: []
      }
      digital_twin_profiles: {
        Row: {
          behavior_patterns: Json | null
          communication_style: Json | null
          confidence_score: number | null
          created_at: string | null
          decision_patterns: Json | null
          expertise_areas: string[] | null
          id: string
          last_trained_at: string | null
          learning_rate: number | null
          personality_traits: Json | null
          preferences: Json | null
          total_interactions: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          behavior_patterns?: Json | null
          communication_style?: Json | null
          confidence_score?: number | null
          created_at?: string | null
          decision_patterns?: Json | null
          expertise_areas?: string[] | null
          id?: string
          last_trained_at?: string | null
          learning_rate?: number | null
          personality_traits?: Json | null
          preferences?: Json | null
          total_interactions?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          behavior_patterns?: Json | null
          communication_style?: Json | null
          confidence_score?: number | null
          created_at?: string | null
          decision_patterns?: Json | null
          expertise_areas?: string[] | null
          id?: string
          last_trained_at?: string | null
          learning_rate?: number | null
          personality_traits?: Json | null
          preferences?: Json | null
          total_interactions?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      donations: {
        Row: {
          amount: string
          created_at: string
          email: string | null
          id: string
          message: string | null
          status: string
          user_id: string | null
        }
        Insert: {
          amount: string
          created_at?: string
          email?: string | null
          id?: string
          message?: string | null
          status?: string
          user_id?: string | null
        }
        Update: {
          amount?: string
          created_at?: string
          email?: string | null
          id?: string
          message?: string | null
          status?: string
          user_id?: string | null
        }
        Relationships: []
      }
      encrypted_data: {
        Row: {
          created_at: string | null
          data_type: string
          encrypted_value: string
          id: string
          iv: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          data_type: string
          encrypted_value: string
          id?: string
          iv: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          data_type?: string
          encrypted_value?: string
          id?: string
          iv?: string
          user_id?: string
        }
        Relationships: []
      }
      grok_conversations: {
        Row: {
          created_at: string
          id: string
          is_public: boolean
          model: string
          share_token: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_public?: boolean
          model?: string
          share_token?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_public?: boolean
          model?: string
          share_token?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      grok_messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          role: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          role: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "grok_messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "grok_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      integrations: {
        Row: {
          category: string
          config_schema: Json
          created_at: string | null
          description: string | null
          id: string
          install_count: number | null
          is_verified: boolean | null
          logo_url: string | null
          name: string
          pricing_model: string | null
          publisher_id: string | null
          slug: string
        }
        Insert: {
          category: string
          config_schema: Json
          created_at?: string | null
          description?: string | null
          id?: string
          install_count?: number | null
          is_verified?: boolean | null
          logo_url?: string | null
          name: string
          pricing_model?: string | null
          publisher_id?: string | null
          slug: string
        }
        Update: {
          category?: string
          config_schema?: Json
          created_at?: string | null
          description?: string | null
          id?: string
          install_count?: number | null
          is_verified?: boolean | null
          logo_url?: string | null
          name?: string
          pricing_model?: string | null
          publisher_id?: string | null
          slug?: string
        }
        Relationships: []
      }
      issues: {
        Row: {
          category: string
          created_at: string
          description: string
          email: string
          id: string
          name: string
          status: string
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category: string
          created_at?: string
          description: string
          email: string
          id?: string
          name: string
          status?: string
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          email?: string
          id?: string
          name?: string
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      knowledge_entities: {
        Row: {
          access_count: number | null
          created_at: string | null
          embedding: string | null
          entity_name: string
          entity_type: string
          id: string
          last_accessed: string | null
          properties: Json | null
          source_apps: string[] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          access_count?: number | null
          created_at?: string | null
          embedding?: string | null
          entity_name: string
          entity_type: string
          id?: string
          last_accessed?: string | null
          properties?: Json | null
          source_apps?: string[] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          access_count?: number | null
          created_at?: string | null
          embedding?: string | null
          entity_name?: string
          entity_type?: string
          id?: string
          last_accessed?: string | null
          properties?: Json | null
          source_apps?: string[] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      knowledge_relationships: {
        Row: {
          created_at: string | null
          from_entity_id: string
          id: string
          properties: Json | null
          relationship_type: string
          strength: number | null
          to_entity_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          from_entity_id: string
          id?: string
          properties?: Json | null
          relationship_type: string
          strength?: number | null
          to_entity_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          from_entity_id?: string
          id?: string
          properties?: Json | null
          relationship_type?: string
          strength?: number | null
          to_entity_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "knowledge_relationships_from_entity_id_fkey"
            columns: ["from_entity_id"]
            isOneToOne: false
            referencedRelation: "knowledge_entities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "knowledge_relationships_to_entity_id_fkey"
            columns: ["to_entity_id"]
            isOneToOne: false
            referencedRelation: "knowledge_entities"
            referencedColumns: ["id"]
          },
        ]
      }
      multimodal_sessions: {
        Row: {
          alias: string
          audio_url: string | null
          content_hash: string | null
          created_at: string
          data: Json
          embedding: string | null
          id: string
          image_url: string | null
          last_accessed_at: string | null
          metadata: Json | null
          modality: Database["public"]["Enums"]["modality_type"]
          parent_alias: string | null
          tags: string[] | null
          updated_at: string
          user_id: string
          video_metadata: Json | null
          vision_analysis: Json | null
        }
        Insert: {
          alias: string
          audio_url?: string | null
          content_hash?: string | null
          created_at?: string
          data?: Json
          embedding?: string | null
          id?: string
          image_url?: string | null
          last_accessed_at?: string | null
          metadata?: Json | null
          modality?: Database["public"]["Enums"]["modality_type"]
          parent_alias?: string | null
          tags?: string[] | null
          updated_at?: string
          user_id: string
          video_metadata?: Json | null
          vision_analysis?: Json | null
        }
        Update: {
          alias?: string
          audio_url?: string | null
          content_hash?: string | null
          created_at?: string
          data?: Json
          embedding?: string | null
          id?: string
          image_url?: string | null
          last_accessed_at?: string | null
          metadata?: Json | null
          modality?: Database["public"]["Enums"]["modality_type"]
          parent_alias?: string | null
          tags?: string[] | null
          updated_at?: string
          user_id?: string
          video_metadata?: Json | null
          vision_analysis?: Json | null
        }
        Relationships: []
      }
      newsletter_subscriptions: {
        Row: {
          active: boolean
          email: string
          id: string
          interests: Json | null
          subscribed_at: string
        }
        Insert: {
          active?: boolean
          email: string
          id?: string
          interests?: Json | null
          subscribed_at?: string
        }
        Update: {
          active?: boolean
          email?: string
          id?: string
          interests?: Json | null
          subscribed_at?: string
        }
        Relationships: []
      }
      performance_metrics: {
        Row: {
          created_at: string
          id: string
          metric_name: string
          metric_value: number
          page_url: string | null
          rating: string | null
          session_id: string | null
          timestamp: string
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          metric_name: string
          metric_value: number
          page_url?: string | null
          rating?: string | null
          session_id?: string | null
          timestamp?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          metric_name?: string
          metric_value?: number
          page_url?: string | null
          rating?: string | null
          session_id?: string | null
          timestamp?: string
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      permissions: {
        Row: {
          action: string
          description: string | null
          id: string
          name: string
          resource: string
        }
        Insert: {
          action: string
          description?: string | null
          id?: string
          name: string
          resource: string
        }
        Update: {
          action?: string
          description?: string | null
          id?: string
          name?: string
          resource?: string
        }
        Relationships: []
      }
      predictive_insights: {
        Row: {
          accuracy_score: number | null
          action_suggestions: Json | null
          actual_outcome: string | null
          based_on_patterns: string[] | null
          confidence_score: number
          created_at: string | null
          description: string
          id: string
          insight_type: string
          predicted_for: string
          status: string | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          accuracy_score?: number | null
          action_suggestions?: Json | null
          actual_outcome?: string | null
          based_on_patterns?: string[] | null
          confidence_score: number
          created_at?: string | null
          description: string
          id?: string
          insight_type: string
          predicted_for: string
          status?: string | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          accuracy_score?: number | null
          action_suggestions?: Json | null
          actual_outcome?: string | null
          based_on_patterns?: string[] | null
          confidence_score?: number
          created_at?: string | null
          description?: string
          id?: string
          insight_type?: string
          predicted_for?: string
          status?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          display_name: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      referral_stats: {
        Row: {
          created_at: string
          id: string
          pending_referrals: number | null
          referral_code: string
          successful_referrals: number | null
          total_referrals: number | null
          total_rewards: number | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          pending_referrals?: number | null
          referral_code: string
          successful_referrals?: number | null
          total_referrals?: number | null
          total_rewards?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          pending_referrals?: number | null
          referral_code?: string
          successful_referrals?: number | null
          total_referrals?: number | null
          total_rewards?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      referrals: {
        Row: {
          completed_at: string | null
          created_at: string
          id: string
          referral_code: string
          referred_user_id: string | null
          referrer_id: string | null
          reward_amount: number | null
          status: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          id?: string
          referral_code: string
          referred_user_id?: string | null
          referrer_id?: string | null
          reward_amount?: number | null
          status?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          id?: string
          referral_code?: string
          referred_user_id?: string | null
          referrer_id?: string | null
          reward_amount?: number | null
          status?: string | null
        }
        Relationships: []
      }
      role_permissions: {
        Row: {
          id: string
          permission_id: string | null
          role: string
        }
        Insert: {
          id?: string
          permission_id?: string | null
          role: string
        }
        Update: {
          id?: string
          permission_id?: string | null
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "role_permissions_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "permissions"
            referencedColumns: ["id"]
          },
        ]
      }
      security_scans: {
        Row: {
          completed_at: string | null
          findings: Json | null
          id: string
          scan_type: string
          score: number | null
          started_at: string | null
          status: string | null
          workspace_id: string | null
        }
        Insert: {
          completed_at?: string | null
          findings?: Json | null
          id?: string
          scan_type: string
          score?: number | null
          started_at?: string | null
          status?: string | null
          workspace_id?: string | null
        }
        Update: {
          completed_at?: string | null
          findings?: Json | null
          id?: string
          scan_type?: string
          score?: number | null
          started_at?: string | null
          status?: string | null
          workspace_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "security_scans_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      semantic_searches: {
        Row: {
          created_at: string | null
          id: string
          query: string
          query_embedding: string | null
          result_count: number | null
          results: Json | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          query: string
          query_embedding?: string | null
          result_count?: number | null
          results?: Json | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          query?: string
          query_embedding?: string | null
          result_count?: number | null
          results?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      system_metrics: {
        Row: {
          created_at: string | null
          id: string
          metadata: Json | null
          metric_type: string
          value: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          metadata?: Json | null
          metric_type: string
          value: number
        }
        Update: {
          created_at?: string | null
          id?: string
          metadata?: Json | null
          metric_type?: string
          value?: number
        }
        Relationships: []
      }
      temporal_patterns: {
        Row: {
          confidence_level: number | null
          created_at: string | null
          historical_data: Json | null
          id: string
          metadata: Json | null
          next_predicted_occurrence: string | null
          pattern_name: string
          pattern_type: string
          recurrence_rule: string | null
          time_windows: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          confidence_level?: number | null
          created_at?: string | null
          historical_data?: Json | null
          id?: string
          metadata?: Json | null
          next_predicted_occurrence?: string | null
          pattern_name: string
          pattern_type: string
          recurrence_rule?: string | null
          time_windows?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          confidence_level?: number | null
          created_at?: string | null
          historical_data?: Json | null
          id?: string
          metadata?: Json | null
          next_predicted_occurrence?: string | null
          pattern_name?: string
          pattern_type?: string
          recurrence_rule?: string | null
          time_windows?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      tenant_customization: {
        Row: {
          brand_colors: Json | null
          created_at: string | null
          custom_domain: string | null
          email_templates: Json | null
          features: Json | null
          id: string
          logo_urls: Json | null
          updated_at: string | null
          workspace_id: string
        }
        Insert: {
          brand_colors?: Json | null
          created_at?: string | null
          custom_domain?: string | null
          email_templates?: Json | null
          features?: Json | null
          id?: string
          logo_urls?: Json | null
          updated_at?: string | null
          workspace_id: string
        }
        Update: {
          brand_colors?: Json | null
          created_at?: string | null
          custom_domain?: string | null
          email_templates?: Json | null
          features?: Json | null
          id?: string
          logo_urls?: Json | null
          updated_at?: string | null
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tenant_customization_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: true
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      user_events: {
        Row: {
          created_at: string | null
          event_data: Json | null
          event_type: string
          id: string
          session_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_data?: Json | null
          event_type: string
          id?: string
          session_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_data?: Json | null
          event_type?: string
          id?: string
          session_id?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_integrations: {
        Row: {
          config: Json | null
          id: string
          installed_at: string | null
          integration_id: string | null
          is_active: boolean | null
          oauth_tokens: Json | null
          usage_stats: Json | null
          user_id: string
          workspace_id: string | null
        }
        Insert: {
          config?: Json | null
          id?: string
          installed_at?: string | null
          integration_id?: string | null
          is_active?: boolean | null
          oauth_tokens?: Json | null
          usage_stats?: Json | null
          user_id: string
          workspace_id?: string | null
        }
        Update: {
          config?: Json | null
          id?: string
          installed_at?: string | null
          integration_id?: string | null
          is_active?: boolean | null
          oauth_tokens?: Json | null
          usage_stats?: Json | null
          user_id?: string
          workspace_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_integrations_integration_id_fkey"
            columns: ["integration_id"]
            isOneToOne: false
            referencedRelation: "integrations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_integrations_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      user_presence: {
        Row: {
          id: string
          last_seen: string | null
          metadata: Json | null
          status: string | null
          user_id: string
          workspace_id: string | null
        }
        Insert: {
          id?: string
          last_seen?: string | null
          metadata?: Json | null
          status?: string | null
          user_id: string
          workspace_id?: string | null
        }
        Update: {
          id?: string
          last_seen?: string | null
          metadata?: Json | null
          status?: string | null
          user_id?: string
          workspace_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_presence_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      volunteer_applications: {
        Row: {
          created_at: string
          email: string
          experience: string
          id: string
          motivation: string
          name: string
          role: string
          status: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          experience: string
          id?: string
          motivation: string
          name: string
          role: string
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          experience?: string
          id?: string
          motivation?: string
          name?: string
          role?: string
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      webhook_deliveries: {
        Row: {
          attempts: number | null
          created_at: string | null
          event_type: string
          id: string
          last_attempt_at: string | null
          payload: Json
          response_body: string | null
          response_code: number | null
          status: string | null
          webhook_id: string | null
        }
        Insert: {
          attempts?: number | null
          created_at?: string | null
          event_type: string
          id?: string
          last_attempt_at?: string | null
          payload: Json
          response_body?: string | null
          response_code?: number | null
          status?: string | null
          webhook_id?: string | null
        }
        Update: {
          attempts?: number | null
          created_at?: string | null
          event_type?: string
          id?: string
          last_attempt_at?: string | null
          payload?: Json
          response_body?: string | null
          response_code?: number | null
          status?: string | null
          webhook_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "webhook_deliveries_webhook_id_fkey"
            columns: ["webhook_id"]
            isOneToOne: false
            referencedRelation: "webhooks"
            referencedColumns: ["id"]
          },
        ]
      }
      webhooks: {
        Row: {
          created_at: string | null
          events: string[]
          id: string
          is_active: boolean | null
          retry_config: Json | null
          secret: string
          url: string
          user_id: string
          workspace_id: string | null
        }
        Insert: {
          created_at?: string | null
          events: string[]
          id?: string
          is_active?: boolean | null
          retry_config?: Json | null
          secret: string
          url: string
          user_id: string
          workspace_id?: string | null
        }
        Update: {
          created_at?: string | null
          events?: string[]
          id?: string
          is_active?: boolean | null
          retry_config?: Json | null
          secret?: string
          url?: string
          user_id?: string
          workspace_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "webhooks_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_execution_logs: {
        Row: {
          completed_at: string | null
          error_message: string | null
          execution_id: string
          id: string
          input_data: Json | null
          output_data: Json | null
          started_at: string
          status: Database["public"]["Enums"]["execution_status"]
          step_id: string | null
          step_order: number
        }
        Insert: {
          completed_at?: string | null
          error_message?: string | null
          execution_id: string
          id?: string
          input_data?: Json | null
          output_data?: Json | null
          started_at?: string
          status: Database["public"]["Enums"]["execution_status"]
          step_id?: string | null
          step_order: number
        }
        Update: {
          completed_at?: string | null
          error_message?: string | null
          execution_id?: string
          id?: string
          input_data?: Json | null
          output_data?: Json | null
          started_at?: string
          status?: Database["public"]["Enums"]["execution_status"]
          step_id?: string | null
          step_order?: number
        }
        Relationships: [
          {
            foreignKeyName: "workflow_execution_logs_execution_id_fkey"
            columns: ["execution_id"]
            isOneToOne: false
            referencedRelation: "workflow_executions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workflow_execution_logs_step_id_fkey"
            columns: ["step_id"]
            isOneToOne: false
            referencedRelation: "workflow_steps"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_executions: {
        Row: {
          completed_at: string | null
          error_message: string | null
          execution_time_ms: number | null
          id: string
          input_data: Json | null
          output_data: Json | null
          started_at: string
          status: Database["public"]["Enums"]["execution_status"]
          steps_completed: number | null
          total_steps: number | null
          triggered_by: string | null
          workflow_id: string
        }
        Insert: {
          completed_at?: string | null
          error_message?: string | null
          execution_time_ms?: number | null
          id?: string
          input_data?: Json | null
          output_data?: Json | null
          started_at?: string
          status?: Database["public"]["Enums"]["execution_status"]
          steps_completed?: number | null
          total_steps?: number | null
          triggered_by?: string | null
          workflow_id: string
        }
        Update: {
          completed_at?: string | null
          error_message?: string | null
          execution_time_ms?: number | null
          id?: string
          input_data?: Json | null
          output_data?: Json | null
          started_at?: string
          status?: Database["public"]["Enums"]["execution_status"]
          steps_completed?: number | null
          total_steps?: number | null
          triggered_by?: string | null
          workflow_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflow_executions_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "workflows"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_steps: {
        Row: {
          config: Json
          created_at: string
          id: string
          name: string
          step_order: number
          type: Database["public"]["Enums"]["step_type"]
          updated_at: string
          workflow_id: string
        }
        Insert: {
          config?: Json
          created_at?: string
          id?: string
          name: string
          step_order: number
          type: Database["public"]["Enums"]["step_type"]
          updated_at?: string
          workflow_id: string
        }
        Update: {
          config?: Json
          created_at?: string
          id?: string
          name?: string
          step_order?: number
          type?: Database["public"]["Enums"]["step_type"]
          updated_at?: string
          workflow_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflow_steps_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "workflows"
            referencedColumns: ["id"]
          },
        ]
      }
      workflows: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          id: string
          last_run_at: string | null
          name: string
          run_count: number | null
          status: Database["public"]["Enums"]["workflow_status"]
          trigger_config: Json | null
          trigger_type: Database["public"]["Enums"]["trigger_type"]
          updated_at: string
          workspace_id: string | null
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          last_run_at?: string | null
          name: string
          run_count?: number | null
          status?: Database["public"]["Enums"]["workflow_status"]
          trigger_config?: Json | null
          trigger_type?: Database["public"]["Enums"]["trigger_type"]
          updated_at?: string
          workspace_id?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          last_run_at?: string | null
          name?: string
          run_count?: number | null
          status?: Database["public"]["Enums"]["workflow_status"]
          trigger_config?: Json | null
          trigger_type?: Database["public"]["Enums"]["trigger_type"]
          updated_at?: string
          workspace_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "workflows_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workspace_members: {
        Row: {
          id: string
          joined_at: string
          role: Database["public"]["Enums"]["workspace_role"]
          user_id: string
          workspace_id: string
        }
        Insert: {
          id?: string
          joined_at?: string
          role?: Database["public"]["Enums"]["workspace_role"]
          user_id: string
          workspace_id: string
        }
        Update: {
          id?: string
          joined_at?: string
          role?: Database["public"]["Enums"]["workspace_role"]
          user_id?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workspace_members_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workspaces: {
        Row: {
          created_at: string
          created_by: string
          description: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_relevance_score: {
        Args: { created_at: string; decay_factor?: number; similarity: number }
        Returns: number
      }
      cleanup_old_audit_logs: { Args: never; Returns: undefined }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      has_workspace_role: {
        Args: {
          _role: Database["public"]["Enums"]["workspace_role"]
          _user_id: string
          _workspace_id: string
        }
        Returns: boolean
      }
      is_workspace_admin: {
        Args: { _user_id: string; _workspace_id: string }
        Returns: boolean
      }
      is_workspace_member: {
        Args: { _user_id: string; _workspace_id: string }
        Returns: boolean
      }
      update_api_key_last_used: {
        Args: { key_hash_input: string }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      execution_status:
        | "pending"
        | "running"
        | "completed"
        | "failed"
        | "cancelled"
      modality_type: "text" | "image" | "audio" | "video" | "mixed"
      step_type:
        | "ai_chat"
        | "ai_image"
        | "ai_code"
        | "data_transform"
        | "condition"
        | "loop"
        | "http_request"
        | "database_query"
        | "delay"
        | "notification"
      trigger_type: "manual" | "scheduled" | "webhook" | "event"
      workflow_status: "draft" | "active" | "inactive" | "archived"
      workspace_role: "owner" | "admin" | "member" | "viewer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      execution_status: [
        "pending",
        "running",
        "completed",
        "failed",
        "cancelled",
      ],
      modality_type: ["text", "image", "audio", "video", "mixed"],
      step_type: [
        "ai_chat",
        "ai_image",
        "ai_code",
        "data_transform",
        "condition",
        "loop",
        "http_request",
        "database_query",
        "delay",
        "notification",
      ],
      trigger_type: ["manual", "scheduled", "webhook", "event"],
      workflow_status: ["draft", "active", "inactive", "archived"],
      workspace_role: ["owner", "admin", "member", "viewer"],
    },
  },
} as const
