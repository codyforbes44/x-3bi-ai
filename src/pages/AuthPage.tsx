import { useState, useEffect, useRef } from "react";
import { SEO } from "@/components/SEO";
import { MinimalPageLayout } from "@/components/layout/MinimalPageLayout";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Heart, AlertCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from '@supabase/supabase-js';
import { SimpleFormField } from "@/components/forms/SimpleFormField";
import { FormSuccess } from "@/components/forms/FormSuccess";
import { PasswordStrength } from "@/components/forms/PasswordStrength";
import { useFormValidation } from "@/hooks/useFormValidation";
import { useUnsavedChanges } from "@/hooks/useUnsavedChanges";
import { z } from "zod";

const signInSchema = z.object({
  email: z.string()
    .trim()
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters"),
  password: z.string()
    .min(6, "Password must be at least 6 characters")
    .max(128, "Password must be less than 128 characters")
});

const signUpSchema = z.object({
  email: z.string()
    .trim()
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters"),
  password: z.string()
    .min(6, "Password must be at least 6 characters")
    .max(128, "Password must be less than 128 characters"),
  displayName: z.string()
    .trim()
    .max(100, "Display name must be less than 100 characters")
    .optional()
});

const AuthPage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("signin");
  
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpDisplayName, setSignUpDisplayName] = useState("");
  
  const navigate = useNavigate();
  const emailInputRef = useRef<HTMLInputElement>(null);

  const { errors: signInErrors, validate: validateSignIn, validateField: validateSignInField, clearFieldError: clearSignInError, setError: setSignInError } = useFormValidation(signInSchema);
  const { errors: signUpErrors, validate: validateSignUp, validateField: validateSignUpField, clearFieldError: clearSignUpError, setError: setSignUpError } = useFormValidation(signUpSchema);

  const hasUnsavedSignIn = signInEmail.length > 0 || signInPassword.length > 0;
  const hasUnsavedSignUp = signUpEmail.length > 0 || signUpPassword.length > 0;
  useUnsavedChanges({ hasUnsavedChanges: hasUnsavedSignIn || hasUnsavedSignUp });

  useEffect(() => {
    setTimeout(() => emailInputRef.current?.focus(), 100);
  }, [activeTab]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        if (event === 'SIGNED_IN' && session?.user) {
          setTimeout(() => navigate('/'), 1500);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) navigate('/');
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { email: signInEmail, password: signInPassword };
    const validationResult = await validateSignIn(data);
    if (!validationResult.success) return;

    setLoading(true);
    setSuccess(null);

    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: signInEmail,
        password: signInPassword,
      });

      if (error) {
        const errorMsg = error.message.includes('Invalid login credentials') 
          ? 'Invalid email or password.'
          : error.message.includes('Email not confirmed')
          ? 'Please verify your email first.'
          : error.message;
        setSignInError('_form', errorMsg);
        return;
      }

      if (authData.user) {
        setSuccess('Welcome back! Redirecting...');
        setSignInEmail("");
        setSignInPassword("");
      }
    } catch (err) {
      setSignInError('_form', 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { email: signUpEmail, password: signUpPassword, displayName: signUpDisplayName };
    const validationResult = await validateSignUp(data);
    if (!validationResult.success) return;

    setLoading(true);
    setSuccess(null);

    try {
      const { data: authData, error } = await supabase.auth.signUp({
        email: signUpEmail,
        password: signUpPassword,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: { display_name: signUpDisplayName || signUpEmail.split('@')[0] }
        }
      });

      if (error) {
        setSignUpError('_form', error.message);
        return;
      }

      if (authData.user) {
        setSuccess('Account created! Check your email to verify.');
        setSignUpEmail("");
        setSignUpPassword("");
        setSignUpDisplayName("");
      }
    } catch (err) {
      setSignUpError('_form', 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Sign In - Access Your AI Platform"
        description="Sign in to 3BI.AI to access multiple AI models."
        keywords={['sign in', 'login', 'authentication']}
        ogImage="https://3bi.ai/og/auth.png"
        canonical="https://3bi.ai/auth"
      />
      <MinimalPageLayout>
        <div className="min-h-screen flex items-center justify-center px-4 py-8 sm:py-12">
          <Card className="w-full max-w-md shadow-lg">
            <CardHeader className="space-y-1 text-center pb-4">
              <div className="flex justify-center mb-4">
                <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
              </div>
              <CardTitle className="text-xl sm:text-2xl">Welcome to 3BI.AI</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Sign in or create an account to get started
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="signin">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="signin" className="space-y-4">
                  {success && (
                    <FormSuccess 
                      message={success} 
                      variant="alert"
                      className="mb-4"
                    />
                  )}
                  {signInErrors._form && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{signInErrors._form}</AlertDescription>
                    </Alert>
                  )}
                  
                  <form onSubmit={handleSignIn} className="space-y-4">
                    <SimpleFormField label="Email" error={signInErrors.email} required>
                      <Input
                        ref={emailInputRef}
                        type="email"
                        placeholder="you@example.com"
                        value={signInEmail}
                        onChange={(e) => {
                          setSignInEmail(e.target.value);
                          clearSignInError("email");
                        }}
                        onBlur={() => validateSignInField("email", signInEmail)}
                        disabled={loading}
                        maxLength={255}
                        autoComplete="email"
                      />
                    </SimpleFormField>

                    <SimpleFormField label="Password" error={signInErrors.password} required>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={signInPassword}
                          onChange={(e) => {
                            setSignInPassword(e.target.value);
                            clearSignInError("password");
                          }}
                          onBlur={() => validateSignInField("password", signInPassword)}
                          disabled={loading}
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground touch-target"
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </SimpleFormField>

                    <Button 
                      type="submit" 
                      className="w-full h-12 sm:h-10 text-base sm:text-sm touch-target" 
                      disabled={loading}
                    >
                      {loading ? "Signing in..." : "Sign In"}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="signup" className="space-y-4">
                  {success && (
                    <FormSuccess 
                      message={success} 
                      variant="alert"
                      className="mb-4"
                    />
                  )}
                  {signUpErrors._form && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{signUpErrors._form}</AlertDescription>
                    </Alert>
                  )}
                  
                  <form onSubmit={handleSignUp} className="space-y-4">
                    <SimpleFormField 
                      label="Display Name" 
                      helper="How should we address you? (Optional)"
                    >
                      <Input
                        type="text"
                        placeholder="Your name"
                        value={signUpDisplayName}
                        onChange={(e) => setSignUpDisplayName(e.target.value)}
                        disabled={loading}
                        maxLength={100}
                      />
                    </SimpleFormField>

                    <SimpleFormField label="Email" error={signUpErrors.email} required>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        value={signUpEmail}
                        onChange={(e) => {
                          setSignUpEmail(e.target.value);
                          clearSignUpError("email");
                        }}
                        onBlur={() => validateSignUpField("email", signUpEmail)}
                        disabled={loading}
                        maxLength={255}
                        autoComplete="email"
                      />
                    </SimpleFormField>

                    <SimpleFormField label="Password" error={signUpErrors.password} required>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={signUpPassword}
                          onChange={(e) => {
                            setSignUpPassword(e.target.value);
                            clearSignUpError("password");
                          }}
                          onBlur={() => validateSignUpField("password", signUpPassword)}
                          disabled={loading}
                          className="pr-10"
                          maxLength={128}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground touch-target"
                          aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      <PasswordStrength password={signUpPassword} />
                    </SimpleFormField>

                    <Button 
                      type="submit" 
                      className="w-full h-12 sm:h-10 text-base sm:text-sm touch-target" 
                      disabled={loading}
                    >
                      {loading ? "Creating account..." : "Create Account"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </MinimalPageLayout>
    </>
  );
};

export default AuthPage;
