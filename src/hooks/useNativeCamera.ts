import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { useNativePlatform } from './useNativePlatform';
import { useToast } from './use-toast';

export function useNativeCamera() {
  const { isNative } = useNativePlatform();
  const { toast } = useToast();
  
  const takePicture = async () => {
    if (!isNative) {
      toast({
        title: 'Camera not available',
        description: 'Camera access is only available in the mobile app',
        variant: 'destructive',
      });
      return null;
    }
    
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Base64,
        source: CameraSource.Prompt // Let user choose camera or gallery
      });
      
      return {
        base64: image.base64String,
        format: image.format,
        dataUrl: `data:image/${image.format};base64,${image.base64String}`
      };
    } catch (error) {
      console.error('Camera error:', error);
      toast({
        title: 'Camera error',
        description: 'Failed to capture image',
        variant: 'destructive',
      });
      return null;
    }
  };
  
  return { takePicture };
}
