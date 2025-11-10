import { useState, useCallback, useEffect } from 'react';

type SidebarState = 'collapsed' | 'compact' | 'expanded';

const STORAGE_KEY = 'ai-sidebar-state';
const DEFAULT_STATE: SidebarState = 'collapsed';

export function useAISidebar() {
  const [state, setState] = useState<SidebarState>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return (stored as SidebarState) || DEFAULT_STATE;
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

  // Keyboard shortcut handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'g') {
        e.preventDefault();
        toggle();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggle]);

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
  };
}
