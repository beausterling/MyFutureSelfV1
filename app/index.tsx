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
          <LinearGradient
            colors={[colors.primary[400], colors.primary[600]]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.logo}
          >
            <Text style={styles.logoText}>MF</Text>
          </LinearGradient>
          <Text style={styles.title}>My Future Self</Text>
        </Animated.View>

        <Animated.View 
          entering={FadeInUp.duration(800).delay(600)}
          style={styles.content}
        >
          <View style={styles.illustrationContainer}>
            <View style={[styles.innerCircle]}>
              <View style={styles.circle1}>
                <View style={styles.circle2}>
                  <View style={styles.circle3}>
                    <View style={styles.circle4} />
                  </View>
                </View>
              </View>
            </View>
          </View>
          
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
  logo: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  logoText: {
    color: colors.white,
    fontSize: 24,
    fontFamily: 'Inter-Bold',
  },
  title: {
    color: colors.white,
    fontSize: 24,
    fontFamily: 'Inter-SemiBold',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  illustrationContainer: {
    width: 280,
    height: 280,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  innerCircle: {
    position: 'absolute',
    zIndex: 10,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: `${colors.primary[500]}20`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle1: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: `${colors.primary[500]}30`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle2: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: `${colors.primary[500]}40`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle3: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: `${colors.primary[500]}50`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle4: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary[500],
  },
  personImage: {
    position: 'absolute',
    bottom: 0,
    width: 180,
    height: 230,
    borderRadius: 20,
    zIndex: 20,
  },
  textContainer: {
    marginTop: 32,
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