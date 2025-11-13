import { useState } from "react";
import { toast } from "sonner";

/**
 * Copy text to clipboard with toast feedback
 */
export const useCopyToClipboard = () => {
  const [copied, setCopied] = useState(false);
  
  const copy = async (text: string, successMessage = "Copied to clipboard") => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success(successMessage);
      
      setTimeout(() => setCopied(false), 2000);
      return true;
    } catch (error) {
      console.error('Failed to copy:', error);
      toast.error("Failed to copy to clipboard");
      return false;
    }
  };
  
  return { copy, copied };
};
