import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface AISidebarContextType {
  isOpen: boolean;
  state: 'collapsed' | 'compact' | 'expanded';
  currentConversation: string | null;
  currentFeature: string | null;
  open: (targetState?: 'compact' | 'expanded') => void;
  close: () => void;
  toggle: () => void;
  setState: (state: 'collapsed' | 'compact' | 'expanded') => void;
  setCurrentConversation: (id: string | null) => void;
  setCurrentFeature: (feature: string | null) => void;
}

const AISidebarContext = createContext<AISidebarContextType | undefined>(undefined);

export function AISidebarProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<'collapsed' | 'compact' | 'expanded'>('collapsed');
  const [currentConversation, setCurrentConversation] = useState<string | null>(null);
  const [currentFeature, setCurrentFeature] = useState<string | null>(null);

  const open = useCallback((targetState: 'compact' | 'expanded' = 'compact') => {
    setState(targetState);
  }, []);

  const close = useCallback(() => {
    setState('collapsed');
  }, []);

  const toggle = useCallback(() => {
    setState(current => {
      if (current === 'collapsed') return 'compact';
      if (current === 'compact') return 'expanded';
      return 'collapsed';
    });
  }, []);

  const isOpen = state !== 'collapsed';

  return (
    <AISidebarContext.Provider
      value={{
        isOpen,
        state,
        currentConversation,
        currentFeature,
        open,
        close,
        toggle,
        setState,
        setCurrentConversation,
        setCurrentFeature,
      }}
    >
      {children}
    </AISidebarContext.Provider>
  );
}

export function useAISidebarContext() {
  const context = useContext(AISidebarContext);
  if (context === undefined) {
    throw new Error('useAISidebarContext must be used within AISidebarProvider');
  }
  return context;
}
