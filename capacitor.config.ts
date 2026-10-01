import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.bibleshuffle.app',
  appName: 'BibleShuffle',
  webDir: 'www',
  server: {
    url: 'https://yourbibleshuffle.base44.app',
    cleartext: false,
  },
};

export default config;
