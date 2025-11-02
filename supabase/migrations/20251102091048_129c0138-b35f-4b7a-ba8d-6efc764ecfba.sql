-- Add admin access policy for audit logs
CREATE POLICY "Admins can view all audit logs"
  ON public.audit_logs
  FOR SELECT
  USING (has_role(auth.uid(), 'admin'));

COMMENT ON POLICY "Admins can view all audit logs" ON public.audit_logs IS 
  'Allows administrators to view all security audit logs for monitoring and incident response';