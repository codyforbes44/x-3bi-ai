import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';
import { Capacitor } from '@capacitor/core';

export function useNativeHaptics() {
  const isNative = Capacitor.isNativePlatform();
  
  const impact = async (style: ImpactStyle = ImpactStyle.Light) => {
    if (isNative) {
      try {
        await Haptics.impact({ style });
      } catch (error) {
        console.error('Haptics error:', error);
      }
    }
  };
  
  const notification = async (type: NotificationType = NotificationType.Success) => {
    if (isNative) {
      try {
        await Haptics.notification({ type });
      } catch (error) {
        console.error('Haptics error:', error);
      }
    }
  };
  
  const vibrate = async () => {
    if (isNative) {
      try {
        await Haptics.vibrate();
      } catch (error) {
        console.error('Haptics error:', error);
      }
    }
  };
  
  return { impact, notification, vibrate };
}
