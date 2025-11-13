import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { A11Y_CONFIG } from '@/config/a11y-config';

interface KeyboardNavigationOptions {
  onCommandPalette?: () => void;
  onShowShortcuts?: () => void;
  onToggleSidebar?: () => void;
  onToggleTheme?: () => void;
  onFocusSearch?: () => void;
  onFocusChat?: () => void;
  disabled?: boolean;
}

/**
 * Keyboard Navigation Hook
 * Handles global keyboard shortcuts for navigation and accessibility
 */
export function useKeyboardNavigation(options: KeyboardNavigationOptions = {}) {
  const navigate = useNavigate();
  const {
    onCommandPalette,
    onShowShortcuts,
    onToggleSidebar,
    onToggleTheme,
    onFocusSearch,
    onFocusChat,
    disabled = false,
  } = options;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (disabled) return;

      // Don't trigger shortcuts when typing in inputs
      const target = e.target as HTMLElement;
      const isInput = ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName);
      const isContentEditable = target.isContentEditable;

      // Allow some shortcuts even in inputs
      const allowInInput = ['Escape', 'Enter'].includes(e.key);

      if ((isInput || isContentEditable) && !allowInInput) return;

      const { shortcuts } = A11Y_CONFIG;

      // Command Palette (⌘K or Ctrl+K)
      if (
        e.key.toLowerCase() === shortcuts.openCommandPalette.key &&
        (e.metaKey || e.ctrlKey) &&
        onCommandPalette
      ) {
        e.preventDefault();
        onCommandPalette();
        return;
      }

      // Show Keyboard Shortcuts (?)
      if (e.key === shortcuts.showKeyboardShortcuts.key && !e.shiftKey && onShowShortcuts) {
        e.preventDefault();
        onShowShortcuts();
        return;
      }

      // Focus Search (/)
      if (e.key === shortcuts.openSearch.key && onFocusSearch && !isInput) {
        e.preventDefault();
        onFocusSearch();
        return;
      }

      // Go to Dashboard (Shift+D)
      if (
        e.key.toLowerCase() === shortcuts.goToDashboard.key.toLowerCase() &&
        e.shiftKey &&
        !isInput
      ) {
        e.preventDefault();
        navigate('/dashboard');
        return;
      }

      // Go to Home (Shift+H)
      if (
        e.key.toLowerCase() === shortcuts.goToHome.key.toLowerCase() &&
        e.shiftKey &&
        !isInput
      ) {
        e.preventDefault();
        navigate('/');
        return;
      }

      // Toggle Sidebar (⌘B or Ctrl+B)
      if (
        e.key.toLowerCase() === shortcuts.toggleSidebar.key &&
        (e.metaKey || e.ctrlKey) &&
        onToggleSidebar
      ) {
        e.preventDefault();
        onToggleSidebar();
        return;
      }

      // Toggle Theme (⌘T or Ctrl+T)
      if (
        e.key.toLowerCase() === shortcuts.toggleTheme.key &&
        (e.metaKey || e.ctrlKey) &&
        onToggleTheme
      ) {
        e.preventDefault();
        onToggleTheme();
        return;
      }

      // Focus Chat Input (Shift+C)
      if (
        e.key.toLowerCase() === shortcuts.focusChatInput.key.toLowerCase() &&
        e.shiftKey &&
        onFocusChat &&
        !isInput
      ) {
        e.preventDefault();
        onFocusChat();
        return;
      }

      // Close Modal/Dialog (Escape)
      if (e.key === shortcuts.closeModal.key) {
        // Let dialog components handle this
        return;
      }

      // Skip to Main Content (S)
      if (e.key.toLowerCase() === shortcuts.skipToContent.key && !isInput) {
        e.preventDefault();
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
          mainContent.focus();
          mainContent.scrollIntoView({ behavior: 'smooth' });
        }
        return;
      }
    },
    [
      disabled,
      navigate,
      onCommandPalette,
      onShowShortcuts,
      onToggleSidebar,
      onToggleTheme,
      onFocusSearch,
      onFocusChat,
    ]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return {
    shortcuts: A11Y_CONFIG.shortcuts,
  };
}

/**
 * Hook to handle arrow key navigation in lists
 */
export function useArrowKeyNavigation(
  containerRef: React.RefObject<HTMLElement>,
  options: {
    orientation?: 'vertical' | 'horizontal';
    loop?: boolean;
  } = {}
) {
  const { orientation = 'vertical', loop = true } = options;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const items = Array.from(
        container.querySelectorAll<HTMLElement>('[role="option"], [role="menuitem"], button, a')
      );

      const currentIndex = items.findIndex((item) => item === document.activeElement);
      if (currentIndex === -1) return;

      let nextIndex = currentIndex;

      if (orientation === 'vertical') {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          nextIndex = currentIndex + 1;
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          nextIndex = currentIndex - 1;
        }
      } else {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          nextIndex = currentIndex + 1;
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          nextIndex = currentIndex - 1;
        }
      }

      // Handle looping
      if (loop) {
        if (nextIndex >= items.length) nextIndex = 0;
        if (nextIndex < 0) nextIndex = items.length - 1;
      } else {
        nextIndex = Math.max(0, Math.min(nextIndex, items.length - 1));
      }

      if (nextIndex !== currentIndex) {
        items[nextIndex]?.focus();
      }
    };

    container.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }, [containerRef, orientation, loop]);
}
