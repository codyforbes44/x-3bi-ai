-- Create demo_requests table for storing demo scheduling requests
CREATE TABLE IF NOT EXISTS public.demo_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  phone TEXT,
  preferred_date TIMESTAMP WITH TIME ZONE NOT NULL,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add company and phone fields to contact_submissions table
ALTER TABLE public.contact_submissions 
ADD COLUMN IF NOT EXISTS company TEXT,
ADD COLUMN IF NOT EXISTS phone TEXT;

-- Enable RLS on demo_requests
ALTER TABLE public.demo_requests ENABLE ROW LEVEL SECURITY;

-- RLS Policies for demo_requests
CREATE POLICY "Anyone can submit demo requests"
  ON public.demo_requests
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can view their own demo requests"
  ON public.demo_requests
  FOR SELECT
  USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Admins can view all demo requests"
  ON public.demo_requests
  FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update demo requests"
  ON public.demo_requests
  FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_demo_requests_status ON public.demo_requests(status);
CREATE INDEX IF NOT EXISTS idx_demo_requests_created_at ON public.demo_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_demo_requests_email ON public.demo_requests(email);

-- Add trigger to update updated_at timestamp
CREATE TRIGGER update_demo_requests_updated_at
  BEFORE UPDATE ON public.demo_requests
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();