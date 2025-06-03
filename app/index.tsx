import React from 'react';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Link, router } from 'expo-router';
import { GradientBackground } from '@/components/GradientBackground';
import { Button } from '@/components/Button';
import { colors } from '@/lib/theme';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

export default function WelcomeScreen() {
  const handleGetStarted = () => {
    router.push('/signup');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <GradientBackground>
      <StatusBar style="light" />
      
      <View style={styles.container}>
        <Animated.View 
          entering={FadeInDown.duration(800).delay(300)}
          style={styles.header}
        >
          <Image
            source={{ uri: 'https://images.pexels.com/photos/7433822/pexels-photo-7433822.jpeg?auto=compress&cs=tinysrgb&w=600' }}
            style={styles.profileImage}
          />
          <Text style={styles.title}>My Future Self</Text>
        </Animated.View>

        <Animated.View 
          entering={FadeInUp.duration(800).delay(600)}
          style={styles.content}
        >
          <View style={styles.textContainer}>
            <Text style={styles.heading}>
              Accountability that actually works
            </Text>
            <Text style={styles.subtitle}>
              Your future self is calling.
            </Text>
          </View>
        </Animated.View>

        <Animated.View 
          entering={FadeInUp.duration(800).delay(900)}
          style={styles.footer}
        >
          <Button
            fullWidth
            variant="primary"
            size="lg"
            onPress={handleGetStarted}
            style={styles.getStartedButton}
          >
            Get Started
          </Button>
          
          <Button
            fullWidth
            variant="ghost"
            onPress={handleLogin}
          >
            <Text style={styles.loginText}>Login</Text>
          </Button>
        </Animated.View>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingVertical: 48,
  },
  header: {
    alignItems: 'center',
    marginTop: 16,
  },
  profileImage: {
    width: 280,
    height: 280,
    borderRadius: 24,
    marginBottom: 24,
  },
  title: {
    color: colors.white,
    fontSize: 32,
    fontFamily: 'Inter-SemiBold',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  heading: {
    color: colors.white,
    fontSize: 32,
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    color: colors.gray[300],
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 32,
  },
  footer: {
    width: '100%',
    gap: 16,
  },
  getStartedButton: {
    marginBottom: 16,
  },
  loginText: {
    color: colors.white,
  },
});