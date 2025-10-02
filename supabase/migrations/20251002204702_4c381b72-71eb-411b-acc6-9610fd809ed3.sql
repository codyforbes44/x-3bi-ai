-- Fix issues table: Make user_id NOT NULL and add default handling
-- Step 1: Update existing NULL user_ids to a system user or delete them
-- For safety, we'll update them to use a placeholder UUID
UPDATE public.issues 
SET user_id = '00000000-0000-0000-0000-000000000000'::uuid 
WHERE user_id IS NULL;

-- Step 2: Make user_id NOT NULL
ALTER TABLE public.issues 
ALTER COLUMN user_id SET NOT NULL;

-- Step 3: Add a check constraint to prevent the placeholder UUID from being used in new inserts
ALTER TABLE public.issues
ADD CONSTRAINT issues_user_id_not_placeholder 
CHECK (user_id != '00000000-0000-0000-0000-000000000000'::uuid);

-- Step 4: Update the INSERT RLS policy to require authentication
DROP POLICY IF EXISTS "Anyone can submit issues" ON public.issues;

CREATE POLICY "Authenticated users can submit issues" 
ON public.issues 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Step 5: Create a policy for anonymous users if needed (optional - keep if you want public submissions)
CREATE POLICY "Anonymous users can submit issues"
ON public.issues
FOR INSERT
TO anon
WITH CHECK (true);

-- However, for anonymous inserts, we need a trigger to set user_id
-- Create a function to set a default user_id for anonymous submissions
CREATE OR REPLACE FUNCTION public.set_anonymous_user_id()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- If user_id is NULL (anonymous), set it to a special UUID
  -- You might want to create a dedicated "anonymous" user account
  IF NEW.user_id IS NULL THEN
    NEW.user_id = COALESCE(auth.uid(), '00000000-0000-0000-0000-000000000001'::uuid);
  END IF;
  RETURN NEW;
END;
$$;

-- Create trigger for anonymous submissions
DROP TRIGGER IF EXISTS set_anonymous_user_id_trigger ON public.issues;
CREATE TRIGGER set_anonymous_user_id_trigger
BEFORE INSERT ON public.issues
FOR EACH ROW
EXECUTE FUNCTION public.set_anonymous_user_id();