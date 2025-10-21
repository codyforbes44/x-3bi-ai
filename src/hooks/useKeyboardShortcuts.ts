import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";

interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
  description: string;
  action: () => void;
}

export const useKeyboardShortcuts = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const shortcuts: KeyboardShortcut[] = [
      // Navigation
      {
        key: "h",
        altKey: true,
        description: "Go to Home",
        action: () => navigate("/")
      },
      {
        key: "d",
        altKey: true,
        description: "Go to Dashboard",
        action: () => navigate("/dashboard")
      },
      {
        key: "l",
        altKey: true,
        description: "Go to Learn",
        action: () => navigate("/learn")
      },
      // Dashboard features (only work on dashboard page)
      {
        key: "1",
        altKey: true,
        description: "Open Multi-Model Chat",
        action: () => {
          if (location.pathname === "/dashboard") {
            window.dispatchEvent(new CustomEvent("switchFeature", { detail: "multi-chat" }));
          }
        }
      },
      {
        key: "2",
        altKey: true,
        description: "Open Claude Opus 4",
        action: () => {
          if (location.pathname === "/dashboard") {
            window.dispatchEvent(new CustomEvent("switchFeature", { detail: "claude" }));
          }
        }
      },
      {
        key: "3",
        altKey: true,
        description: "Open Advanced Image Gen",
        action: () => {
          if (location.pathname === "/dashboard") {
            window.dispatchEvent(new CustomEvent("switchFeature", { detail: "advanced-image" }));
          }
        }
      },
      {
        key: "4",
        altKey: true,
        description: "Open Template Library",
        action: () => {
          if (location.pathname === "/dashboard") {
            window.dispatchEvent(new CustomEvent("switchFeature", { detail: "templates" }));
          }
        }
      },
      {
        key: "?",
        shiftKey: true,
        description: "Show keyboard shortcuts",
        action: () => {
          const message = `
Keyboard Shortcuts:
• Cmd/Ctrl + K → Command Palette
• Alt + H → Home
• Alt + D → Dashboard  
• Alt + L → Learn
• Alt + 1-4 → Dashboard features
• Shift + ? → Show shortcuts
          `.trim();
          toast.info("Keyboard Shortcuts", {
            description: message,
            duration: 5000
          });
        }
      }
    ];

    const handleKeyDown = (e: KeyboardEvent) => {
      const shortcut = shortcuts.find(
        (s) =>
          s.key.toLowerCase() === e.key.toLowerCase() &&
          (s.ctrlKey === undefined || s.ctrlKey === e.ctrlKey) &&
          (s.altKey === undefined || s.altKey === e.altKey) &&
          (s.shiftKey === undefined || s.shiftKey === e.shiftKey)
      );

      if (shortcut) {
        e.preventDefault();
        shortcut.action();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate, location]);
};
