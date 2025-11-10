-- Phase 4: Consolidate database schema
-- Migrate data from ai_sidebar_settings to ai_settings and drop old table

-- First, add any missing columns to ai_settings
-- (The table already exists, we just need to ensure data compatibility)

-- Migrate data from ai_sidebar_settings to ai_settings
-- For users who have settings in both tables, keep the most recent one
INSERT INTO public.ai_settings (user_id, settings, created_at, updated_at)
SELECT 
  s.user_id,
  s.settings,
  s.created_at,
  s.updated_at
FROM public.ai_sidebar_settings s
WHERE NOT EXISTS (
  SELECT 1 FROM public.ai_settings a WHERE a.user_id = s.user_id
)
ON CONFLICT (user_id) DO NOTHING;

-- For users who have settings in both tables, merge them (keep most recent updated_at)
UPDATE public.ai_settings a
SET 
  settings = CASE 
    WHEN s.updated_at > a.updated_at THEN s.settings
    ELSE a.settings || s.settings -- merge, with ai_sidebar_settings values taking precedence for overlapping keys
  END,
  updated_at = GREATEST(a.updated_at, s.updated_at)
FROM public.ai_sidebar_settings s
WHERE a.user_id = s.user_id
  AND s.updated_at > a.updated_at;

-- Drop the old ai_sidebar_settings table
DROP TABLE IF EXISTS public.ai_sidebar_settings;