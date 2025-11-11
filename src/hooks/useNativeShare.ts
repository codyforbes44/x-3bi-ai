import { Share } from '@capacitor/share';
import { Capacitor } from '@capacitor/core';
import { useToast } from './use-toast';

export function useNativeShare() {
  const { toast } = useToast();
  
  const share = async (content: { title?: string; text?: string; url?: string }) => {
    try {
      if (Capacitor.isNativePlatform()) {
        await Share.share({
          title: content.title || '3BI.AI',
          text: content.text || '',
          url: content.url,
          dialogTitle: 'Share with'
        });
      } else {
        // Fallback to Web Share API
        if (navigator.share) {
          await navigator.share(content);
        } else {
          // Copy to clipboard as last resort
          await navigator.clipboard.writeText(content.text || content.url || '');
          toast({
            title: 'Copied to clipboard',
            description: 'Content has been copied to your clipboard',
          });
        }
      }
    } catch (error) {
      console.error('Share error:', error);
      // User cancelled share, don't show error toast
    }
  };
  
  return { share };
}
