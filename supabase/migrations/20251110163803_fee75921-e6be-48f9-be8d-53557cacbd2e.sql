-- Fix user registration by updating handle_new_user function
-- This ensures display_name never contains full email addresses

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  username_from_email text;
BEGIN
  -- Extract username from email (part before @)
  username_from_email := split_part(NEW.email, '@', 1);
  
  -- Insert profile with display_name from metadata or fallback to username
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (
    NEW.id, 
    COALESCE(
      NEW.raw_user_meta_data->>'display_name',
      'user_' || username_from_email
    )
  );
  
  RETURN NEW;
END;
$$;