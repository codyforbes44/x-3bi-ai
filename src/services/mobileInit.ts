import { Capacitor } from '@capacitor/core';
import { App } from '@capacitor/app';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { Keyboard } from '@capacitor/keyboard';
import { supabase } from '@/integrations/supabase/client';
import { initPushNotifications } from './pushNotifications';

export async function initializeMobileApp() {
  if (!Capacitor.isNativePlatform()) {
    console.log('Running in web mode, skipping native initialization');
    return;
  }

  console.log('Initializing mobile app...');

  try {
    // Configure status bar
    await StatusBar.setStyle({ style: Style.Dark });
    await StatusBar.setBackgroundColor({ color: '#0a0a0a' });
    
    // Configure keyboard
    await Keyboard.setAccessoryBarVisible({ isVisible: true });
    
    // Handle app state changes
    App.addListener('appStateChange', async ({ isActive }) => {
      if (isActive) {
        console.log('App became active, refreshing session...');
        // Refresh auth session when app becomes active
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Session refresh error:', error);
        } else {
          console.log('Session refreshed successfully');
        }
      }
    });

    // Handle deep links
    App.addListener('appUrlOpen', (event) => {
      console.log('Deep link opened:', event.url);
      // Handle deep link navigation here
      const url = new URL(event.url);
      if (url.pathname) {
        window.location.href = url.pathname;
      }
    });

    // Handle back button (Android)
    App.addListener('backButton', ({ canGoBack }) => {
      if (!canGoBack) {
        App.exitApp();
      } else {
        window.history.back();
      }
    });
    
    // Initialize push notifications
    await initPushNotifications();
    
    // Hide splash screen after initialization
    await SplashScreen.hide();
    
    console.log('Mobile app initialized successfully');
  } catch (error) {
    console.error('Mobile initialization error:', error);
  }
}
