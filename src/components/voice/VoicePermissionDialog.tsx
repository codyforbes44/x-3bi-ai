import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Mic } from "lucide-react";

interface VoicePermissionDialogProps {
  isOpen: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

export function VoicePermissionDialog({ 
  isOpen, 
  onAccept, 
  onDecline 
}: VoicePermissionDialogProps) {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Mic className="w-6 h-6 text-primary" />
            </div>
            <AlertDialogTitle>Enable Voice Commands</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="space-y-3">
            <p>
              Voice commands allow you to navigate the app hands-free using natural language.
            </p>
            <div className="bg-muted/50 p-3 rounded-lg space-y-2">
              <p className="font-medium text-foreground text-sm">What you can do:</p>
              <ul className="text-xs space-y-1 text-muted-foreground">
                <li>• Navigate to different pages</li>
                <li>• Control app features</li>
                <li>• Access AI tools quickly</li>
              </ul>
            </div>
            <p className="text-xs">
              We need microphone access to listen for your voice commands. Your audio is processed locally and not stored.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onDecline}>No thanks</AlertDialogCancel>
          <AlertDialogAction onClick={onAccept}>Allow Microphone</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
