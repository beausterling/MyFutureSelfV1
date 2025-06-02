import { ExpoConfig, ConfigContext } from 'expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'My Future Self',
  slug: 'my-future-self',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'my-future-self',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#0F172A'
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#0F172A'
    },
  },
  web: {
    bundler: 'metro',
    favicon: './assets/images/favicon.png',
    output: 'server',
  },
  plugins: ['expo-router', 'expo-font'],
  extra: {
    eas: {
      projectId: 'your-project-id',
    },
    clerkPublishableKey: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY,
  },
  owner: 'your-expo-username',
  runtimeVersion: {
    policy: 'appVersion',
  },
});