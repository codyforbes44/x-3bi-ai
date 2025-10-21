import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Home,
  LayoutDashboard,
  BookOpen,
  Users,
  Settings,
  MessageSquare,
  Image,
  Mic,
  Code,
  Brain,
  Sparkles,
  FileText,
  Rocket,
} from "lucide-react";

interface Command {
  icon: React.ReactNode;
  label: string;
  action: () => void;
  shortcut?: string;
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const navigationCommands: Command[] = [
    {
      icon: <Home className="h-4 w-4" />,
      label: "Home",
      action: () => {
        navigate("/");
        setOpen(false);
      },
      shortcut: "Alt+H",
    },
    {
      icon: <LayoutDashboard className="h-4 w-4" />,
      label: "Dashboard",
      action: () => {
        navigate("/dashboard");
        setOpen(false);
      },
      shortcut: "Alt+D",
    },
    {
      icon: <BookOpen className="h-4 w-4" />,
      label: "Learn",
      action: () => {
        navigate("/learn");
        setOpen(false);
      },
      shortcut: "Alt+L",
    },
    {
      icon: <Users className="h-4 w-4" />,
      label: "Community",
      action: () => {
        navigate("/community");
        setOpen(false);
      },
    },
    {
      icon: <FileText className="h-4 w-4" />,
      label: "Documentation",
      action: () => {
        navigate("/documentation");
        setOpen(false);
      },
    },
  ];

  const featureCommands: Command[] = [
    {
      icon: <MessageSquare className="h-4 w-4" />,
      label: "Multi-Model Chat",
      action: () => {
        navigate("/dashboard");
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent("switchFeature", { detail: "multi-chat" }));
        }, 100);
        setOpen(false);
      },
      shortcut: "Alt+1",
    },
    {
      icon: <Brain className="h-4 w-4" />,
      label: "Claude Opus 4",
      action: () => {
        navigate("/dashboard");
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent("switchFeature", { detail: "claude" }));
        }, 100);
        setOpen(false);
      },
      shortcut: "Alt+2",
    },
    {
      icon: <Image className="h-4 w-4" />,
      label: "Advanced Image Generation",
      action: () => {
        navigate("/dashboard");
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent("switchFeature", { detail: "advanced-image" }));
        }, 100);
        setOpen(false);
      },
      shortcut: "Alt+3",
    },
    {
      icon: <Sparkles className="h-4 w-4" />,
      label: "Template Library",
      action: () => {
        navigate("/dashboard");
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent("switchFeature", { detail: "templates" }));
        }, 100);
        setOpen(false);
      },
      shortcut: "Alt+4",
    },
    {
      icon: <Mic className="h-4 w-4" />,
      label: "Voice AI",
      action: () => {
        navigate("/dashboard");
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent("switchFeature", { detail: "voice" }));
        }, 100);
        setOpen(false);
      },
    },
    {
      icon: <Code className="h-4 w-4" />,
      label: "Code Assistant",
      action: () => {
        navigate("/dashboard");
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent("switchFeature", { detail: "code" }));
        }, 100);
        setOpen(false);
      },
    },
  ];

  const settingsCommands: Command[] = [
    {
      icon: <Settings className="h-4 w-4" />,
      label: "Profile Settings",
      action: () => {
        navigate("/profile");
        setOpen(false);
      },
    },
    {
      icon: <Rocket className="h-4 w-4" />,
      label: "Usage Analytics",
      action: () => {
        navigate("/usage-analytics");
        setOpen(false);
      },
    },
  ];

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          {navigationCommands.map((cmd, idx) => (
            <CommandItem key={idx} onSelect={cmd.action}>
              {cmd.icon}
              <span className="ml-2">{cmd.label}</span>
              {cmd.shortcut && (
                <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium text-muted-foreground opacity-100">
                  {cmd.shortcut}
                </kbd>
              )}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Features">
          {featureCommands.map((cmd, idx) => (
            <CommandItem key={idx} onSelect={cmd.action}>
              {cmd.icon}
              <span className="ml-2">{cmd.label}</span>
              {cmd.shortcut && (
                <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium text-muted-foreground opacity-100">
                  {cmd.shortcut}
                </kbd>
              )}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          {settingsCommands.map((cmd, idx) => (
            <CommandItem key={idx} onSelect={cmd.action}>
              {cmd.icon}
              <span className="ml-2">{cmd.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
