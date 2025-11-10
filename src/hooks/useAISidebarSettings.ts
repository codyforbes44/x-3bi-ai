import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { AISidebarSettings, DEFAULT_AI_SIDEBAR_SETTINGS } from '@/types/aiSidebarSettings';

const STORAGE_KEY = 'ai-sidebar-settings';

export function useAISidebarSettings() {
  const [settings, setSettings] = useState<AISidebarSettings>(() => {
    // Try to load from localStorage first
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return { ...DEFAULT_AI_SIDEBAR_SETTINGS, ...JSON.parse(stored) };
      } catch {
        return DEFAULT_AI_SIDEBAR_SETTINGS;
      }
    }
    return DEFAULT_AI_SIDEBAR_SETTINGS;
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const { toast } = useToast();

  // Load settings from database
  const loadSettings = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('ai_sidebar_settings')
        .select('settings')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) throw error;

      if (data?.settings) {
        const dbSettings = { ...DEFAULT_AI_SIDEBAR_SETTINGS, ...(data.settings as Partial<AISidebarSettings>) };
        setSettings(dbSettings);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dbSettings));
      }
    } catch (error) {
      console.error('Error loading AI sidebar settings:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save settings to both localStorage and database
  const saveSettings = useCallback(async (newSettings: Partial<AISidebarSettings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    
    // Save to localStorage immediately
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSettings));

    // Sync to database
    setIsSyncing(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('ai_sidebar_settings')
        .upsert({
          user_id: user.id,
          settings: updatedSettings,
        }, {
          onConflict: 'user_id',
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error saving AI sidebar settings:', error);
      toast({
        title: 'Error',
        description: 'Failed to sync settings. Changes saved locally.',
        variant: 'destructive',
      });
    } finally {
      setIsSyncing(false);
    }
  }, [settings, toast]);

  // Reset to defaults
  const resetSettings = useCallback(async () => {
    await saveSettings(DEFAULT_AI_SIDEBAR_SETTINGS);
    toast({
      title: 'Settings Reset',
      description: 'AI sidebar settings have been reset to defaults.',
    });
  }, [saveSettings, toast]);

  // Load settings on mount
  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  return {
    settings,
    isLoading,
    isSyncing,
    saveSettings,
    resetSettings,
    refreshSettings: loadSettings,
  };
}
