import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { AISettings, DEFAULT_AI_SETTINGS } from '@/types/aiSettings';

const STORAGE_KEY = 'ai-settings';

export function useAISettings() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [settings, setSettings] = useState<AISettings>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? { ...DEFAULT_AI_SETTINGS, ...JSON.parse(stored) } : DEFAULT_AI_SETTINGS;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // Load settings from database for authenticated users
  const loadSettings = useCallback(async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('ai_settings')
        .select('settings')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      if (data?.settings) {
        const merged = { ...DEFAULT_AI_SETTINGS, ...(data.settings as Partial<AISettings>) };
        setSettings(merged);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
        
        // Sync to extension if available
        syncToExtension(merged);
      }
    } catch (error) {
      console.error('Failed to load AI settings:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Save settings to database and localStorage
  const saveSettings = useCallback(async (newSettings: Partial<AISettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // Sync to extension
    syncToExtension(updated);

    if (!user) return;

    setIsSyncing(true);
    try {
      const { error } = await supabase
        .from('ai_settings')
        .upsert({
          user_id: user.id,
          settings: updated,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;

      toast({
        title: 'Settings saved',
        description: 'Your AI settings have been updated successfully.',
      });
    } catch (error) {
      console.error('Failed to save AI settings:', error);
      toast({
        title: 'Error',
        description: 'Failed to save settings. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSyncing(false);
    }
  }, [settings, user, toast]);

  // Sync settings to browser extension
  const syncToExtension = (settings: AISettings) => {
    if (typeof window !== 'undefined' && (window as any).chrome?.runtime?.id) {
      const chrome = (window as any).chrome;
      chrome.storage.sync.set({ aiSettings: settings }, () => {
        if (chrome.runtime.lastError) {
          console.error('Failed to sync to extension:', chrome.runtime.lastError);
        }
      });
    }
  };

  // Reset to defaults
  const resetSettings = useCallback(async () => {
    await saveSettings(DEFAULT_AI_SETTINGS);
    toast({
      title: 'Settings reset',
      description: 'All settings have been reset to defaults.',
    });
  }, [saveSettings, toast]);

  // Load on mount
  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  // Listen for extension settings changes
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).chrome?.storage?.onChanged) {
      const chrome = (window as any).chrome;
      const listener = (changes: any, areaName: string) => {
        if (areaName === 'sync' && changes.aiSettings) {
          const newSettings = changes.aiSettings.newValue;
          if (newSettings) {
            setSettings(newSettings);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
          }
        }
      };

      chrome.storage.onChanged.addListener(listener);
      return () => chrome.storage.onChanged.removeListener(listener);
    }
  }, []);

  return {
    settings,
    isLoading,
    isSyncing,
    saveSettings,
    resetSettings,
    refreshSettings: loadSettings,
  };
}
