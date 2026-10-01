import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  // Change this to your real bundle ID from App Store Connect (e.g. com.chriswitowski.bibleshuffle)
  appId: 'com.bibleshuffle.app',
  appName: 'BibleShuffle',
  // Fallback/offline page that ships inside the app bundle
  webDir: 'www',
  server: {
    // IMPORTANT: replace with your published BibleShuffle Base44 URL
    // (open the app in the Base44 editor, hit Publish, copy the URL)
    url: 'https://YOUR-BIBLESHUFFLE-URL.base44.app',
    // allows the app to open external links
    cleartext: false,
  },
};

export default config;
