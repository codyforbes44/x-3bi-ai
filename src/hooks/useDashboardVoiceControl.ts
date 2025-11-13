import { useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DASHBOARD_VOICE_COMMANDS, DASHBOARD_NAV_COMMANDS } from '@/config/dashboardVoiceCommands';
import { useToast } from '@/hooks/use-toast';

interface UseDashboardVoiceControlOptions {
  activeTab: string;
  onTabChange: (tab: string) => void;
  enabled?: boolean;
}

/**
 * Hook for controlling dashboard features via voice commands
 * Integrates with dashboard state to switch between features
 */
export function useDashboardVoiceControl({
  activeTab,
  onTabChange,
  enabled = true,
}: UseDashboardVoiceControlOptions) {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const isOnDashboard = location.pathname === '/dashboard';

  // Handle dashboard feature navigation
  const handleFeatureNavigation = useCallback((featureId: string, description: string) => {
    if (!isOnDashboard) {
      // Navigate to dashboard with the feature tab
      navigate(`/dashboard?tab=${featureId}`);
      toast({
        title: "Navigating to Dashboard",
        description,
      });
    } else {
      // Already on dashboard, just switch tabs
      onTabChange(featureId);
      toast({
        title: description,
      });
    }
  }, [isOnDashboard, navigate, onTabChange, toast]);

  // Build voice commands for the dashboard
  const getDashboardCommands = useCallback(() => {
    const commands = [
      // Feature navigation commands
      ...DASHBOARD_VOICE_COMMANDS.map(cmd => ({
        phrases: cmd.phrases,
        action: () => handleFeatureNavigation(cmd.featureId, cmd.description),
        description: cmd.description,
      })),
      
      // Quick navigation commands
      ...DASHBOARD_NAV_COMMANDS.map(cmd => ({
        phrases: cmd.phrases,
        action: () => {
          if (isOnDashboard) {
            onTabChange('overview');
            toast({ title: cmd.description });
          } else {
            navigate('/dashboard');
            toast({ title: "Navigating to Dashboard" });
          }
        },
        description: cmd.description,
      })),
    ];

    return commands;
  }, [handleFeatureNavigation, isOnDashboard, navigate, onTabChange, toast]);

  // Listen for voice command events from useVoiceRecognition
  useEffect(() => {
    if (!enabled) return;

    const handleVoiceCommand = (event: CustomEvent) => {
      const { command } = event.detail;
      const dashboardCommands = getDashboardCommands();
      
      // Find matching command
      const matchedCommand = dashboardCommands.find(cmd =>
        cmd.phrases.some(phrase => 
          command.toLowerCase().includes(phrase.toLowerCase())
        )
      );

      if (matchedCommand) {
        matchedCommand.action();
      }
    };

    window.addEventListener('dashboardVoiceCommand' as any, handleVoiceCommand);
    
    return () => {
      window.removeEventListener('dashboardVoiceCommand' as any, handleVoiceCommand);
    };
  }, [enabled, getDashboardCommands]);

  return {
    commands: getDashboardCommands(),
    isOnDashboard,
    currentFeature: activeTab,
  };
}
