# Mobile App Setup Guide - 3BI.AI

## Overview
Complete guide to build and deploy native iOS and Android apps using Capacitor framework. This document covers development setup, native platform configuration, app store submission, and production deployment.

---

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Completed Setup](#completed-setup)
3. [iOS Native App Setup](#ios-native-app-setup)
4. [Android Native App Setup](#android-native-app-setup)
5. [App Store Screenshots](#app-store-screenshots)
6. [App Store Submission](#app-store-submission)
7. [Testing & QA](#testing--qa)
8. [Production Deployment](#production-deployment)
9. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### For iOS Development
- **Mac computer** (macOS 12 Monterey or later)
- **Xcode 14+** (free from Mac App Store)
- **Apple Developer Account** ($99/year) - [Sign up here](https://developer.apple.com/programs/)
- **CocoaPods** installed: `sudo gem install cocoapods`
- **iOS 14.0+** deployment target

### For Android Development
- **Android Studio** (any OS: Mac, Windows, Linux) - [Download here](https://developer.android.com/studio)
- **JDK 17+** installed - [Download OpenJDK](https://adoptium.net/)
- **Google Play Developer Account** ($25 one-time) - [Sign up here](https://play.google.com/console/signup)
- **Android SDK 24+** (Android 7.0+) minimum target

### Common Requirements
- **Node.js 18+** and **npm**
- **Git** for version control
- **Capacitor CLI**: Already configured in project

---

## Completed Setup ✅

The following has already been configured in this project:

### 1. Capacitor Configuration
- ✅ `capacitor.config.ts` configured with:
  - App ID: `ai.threebi.app`
  - App Name: `3BI.AI`
  - Production-ready (no hot-reload URL)
  - Splash screen and status bar configuration
  - Keyboard, push notifications, camera plugins

### 2. Mobile Hooks & Components
- ✅ 50+ mobile-specific React hooks in `src/hooks/`
- ✅ 10+ mobile components in `src/components/mobile/`
- ✅ Safe area support with `MobileOptimizedLayout`
- ✅ Offline indicator and queue system
- ✅ Native platform detection

### 3. PWA Configuration
- ✅ Service worker for offline support
- ✅ Web manifest configured
- ✅ App icons at multiple sizes (192x192, 512x512)
- ✅ Splash screens for iOS devices

### 4. App Store Assets
- ✅ App icon (1024x1024px)
- ✅ Splash screens (multiple sizes)
- ✅ Marketing description (4000 chars)
- ✅ Promotional text (170 chars)
- ✅ Keywords optimized for ASO
- ✅ Release notes for v1.0.0

### 5. Security Hardening
- ✅ JWT verification enabled on sensitive endpoints
- ✅ Server-side input validation with Zod schemas
- ✅ Admin verification middleware
- ✅ RLS policies hardened

---

## iOS Native App Setup

### Step 1: Export Project to GitHub

1. In Lovable editor, click **"Export to GitHub"** button
2. Authorize Lovable GitHub App if prompted
3. Create or select a repository
4. Wait for sync to complete

### Step 2: Clone Repository Locally

```bash
# Clone your repository
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO

# Install dependencies
npm install

# Build the web app
npm run build
```

### Step 3: Add iOS Platform

```bash
# Add iOS platform (creates ios/ directory)
npx cap add ios

# Update iOS dependencies
npx cap update ios

# Sync web build to iOS
npx cap sync ios
```

### Step 4: Configure iOS Project in Xcode

```bash
# Open project in Xcode
npx cap open ios
```

#### 4.1 Configure Info.plist Permissions

Open `ios/App/App/Info.plist` and add these permission descriptions:

```xml
<key>NSCameraUsageDescription</key>
<string>Take photos for AI image analysis and processing</string>

<key>NSPhotoLibraryUsageDescription</key>
<string>Select images from your library for AI processing</string>

<key>NSMicrophoneUsageDescription</key>
<string>Enable voice input for AI conversations</string>

<key>NSPhotoLibraryAddUsageDescription</key>
<string>Save AI-generated images to your photo library</string>

<key>NSFaceIDUsageDescription</key>
<string>Use Face ID for secure authentication</string>

<key>NSSpeechRecognitionUsageDescription</key>
<string>Enable voice commands and dictation</string>

<key>NSLocationWhenInUseUsageDescription</key>
<string>Provide location-based AI recommendations</string>
```

#### 4.2 Configure Code Signing

1. In Xcode, select the **App** target
2. Go to **"Signing & Capabilities"** tab
3. Select your **Team** (requires Apple Developer account)
4. Change **Bundle Identifier** to `ai.threebi.app`
5. Enable **"Automatically manage signing"**
6. Xcode will automatically create provisioning profiles

#### 4.3 Add App Icons

1. Navigate to `ios/App/App/Assets.xcassets/AppIcon.appiconset`
2. Use the 1024x1024 icon from `public/app-store/icon-1024.png`
3. Generate all required sizes using [App Icon Generator](https://www.appicon.co/)
4. Drag and drop generated icons into Xcode

#### 4.4 Configure Splash Screen

1. Navigate to `ios/App/App/Assets.xcassets/Splash.imageset`
2. Add splash images from `public/app-store/splash-*.png`
3. Set launch screen settings in **App target → General → App Icons and Launch Screen**

#### 4.5 Set Deployment Target

1. Select **App** target in Xcode
2. Go to **General** tab
3. Set **Deployment Info → iOS** to **14.0** minimum

### Step 5: Build and Test on iOS Simulator

```bash
# Run on simulator
npx cap run ios

# Or in Xcode:
# 1. Select any iPhone simulator
# 2. Click Play button (Cmd+R)
```

### Step 6: Build for App Store

#### 6.1 Archive the App

1. In Xcode menu: **Product → Scheme → Edit Scheme**
2. Select **Run** → **Build Configuration** → **Release**
3. Select **"Any iOS Device (arm64)"** as target (not simulator)
4. In Xcode menu: **Product → Archive**
5. Wait for build to complete (5-10 minutes)

#### 6.2 Upload to App Store Connect

1. When archive completes, **Organizer** window opens automatically
2. Select your archive → Click **"Distribute App"**
3. Choose **"App Store Connect"**
4. Select **"Upload"**
5. Choose **automatic signing**
6. Click **"Upload"**
7. Wait for upload (5-20 minutes depending on connection)

#### 6.3 Verify Upload

1. Go to [App Store Connect](https://appstoreconnect.apple.com/)
2. Navigate to **"My Apps"** → Select your app
3. Go to **"TestFlight"** tab
4. Your build should appear under **"iOS Builds"** (may take 10-30 minutes to process)

---

## Android Native App Setup

### Step 1: Clone Repository (If Not Done)

```bash
# Same as iOS setup
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
npm install
npm run build
```

### Step 2: Add Android Platform

```bash
# Add Android platform (creates android/ directory)
npx cap add android

# Update Android dependencies
npx cap update android

# Sync web build to Android
npx cap sync android
```

### Step 3: Configure Android Project in Android Studio

```bash
# Open project in Android Studio
npx cap open android
```

#### 3.1 Verify AndroidManifest.xml Permissions

Open `android/app/src/main/AndroidManifest.xml` and verify these permissions exist:

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.VIBRATE" />
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />

<uses-feature android:name="android.hardware.camera" android:required="false" />
<uses-feature android:name="android.hardware.microphone" android:required="false" />
```

#### 3.2 Configure App Signing (Release Build)

##### Generate a Release Keystore

```bash
# Navigate to android/app directory
cd android/app

# Generate new keystore
keytool -genkey -v -keystore 3bi-release.keystore \
  -alias 3bi-key \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000

# Answer prompts:
# - Enter keystore password (SAVE THIS!)
# - Enter key password (SAVE THIS!)
# - Fill in organization details
```

**CRITICAL: Save your keystore file and passwords securely! If you lose these, you cannot update your app in Play Store.**

##### Create keystore.properties File

Create `android/keystore.properties` (this file should be in `.gitignore`):

```properties
storePassword=YOUR_STORE_PASSWORD_HERE
keyPassword=YOUR_KEY_PASSWORD_HERE
keyAlias=3bi-key
storeFile=3bi-release.keystore
```

##### Update build.gradle for Signing

Open `android/app/build.gradle` and add signing configuration:

```gradle
// Add at the top of the file (before android block)
def keystorePropertiesFile = rootProject.file("keystore.properties")
def keystoreProperties = new Properties()
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}

android {
    // ... existing config ...

    signingConfigs {
        release {
            keyAlias keystoreProperties['keyAlias']
            keyPassword keystoreProperties['keyPassword']
            storeFile file(keystoreProperties['storeFile'])
            storePassword keystoreProperties['storePassword']
        }
    }

    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
```

#### 3.3 Add App Icons

1. Navigate to `android/app/src/main/res/`
2. Replace launcher icons in each `mipmap-*` folder:
   - `mipmap-hdpi/ic_launcher.png` (72x72)
   - `mipmap-mdpi/ic_launcher.png` (48x48)
   - `mipmap-xhdpi/ic_launcher.png` (96x96)
   - `mipmap-xxhdpi/ic_launcher.png` (144x144)
   - `mipmap-xxxhdpi/ic_launcher.png` (192x192)
3. Use [Android Asset Studio](https://romannurik.github.io/AndroidAssetStudio/) to generate adaptive icons

#### 3.4 Configure Splash Screen

1. Navigate to `android/app/src/main/res/drawable/`
2. Replace `splash.png` with your splash screen image
3. Adjust splash screen settings in `android/app/src/main/res/values/styles.xml`

### Step 4: Build and Test on Android Emulator

```bash
# Run on emulator/device
npx cap run android

# Or in Android Studio:
# 1. Create/start an emulator (Tools → Device Manager)
# 2. Click Play button
```

### Step 5: Build AAB for Play Store

```bash
# Navigate to android directory
cd android

# Build release AAB (Android App Bundle)
./gradlew bundleRelease

# Output file location:
# android/app/build/outputs/bundle/release/app-release.aab
```

**Note:** AAB (Android App Bundle) is required for Play Store. APK files are only for direct distribution.

### Step 6: Test the Release Build Locally

```bash
# Generate APKs from AAB for local testing
bundletool build-apks --bundle=app/build/outputs/bundle/release/app-release.aab \
  --output=3bi-release.apks \
  --ks=app/3bi-release.keystore \
  --ks-key-alias=3bi-key

# Install on connected device
bundletool install-apks --apks=3bi-release.apks
```

---

## App Store Screenshots

### Screenshot Dimensions Required

| Platform | Device | Dimensions | Required |
|----------|--------|------------|----------|
| iOS | iPhone 6.7" | 1290 x 2796 px | ✅ Yes |
| iOS | iPhone 6.5" | 1242 x 2688 px | ✅ Yes |
| iOS | iPad Pro 12.9" | 2048 x 2732 px | ⚠️ Recommended |
| Android | Phone | 1080 x 2400 px | ✅ Yes |
| Android | Tablet | 1600 x 2560 px | ⚠️ Recommended |

### Using the Screenshot Generator

1. Navigate to `/screenshots` route in the app
2. Select device type from dropdown
3. Select screen type (Hero, Grok, Dashboard, etc.)
4. Use your OS screenshot tool to capture the preview
5. Save with naming convention: `screen-name-device-type.png`

### Recommended Screenshots (in order)

1. **Hero/Home** - "Free Access to 12 Premium AI Models"
2. **Grok Chat** - "Chat with Grok 4 - Unlimited Free"
3. **Dashboard** - "27+ AI Features - All Free"
4. **Image Generation** - "AI Image Generation - Unlimited"
5. **Voice AI** - "Natural Voice AI - Free Forever"
6. **Settings** - "Customize Your Experience"
7. **Features Grid** - "All 27 Features Unlocked"
8. **Multi-Model Chat** - "Compare AI Models Side-by-Side"

### Screenshot Best Practices

- Use the highest resolution device size (iPhone 6.7", 2796px tall)
- App Store will automatically scale down for smaller devices
- Show actual UI with realistic data (not lorem ipsum)
- Avoid text that's too small to read when scaled
- Test screenshots in App Store Connect preview before submitting

---

## App Store Submission

### Apple App Store Connect

#### Step 1: Create App Listing

1. Go to [App Store Connect](https://appstoreconnect.apple.com/)
2. Click **"My Apps"** → **"+"** → **"New App"**
3. Fill in app information:
   - **Platform:** iOS
   - **Name:** 3BI.AI - Free AI Platform
   - **Primary Language:** English (U.S.)
   - **Bundle ID:** ai.threebi.app
   - **SKU:** 3BIAI001 (unique identifier)

#### Step 2: Complete App Information

**App Information Tab:**
- **Name:** 3BI.AI - Free AI Platform
- **Subtitle:** Grok, Claude 4, GPT-5 & More
- **Privacy Policy URL:** https://3bi.ai/privacy
- **Category:** Productivity (Primary), Business (Secondary)
- **Content Rights:** Check if you own all rights

**Pricing and Availability:**
- **Price:** Free
- **Availability:** All countries

#### Step 3: Prepare for Submission

**Version Information:**
- **Version:** 1.0.0
- **Copyright:** 2025 3BI.AI
- **Description:** Paste from `public/app-store/description.txt`
- **Keywords:** Paste from `public/app-store/keywords.txt`
- **Promotional Text:** Paste from `public/app-store/promotional-text.txt`
- **What's New:** Paste from `public/app-store/release-notes.txt`

**App Preview and Screenshots:**
- Upload screenshots for iPhone 6.7" (required)
- Upload screenshots for iPhone 6.5" (required)
- Upload screenshots for iPad Pro 12.9" (recommended)
- Optional: Upload app preview video (15-30 seconds)

**Build:**
- Select the build you uploaded earlier
- If build is missing, wait 10-30 minutes for processing

**App Review Information:**
- **Sign-in required:** No (guest access available)
- **Contact Information:** Provide valid email and phone
- **Notes:** "All features are free. No sign-in required to test core functionality."

**Age Rating:**
- Complete questionnaire
- Expected rating: **4+**

#### Step 4: Submit for Review

1. Review all information for accuracy
2. Click **"Add for Review"**
3. Click **"Submit to App Review"**
4. Wait 1-3 days for review
5. Monitor status in App Store Connect

### Google Play Console

#### Step 1: Create App

1. Go to [Google Play Console](https://play.google.com/console/)
2. Click **"Create app"**
3. Fill in details:
   - **App name:** 3BI.AI - Free AI Platform
   - **Default language:** English (United States)
   - **App or game:** App
   - **Free or paid:** Free

#### Step 2: Set Up Store Listing

**Main store listing:**
- **App name:** 3BI.AI - Free AI Platform
- **Short description:** (max 80 chars) Access 12 premium AI models completely free. Grok 4, Claude, GPT-5 & more.
- **Full description:** Paste from `public/app-store/description.txt` (max 4000 chars)
- **App icon:** Upload 512x512 PNG
- **Feature graphic:** Upload 1024x500 PNG
- **Phone screenshots:** Upload 2-8 screenshots (1080x2400)
- **7-inch tablet screenshots:** Optional but recommended
- **10-inch tablet screenshots:** Optional but recommended

**Categorization:**
- **Category:** Productivity
- **Tags:** artificial-intelligence, productivity, chatbot, image-generator

**Contact details:**
- **Email:** admin@3bi.ai
- **Website:** https://3bi.ai
- **Privacy policy:** https://3bi.ai/privacy

#### Step 3: Complete Content Rating

1. Click **"Content rating"** → **"Start questionnaire"**
2. Select **"Utility, Productivity, Communication, or Other"**
3. Answer all questions honestly
4. Expected rating: **Everyone** or **Teen**

#### Step 4: Set Up App Access

1. Click **"App access"**
2. Select **"All functionality is available without special access"**
3. Or provide test account if needed

#### Step 5: Upload App Bundle

1. Click **"Production"** → **"Create new release"**
2. Upload the AAB file: `android/app/build/outputs/bundle/release/app-release.aab`
3. Add release notes from `public/app-store/release-notes.txt`
4. Save release

#### Step 6: Submit for Review

1. Review all sections for completeness (all must be green checkmarks)
2. Click **"Send for review"**
3. Wait 3-7 days for review (usually faster than iOS)
4. Monitor status in Play Console

---

## Testing & QA

### Automated Testing

```bash
# Run all automated tests
npm run test

# Run with coverage report
npm run test:coverage

# Expected: 21 tests passing, >80% coverage
```

### Device Testing Priority Matrix

| Device | Priority | Testing Focus |
|--------|----------|---------------|
| iPhone 15 Pro | 🔴 High | All features, performance, camera |
| iPhone SE (2022) | 🔴 High | Small screen, budget performance |
| Samsung Galaxy S23 | 🔴 High | Android flagship, latest Android |
| Google Pixel 8 | 🔴 High | Stock Android experience |
| Budget Android (Moto G) | 🔴 High | Low-end performance testing |
| iPad Pro | 🟡 Medium | Tablet layout, large screen |
| Samsung Galaxy Tab | 🟡 Medium | Android tablet experience |

### Critical Test Flows

1. **First Launch Experience**
   - ✅ App launches without errors
   - ✅ Splash screen displays correctly
   - ✅ Hero section loads with animations
   - ✅ Navigation is accessible

2. **Core AI Features**
   - ✅ Grok chat: Send message, receive response
   - ✅ Image generation: Generate and download image
   - ✅ Voice synthesis: Generate and play audio
   - ✅ Code generation: Generate and copy code

3. **Offline Functionality**
   - ✅ Enable airplane mode
   - ✅ App shows offline indicator
   - ✅ Queued actions saved locally
   - ✅ Actions sync when back online

4. **Performance**
   - ✅ App launch < 2 seconds
   - ✅ Smooth 60fps scrolling
   - ✅ Memory usage < 150MB
   - ✅ No memory leaks after 10 minutes use

5. **Native Features**
   - ✅ Camera access for image upload
   - ✅ Haptic feedback on interactions
   - ✅ Push notifications (if implemented)
   - ✅ Biometric authentication (if implemented)

### Performance Benchmarks

| Metric | Target | Critical |
|--------|--------|----------|
| App Launch Time | < 2s | < 3s |
| Message Send Response | < 1s | < 2s |
| Image Generation | < 5s | < 10s |
| Bundle Size | < 10MB | < 15MB |
| Memory Usage | < 150MB | < 250MB |
| Battery Drain | < 5%/hr | < 10%/hr |

---

## Production Deployment

### Pre-Deployment Checklist

- [ ] All automated tests passing
- [ ] Security audit completed (JWT enabled, RLS policies hardened)
- [ ] Environment variables configured in production
- [ ] Supabase project upgraded to production tier
- [ ] CDN/hosting configured for static assets
- [ ] Error tracking configured (Sentry)
- [ ] Analytics configured
- [ ] Privacy policy and terms of service published
- [ ] Support email configured (admin@3bi.ai)

### Environment Configuration

**Supabase Production Setup:**
1. Upgrade Supabase project to Pro tier ($25/month minimum)
2. Configure custom domain (optional)
3. Enable daily backups
4. Configure production database instance size
5. Review and optimize connection pooling

**Edge Function Configuration:**
1. Verify all edge functions have `verify_jwt = true` (except public demos)
2. Add rate limiting for production traffic
3. Configure CORS for production domains
4. Enable function logs and monitoring

### Post-Deployment Verification

1. **App Store Releases:**
   - Monitor crash reports in App Store Connect / Play Console
   - Track download metrics
   - Respond to user reviews within 24 hours
   - Monitor app ratings

2. **Backend Monitoring:**
   - Check Supabase dashboard for errors
   - Monitor edge function invocation counts
   - Review database query performance
   - Check for RLS policy violations

3. **User Feedback:**
   - Set up in-app feedback mechanism
   - Monitor support email (admin@3bi.ai)
   - Track feature requests
   - Identify common pain points

---

## Troubleshooting

### Common iOS Issues

**Issue: "Code Signing Error"**
```
Solution:
1. Ensure you're logged into Xcode with Apple ID
2. Select correct Development Team in signing settings
3. Enable "Automatically manage signing"
4. Clean build folder (Cmd+Shift+K) and rebuild
```

**Issue: "Provisioning Profile Expired"**
```
Solution:
1. Go to developer.apple.com → Certificates, IDs & Profiles
2. Delete expired provisioning profiles
3. In Xcode, go to Preferences → Accounts
4. Select Apple ID → Download Manual Profiles
5. Rebuild app
```

**Issue: "Build Failed - Capacitor Not Found"**
```bash
# Solution:
cd ios/App
pod install --repo-update
cd ../..
npx cap sync ios
```

**Issue: "App Crashes on Launch"**
```
Solution:
1. Check Xcode console for error logs
2. Verify all required permissions in Info.plist
3. Ensure bundle identifier matches capacitor.config.ts
4. Test on real device, not just simulator
```

### Common Android Issues

**Issue: "Gradle Build Failed"**
```bash
# Solution:
cd android
./gradlew clean
./gradlew build --refresh-dependencies
```

**Issue: "Keystore Not Found"**
```
Solution:
1. Verify keystore file exists at android/app/3bi-release.keystore
2. Check keystore.properties file has correct path
3. Ensure passwords are correct
4. Regenerate keystore if lost (creates new app in Play Store)
```

**Issue: "App Not Installing on Device"**
```bash
# Solution:
# Check device compatibility
adb devices

# Uninstall old version
adb uninstall ai.threebi.app

# Reinstall
adb install app/build/outputs/apk/release/app-release.apk
```

**Issue: "Release Build Crashes (Debug Works)"**
```
Solution:
1. Check ProGuard rules in proguard-rules.pro
2. Add keep rules for reflection-based libraries
3. Test with minifyEnabled false temporarily
4. Check crash logs in Play Console
```

### Capacitor Sync Issues

**Issue: "Native Project Out of Sync"**
```bash
# Solution: Re-sync everything
npm run build
npx cap sync
npx cap update ios
npx cap update android
```

**Issue: "Plugin Not Found"**
```bash
# Solution: Reinstall Capacitor plugins
npm install @capacitor/core @capacitor/cli
npm install @capacitor/ios @capacitor/android
npx cap sync
```

---

## Resources & Documentation

### Official Documentation
- [Capacitor Documentation](https://capacitorjs.com/docs)
- [iOS Developer Documentation](https://developer.apple.com/documentation/)
- [Android Developer Documentation](https://developer.android.com/docs)
- [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [Google Play Policy Center](https://play.google.com/about/developer-content-policy/)

### Useful Tools
- [App Icon Generator](https://www.appicon.co/)
- [Android Asset Studio](https://romannurik.github.io/AndroidAssetStudio/)
- [Screenshot Framer](https://screenshots.pro/)
- [App Store Screenshot Generator](https://www.appstorescreenshot.com/)

### Support
- **Technical Issues:** Create issue in GitHub repository
- **App Store Questions:** admin@3bi.ai
- **Community:** [3BI.AI Discord](#) (if available)

---

## Status

| Phase | Status | Completion |
|-------|--------|------------|
| ✅ Capacitor Setup | Complete | 100% |
| ✅ Security Hardening | Complete | 100% |
| ✅ Mobile UX Optimization | Complete | 100% |
| ✅ App Store Content | Complete | 100% |
| ✅ Screenshot Generator | Complete | 100% |
| ⏳ iOS Native Setup | User Action Required | 0% |
| ⏳ Android Native Setup | User Action Required | 0% |
| ⏳ Testing & QA | User Action Required | 0% |
| ⏳ App Store Submission | Pending | 0% |

---

**Last Updated:** 2025-01-27  
**Version:** 1.0.0  
**Contact:** admin@3bi.ai
