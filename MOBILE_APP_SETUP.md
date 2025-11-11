# 3BI.AI Mobile App Setup Guide

## ✅ Phase 1 & 2 Complete: Capacitor Foundation

### What's Been Implemented:

#### 📦 Dependencies Installed:
- ✅ @capacitor/core, cli, ios, android
- ✅ @capacitor/app, haptics, keyboard, status-bar, splash-screen
- ✅ @capacitor/camera, filesystem, push-notifications, share, browser, network

#### 🔧 Configuration Files Created:
- ✅ `capacitor.config.ts` - Native app configuration
- ✅ `vite.config.ts` - Updated for mobile-optimized builds
- ✅ `src/services/mobileInit.ts` - Native initialization logic
- ✅ `src/main.tsx` - Integrated mobile initialization

#### 🪝 Mobile Hooks Created:
- ✅ `useNativePlatform()` - Detect iOS/Android/Web
- ✅ `useNativeCamera()` - Camera & photo library access
- ✅ `useNativeShare()` - Native share functionality
- ✅ `useNativeHaptics()` - Haptic feedback (vibrations)

#### 🎨 Mobile Components:
- ✅ `MobileOptimizedLayout` - Safe area handling for iOS/Android

#### 📱 PWA Enhancements:
- ✅ Extended cache for offline AI responses (1 hour)
- ✅ Extended Supabase API cache (24 hours)
- ✅ NetworkFirst strategy for better offline support

---

## 📋 Next Steps to Build Native Apps

### Step 1: Initialize Native Projects (Run Locally)

After pulling the code, run these commands in your terminal:

```bash
# Install dependencies
npm install

# Build the web app
npm run build

# Initialize iOS and Android projects
npx cap add ios
npx cap add android

# Sync web build to native projects
npx cap sync
```

### Step 2: iOS App Store Build (Requires Mac + Xcode)

```bash
# Open iOS project in Xcode
npx cap open ios
```

In Xcode:
1. Select your Team ID for code signing
2. Set deployment target to iOS 14.0+
3. Add icons (Assets.xcassets)
4. Update Info.plist permissions:
   - NSCameraUsageDescription
   - NSPhotoLibraryUsageDescription
   - NSMicrophoneUsageDescription
5. Build for release: Product → Archive
6. Upload to App Store Connect

### Step 3: Android Play Store Build

```bash
# Open Android project in Android Studio
npx cap open android
```

In Android Studio:
1. Update `android/app/build.gradle`:
   - Set versionCode and versionName
   - Configure signing keys
2. Generate release AAB:
   ```bash
   cd android
   ./gradlew bundleRelease
   ```
3. Upload AAB to Google Play Console

---

## 🎨 Required Assets

### iOS Icons (1024x1024px base):
- App Store: 1024x1024px
- App Icon Set: 20pt, 29pt, 40pt, 60pt, 76pt, 83.5pt, 1024pt (various scales)

### Android Icons:
- Play Store: 512x512px
- Adaptive Icon: 108x108dp
- Feature Graphic: 1024x500px

### Splash Screens:
- iOS: Various sizes for iPhone/iPad
- Android: 1242x2688px, 2048x2732px

### Screenshots:
- iPhone: 6.7", 6.5", 5.5" displays
- Android: Phone + Tablet sizes

---

## 🔐 Required Accounts

1. **Apple Developer** ($99/year)
   - https://developer.apple.com/programs/
   
2. **Google Play Developer** ($25 one-time)
   - https://play.google.com/console/signup

---

## 🚀 Development Workflow

### Test on Device (Hot Reload):
```bash
# Build and sync
npm run build && npx cap sync

# iOS (requires Mac + Xcode)
npx cap run ios

# Android (requires Android Studio)
npx cap run android
```

### Test with Live Reload:
1. Update `capacitor.config.ts` server.url to your local IP:
   ```typescript
   server: {
     url: 'http://192.168.1.X:8080', // Your computer's IP
     cleartext: true
   }
   ```
2. Run `npm run dev`
3. Open in Xcode/Android Studio and run on device

**⚠️ IMPORTANT:** Remove `server.url` before production builds!

---

## 📊 Performance Targets

- ✅ App launch: < 2 seconds
- ✅ Bundle size: < 10MB
- ✅ Memory usage: < 150MB
- ✅ Offline-first with PWA caching

---

## 🎯 Current Status

**Phase 1 (Capacitor Setup):** ✅ Complete  
**Phase 2 (Mobile Optimizations):** ✅ Complete  
**Phase 3 (Native Features):** 🟡 Hooks created, ready to integrate  
**Phase 4 (iOS Preparation):** ⏳ Requires running `npx cap add ios`  
**Phase 5 (Android Preparation):** ⏳ Requires running `npx cap add android`  
**Phase 6-10:** ⏳ Pending

---

## 🔧 How to Use Native Features

### Example: Camera Access
```typescript
import { useNativeCamera } from '@/hooks/useNativeCamera';

function MyComponent() {
  const { takePicture } = useNativeCamera();
  
  const handlePhoto = async () => {
    const photo = await takePicture();
    if (photo) {
      // Use photo.base64 or photo.dataUrl
    }
  };
  
  return <Button onClick={handlePhoto}>Take Photo</Button>;
}
```

### Example: Haptic Feedback
```typescript
import { useNativeHaptics } from '@/hooks/useNativeHaptics';
import { ImpactStyle } from '@capacitor/haptics';

function MyButton() {
  const { impact } = useNativeHaptics();
  
  return (
    <Button onClick={() => impact(ImpactStyle.Medium)}>
      Click Me (with vibration)
    </Button>
  );
}
```

### Example: Native Share
```typescript
import { useNativeShare } from '@/hooks/useNativeShare';

function ShareButton({ content }: { content: string }) {
  const { share } = useNativeShare();
  
  return (
    <Button onClick={() => share({ 
      title: '3BI.AI Response',
      text: content 
    })}>
      Share
    </Button>
  );
}
```

---

## 📱 Platform Detection

```typescript
import { useNativePlatform } from '@/hooks/useNativePlatform';

function MyComponent() {
  const { isNative, isIOS, isAndroid, isWeb } = useNativePlatform();
  
  return (
    <div>
      {isNative && <p>Running in native app!</p>}
      {isIOS && <p>iOS-specific UI</p>}
      {isAndroid && <p>Android-specific UI</p>}
    </div>
  );
}
```

---

## ⚠️ Important Notes

1. **Building requires local development environment:**
   - iOS: Mac with Xcode 14+
   - Android: Any OS with Android Studio

2. **Lovable cannot build native apps directly:**
   - You must pull the code and build locally
   - Use `npx cap sync` after each code change

3. **Before Production Release:**
   - Remove `server.url` from capacitor.config.ts
   - Update icons and splash screens
   - Configure code signing
   - Test thoroughly on real devices

4. **Biometric Auth Note:**
   - The package `@capacitor-community/biometric-auth` failed to install
   - Alternative: Use `@aparajita/capacitor-biometric-auth` if needed

---

## 📚 Resources

- [Capacitor Docs](https://capacitorjs.com/docs)
- [iOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [Android Material Design](https://material.io/design)
- [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [Google Play Policy](https://play.google.com/about/developer-content-policy/)

---

## 🎉 Ready for Next Phase?

Once you've run `npx cap add ios` and `npx cap add android` locally, you can:

1. **Phase 3:** Integrate native features into existing components
2. **Phase 4-5:** Prepare assets and store listings
3. **Phase 6:** Enhance mobile UX with gestures
4. **Phase 7:** Optimize performance
5. **Phase 8:** Test on real devices
6. **Phase 9:** Submit to App Store & Play Store

Let me know when you're ready to continue with the next phase!
