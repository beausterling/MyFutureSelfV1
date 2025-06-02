import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Link, router } from 'expo-router';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { GradientBackground } from '@/components/GradientBackground';
import { Button } from '@/components/Button';
import tw from '@/lib/tw';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '@/lib/theme';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function WelcomeScreen() {
  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-Medium': Inter_500Medium,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const handleGetStarted = () => {
    router.push('/signup');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <GradientBackground>
      <StatusBar style="light" />
      
      <View style={tw`flex-1 px-6 justify-between py-12`}>
        <Animated.View 
          entering={FadeInDown.duration(800).delay(300)}
          style={tw`items-center mt-4`}
        >
          <LinearGradient
            colors={[colors.primary[400], colors.primary[600]]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={tw`w-16 h-16 rounded-full items-center justify-center mb-2`}
          >
            <Text style={tw`text-white text-2xl font-bold`}>MF</Text>
          </LinearGradient>
          <Text style={tw`text-white text-2xl font-semibold`}>My Future Self</Text>
        </Animated.View>

        <Animated.View 
          entering={FadeInUp.duration(800).delay(600)}
          style={tw`items-center justify-center flex-1`}
        >
          <View style={styles.illustrationContainer}>
            <View style={[tw`absolute z-10 w-40 h-40 rounded-full bg-primary-500/20`, styles.innerCircle]}>
              <View style={tw`w-32 h-32 rounded-full bg-primary-500/30`}>
                <View style={tw`w-24 h-24 rounded-full bg-primary-500/40 items-center justify-center`}>
                  <View style={tw`w-16 h-16 rounded-full bg-primary-500/50 items-center justify-center`}>
                    <View style={tw`w-10 h-10 rounded-full bg-primary-500`} />
                  </View>
                </View>
              </View>
            </View>
            
            <Image
              source={{ uri: 'https://images.pexels.com/photos/7433822/pexels-photo-7433822.jpeg?auto=compress&cs=tinysrgb&w=600' }}
              style={styles.personImage}
              resizeMode="cover"
            />
          </View>
          
          <View style={tw`mt-8 items-center px-4`}>
            <Text style={tw`text-white text-3xl font-semibold text-center mb-3`}>
              Accountability that actually works
            </Text>
            <Text style={tw`text-gray-300 text-center text-lg mb-8`}>
              Your future self is calling.
            </Text>
          </View>
        </Animated.View>

        <Animated.View 
          entering={FadeInUp.duration(800).delay(900)}
          style={tw`w-full gap-4`}
        >
          <Button
            fullWidth
            variant="primary"
            size="lg"
            onPress={handleGetStarted}
          >
            Get Started
          </Button>
          
          <Button
            fullWidth
            variant="ghost"
            onPress={handleLogin}
          >
            <Text style={tw`text-white`}>Login</Text>
          </Button>
        </Animated.View>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  illustrationContainer: {
    width: 280,
    height: 280,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  innerCircle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  personImage: {
    position: 'absolute',
    bottom: 0,
    width: 180,
    height: 230,
    borderRadius: 20,
    zIndex: 20,
  },
});