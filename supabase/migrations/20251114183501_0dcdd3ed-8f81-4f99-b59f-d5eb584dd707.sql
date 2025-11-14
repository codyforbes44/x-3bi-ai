-- Create pixel canvas table for collaborative drawing
CREATE TABLE IF NOT EXISTS public.pixel_canvas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  x integer NOT NULL,
  y integer NOT NULL,
  color text NOT NULL,
  user_id uuid REFERENCES auth.users(id),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  UNIQUE(x, y)
);

-- Enable Row Level Security
ALTER TABLE public.pixel_canvas ENABLE ROW LEVEL SECURITY;

-- Anyone can view pixels
CREATE POLICY "Anyone can view pixels"
  ON public.pixel_canvas
  FOR SELECT
  USING (true);

-- Authenticated users can place pixels
CREATE POLICY "Authenticated users can place pixels"
  ON public.pixel_canvas
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update any pixel (for collaborative editing)
CREATE POLICY "Authenticated users can update pixels"
  ON public.pixel_canvas
  FOR UPDATE
  USING (auth.role() = 'authenticated');

-- Create index for faster lookups
CREATE INDEX idx_pixel_canvas_coords ON public.pixel_canvas(x, y);

-- Enable realtime
ALTER TABLE public.pixel_canvas REPLICA IDENTITY FULL;

-- Add to realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.pixel_canvas;

-- Create table for tracking user cooldowns
CREATE TABLE IF NOT EXISTS public.pixel_cooldowns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id),
  last_pixel_at timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS on cooldowns
ALTER TABLE public.pixel_cooldowns ENABLE ROW LEVEL SECURITY;

-- Users can view their own cooldown
CREATE POLICY "Users can view own cooldown"
  ON public.pixel_cooldowns
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own cooldown
CREATE POLICY "Users can insert own cooldown"
  ON public.pixel_cooldowns
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own cooldown
CREATE POLICY "Users can update own cooldown"
  ON public.pixel_cooldowns
  FOR UPDATE
  USING (auth.uid() = user_id);