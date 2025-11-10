import { useState, useCallback, useEffect } from 'react';
import { useAISettings } from './useAISettings';

type SidebarState = 'collapsed' | 'compact' | 'expanded';

const STORAGE_KEY = 'ai-sidebar-state';

export function useAISidebar() {
  const { settings } = useAISettings();
  
  const [state, setState] = useState<SidebarState>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return (stored as SidebarState) || settings.defaultState;
  });

  const [isFirstVisit, setIsFirstVisit] = useState(() => {
    return !localStorage.getItem('ai-sidebar-visited');
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, state);
  }, [state]);

  useEffect(() => {
    if (isFirstVisit) {
      localStorage.setItem('ai-sidebar-visited', 'true');
      setIsFirstVisit(false);
    }
  }, [isFirstVisit]);

  const toggle = useCallback(() => {
    setState(current => {
      if (current === 'collapsed') return 'compact';
      if (current === 'compact') return 'expanded';
      return 'collapsed';
    });
  }, []);

  const open = useCallback((targetState: SidebarState = 'compact') => {
    setState(targetState);
  }, []);

  const close = useCallback(() => {
    setState('collapsed');
  }, []);

  const setWidth = useCallback((targetState: SidebarState) => {
    setState(targetState);
  }, []);

  // Keyboard shortcut handler (respects settings)
  useEffect(() => {
    if (!settings.enableGlobalShortcut) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // Parse the keyboard shortcut from settings
      const shortcut = settings.keyboardShortcut.toLowerCase();
      const needsCtrl = shortcut.includes('ctrl');
      const needsCmd = shortcut.includes('cmd') || shortcut.includes('command');
      const needsShift = shortcut.includes('shift');
      const key = shortcut.split('+').pop() || 'g';
      
      const modifierMatch = (needsCtrl && e.ctrlKey) || (needsCmd && e.metaKey);
      const shiftMatch = !needsShift || e.shiftKey;
      const keyMatch = e.key.toLowerCase() === key;
      
      if (modifierMatch && shiftMatch && keyMatch) {
        e.preventDefault();
        toggle();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggle, settings.enableGlobalShortcut, settings.keyboardShortcut]);

  return {
    state,
    isCollapsed: state === 'collapsed',
    isCompact: state === 'compact',
    isExpanded: state === 'expanded',
    isFirstVisit,
    toggle,
    open,
    close,
    setWidth,
    settings,
  };
}
