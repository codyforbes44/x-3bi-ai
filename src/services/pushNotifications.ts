import { PushNotifications, Token, PushNotificationSchema } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';
import { supabase } from '@/integrations/supabase/client';

export async function initPushNotifications() {
  if (!Capacitor.isNativePlatform()) {
    console.log('Push notifications only available on native platforms');
    return;
  }

  try {
    // Request permission
    const permStatus = await PushNotifications.requestPermissions();
    
    if (permStatus.receive === 'granted') {
      await PushNotifications.register();
      console.log('Push notifications registered');
    } else {
      console.log('Push notification permission denied');
      return;
    }
    
    // Listen for registration
    PushNotifications.addListener('registration', async (token: Token) => {
      console.log('Push registration success, token:', token.value);
      
      // Save token to local storage for future reference
      localStorage.setItem('push_token', token.value);
      
      // Note: To save push tokens to database, you would need to add a push_token column
      // to the profiles table first via a Supabase migration
      console.log('Push token ready for use:', token.value);
    });
    
    // Handle registration errors
    PushNotifications.addListener('registrationError', (error: any) => {
      console.error('Push registration error:', error);
    });
    
    // Handle received notifications when app is in foreground
    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        console.log('Push notification received:', notification);
        // You can show a toast or update UI here
      }
    );
    
    // Handle notification tap (when app is in background)
    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (action: any) => {
        console.log('Push notification action performed:', action);
        // Navigate to relevant screen based on notification data
        const data = action.notification.data;
        if (data?.route) {
          window.location.href = data.route;
        }
      }
    );
    
  } catch (error) {
    console.error('Push notification initialization error:', error);
  }
}

export async function removePushToken() {
  if (!Capacitor.isNativePlatform()) return;
  
  try {
    localStorage.removeItem('push_token');
    await PushNotifications.removeAllListeners();
  } catch (error) {
    console.error('Failed to remove push token:', error);
  }
}
