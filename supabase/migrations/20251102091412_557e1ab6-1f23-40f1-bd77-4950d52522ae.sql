-- Review and update profiles table visibility policy
-- The current policy allows any authenticated user to view all profiles
-- This is acceptable for a social/collaborative platform but we should add a comment
-- explaining the decision and ensure no PII is stored in these fields

COMMENT ON POLICY "Profiles are viewable by everyone" ON public.profiles IS 
  'Public profiles policy: All authenticated users can view all profiles. 
   SECURITY NOTE: Do NOT store sensitive PII (email, phone, address) in this table.
   Only display_name, avatar_url, and bio should be public information.
   For a more private application, consider restricting to workspace members only.';

-- Add constraint to prevent emails in display_name
CREATE OR REPLACE FUNCTION public.validate_profile_no_pii()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Check if display_name contains @ symbol (likely email)
  IF NEW.display_name ~ '@' THEN
    RAISE EXCEPTION 'Display name should not contain email addresses';
  END IF;
  
  -- Check if display_name contains phone number patterns
  IF NEW.display_name ~ '\d{3}[-.\s]?\d{3}[-.\s]?\d{4}' THEN
    RAISE EXCEPTION 'Display name should not contain phone numbers';
  END IF;
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER validate_profile_pii
  BEFORE INSERT OR UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_profile_no_pii();

COMMENT ON FUNCTION public.validate_profile_no_pii() IS 
  'Prevents storing PII like emails or phone numbers in public profile fields';