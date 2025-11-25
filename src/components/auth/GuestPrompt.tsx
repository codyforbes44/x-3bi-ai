import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

interface GuestPromptProps {
  /**
   * Title of the prompt
   */
  title?: string;
  /**
   * Description text
   */
  description?: string;
  /**
   * Custom icon
   */
  icon?: ReactNode;
  /**
   * Show as banner instead of card
   */
  variant?: 'card' | 'banner';
}

/**
 * Guest Prompt Component
 * Shows a sign-up prompt for unauthenticated users
 */
export function GuestPrompt({
  title = 'Sign up to save your data',
  description = 'Create a free account to save and access your data across devices.',
  icon = <Sparkles className="w-5 h-5" />,
  variant = 'card',
}: GuestPromptProps) {
  if (variant === 'banner') {
    return (
      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-4">
          <div className="text-primary mt-0.5">{icon}</div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-foreground mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground mb-3">{description}</p>
            <Button asChild size="sm">
              <Link to="/auth">Sign Up Free</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card className="border-primary/20">
      <CardContent className="pt-6">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary">
            {icon}
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              {description}
            </p>
          </div>
          <Button asChild>
            <Link to="/auth">Sign Up Free</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
