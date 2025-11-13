import { useEffect, useRef } from "react";

interface UseUnsavedChangesOptions {
  hasUnsavedChanges: boolean;
  message?: string;
}

export const useUnsavedChanges = ({ 
  hasUnsavedChanges, 
  message = "You have unsaved changes. Are you sure you want to leave?" 
}: UseUnsavedChangesOptions) => {
  const hasUnsavedRef = useRef(hasUnsavedChanges);
  
  useEffect(() => {
    hasUnsavedRef.current = hasUnsavedChanges;
  }, [hasUnsavedChanges]);

  // Handle browser beforeunload event
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedRef.current) {
        e.preventDefault();
        e.returnValue = message;
        return message;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [message]);

  return {};
};
