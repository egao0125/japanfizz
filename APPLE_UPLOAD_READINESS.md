# Naka Apple Upload Readiness

This package is now a polished static/PWA prototype. It is not yet a signed native iOS archive, because the original zip did not include an Xcode, Swift, React Native, Expo, or Capacitor project.

## What is included

- Complete mobile app shell in `index.html`
- Production CSS in `styles.css`
- Client-side app behavior in `app.js`
- App icon in `assets/icon.svg`
- PWA manifest in `manifest.webmanifest`
- Offline shell caching in `sw.js`
- Email domain validation, rule agreement, post creation, local feed filtering, class search, voting, comments, reporting, blocking, logout, privacy/rules modals, and basic pre-post moderation checks

## Before App Store submission

Apple upload still requires these native and operational items:

1. Create a native iOS wrapper, usually with Capacitor, Expo, React Native, or a Swift app.
2. Set a real bundle identifier, version, build number, team, signing certificate, and provisioning profile in Xcode.
3. Replace the SVG icon with generated PNG app icon sizes in an `.appiconset`.
4. Connect real authentication, backend storage, moderation review, reporting, account deletion, and block/hide flows.
5. Publish Terms of Service and Privacy Policy URLs.
6. Prepare App Privacy labels for collected data.
7. Provide App Review demo credentials or a university-domain test flow.
8. Capture required App Store screenshots for each supported device size.
9. Archive in Xcode and upload through Organizer or Transporter.

## Suggested native path

For the current static app, the fastest path is Capacitor:

```sh
npm init -y
npm install @capacitor/core @capacitor/cli @capacitor/ios
npx cap init Naka app.naka.campus --web-dir .
npx cap add ios
npx cap open ios
```

Then configure signing and icons in Xcode, test on a real iPhone, archive, and upload.
