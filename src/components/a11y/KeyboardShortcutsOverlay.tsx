import { useState } from 'react';
import { X } from 'lucide-react';
import { A11Y_CONFIG, formatShortcut } from '@/config/a11y-config';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface KeyboardShortcutsOverlayProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Keyboard Shortcuts Overlay
 * Shows all available keyboard shortcuts
 * Triggered by pressing "?"
 */
export function KeyboardShortcutsOverlay({
  open,
  onOpenChange,
}: KeyboardShortcutsOverlayProps) {
  const shortcuts = A11Y_CONFIG.shortcuts;

  // Group shortcuts by category
  const categories = {
    Navigation: ['goToDashboard', 'goToHome', 'openSearch'] as const,
    Accessibility: ['showKeyboardShortcuts', 'toggleAccessibilityMenu', 'skipToContent'] as const,
    'UI Controls': ['toggleSidebar', 'toggleTheme', 'closeModal', 'openCommandPalette'] as const,
    'Chat/AI': ['focusChatInput', 'submitChat'] as const,
    General: ['undo', 'redo'] as const,
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Keyboard Shortcuts
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {Object.entries(categories).map(([category, shortcutKeys]) => (
            <div key={category} className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                {category}
              </h3>
              <div className="space-y-2">
                {shortcutKeys.map((key) => {
                  const shortcut = shortcuts[key];
                  return (
                    <div
                      key={key}
                      className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <span className="text-sm text-foreground">
                        {shortcut.description}
                      </span>
                      <kbd className="px-3 py-1.5 text-xs font-semibold bg-muted border border-border rounded-md">
                        {formatShortcut(shortcut)}
                      </kbd>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-4 border-t">
          <Button onClick={() => onOpenChange(false)} variant="outline">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/**
 * Hook to manage keyboard shortcuts overlay
 */
export function useKeyboardShortcutsOverlay() {
  const [open, setOpen] = useState(false);

  return {
    open,
    setOpen,
    toggle: () => setOpen((prev) => !prev),
  };
}
