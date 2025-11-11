import { Capacitor } from '@capacitor/core';
import { useEffect, useState } from 'react';

export function useNativePlatform() {
  const [platform, setPlatform] = useState<'ios' | 'android' | 'web'>('web');
  const [isNative, setIsNative] = useState(false);

  useEffect(() => {
    const currentPlatform = Capacitor.getPlatform() as 'ios' | 'android' | 'web';
    setPlatform(currentPlatform);
    setIsNative(Capacitor.isNativePlatform());
  }, []);

  return {
    isNative,
    isIOS: platform === 'ios',
    isAndroid: platform === 'android',
    isWeb: platform === 'web',
    platform,
  };
}
