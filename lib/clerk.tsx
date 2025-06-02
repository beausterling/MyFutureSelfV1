import { ClerkProvider } from '@clerk/clerk-expo';
import { useCallback, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { colors } from '@/lib/theme';
import Constants from 'expo-constants';

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export default function ClerkProviderWithChildren({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Get the publishable key from Constants
  const publishableKey = Constants.expoConfig?.extra?.clerkPublishableKey as string;

  // Debug logging
  console.log('Clerk initialization:', {
    publishableKey: publishableKey ? 'exists' : 'missing',
    loading,
    error
  });

  if (!publishableKey) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.secondary[950] }}>
        <Text style={{ color: colors.error[500], marginBottom: 12, textAlign: 'center', padding: 20 }}>
          Missing Clerk publishable key{'\n'}
          Please check your .env file and ensure EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY is set correctly
        </Text>
      </View>
    );
  }

  const handleInitialLoaded = useCallback(() => {
    console.log('Clerk initialized successfully');
    setLoading(false);
  }, []);

  const handleError = useCallback((err: Error) => {
    console.error('Clerk initialization error:', err);
    setError(err.message);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.secondary[950] }}>
        <ActivityIndicator size="large" color={colors.primary[500]} />
        <Text style={{ color: colors.gray[300], marginTop: 12 }}>Initializing...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.secondary[950] }}>
        <Text style={{ color: colors.error[500], marginBottom: 12, textAlign: 'center', padding: 20 }}>
          Error initializing Clerk:{'\n'}
          {error}
        </Text>
      </View>
    );
  }

  return (
    <ClerkProvider
      publishableKey={publishableKey}
      tokenCache={tokenCache}
      onInitialLoaded={handleInitialLoaded}
      onError={handleError}
    >
      {children}
    </ClerkProvider>
  );
}