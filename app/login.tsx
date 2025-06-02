import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Link, router } from 'expo-router';
import { useSignIn } from '@clerk/clerk-expo';
import { GradientBackground } from '@/components/GradientBackground';
import { Button } from '@/components/Button';
import { TextInput } from '@/components/TextInput';
import { IconButton } from '@/components/IconButton';
import tw from '@/lib/tw';
import { ArrowLeft, Mail, Lock } from 'lucide-react-native';
import { colors } from '@/lib/theme';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { signIn, setActive } = useSignIn();
  
  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });
      
      await setActive({ session: result.createdSessionId });
      router.replace('/(tabs)');
    } catch (err: any) {
      setError(err.errors?.[0]?.message || 'Failed to sign in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GradientBackground>
      <StatusBar style="light" />
      
      <ScrollView 
        contentContainerStyle={tw`flex-1 p-6`}
        keyboardShouldPersistTaps="handled"
      >
        <View style={tw`flex-1 justify-between py-6`}>
          {/* Header */}
          <View>
            <IconButton
              icon={<ArrowLeft size={24} color={colors.white} />}
              variant="ghost"
              style={tw`mb-6 -ml-2`}
              onPress={() => router.back()}
            />
            
            <Animated.View entering={FadeInDown.duration(800).delay(200)}>
              <Text style={tw`text-white text-3xl font-semibold mb-2`}>
                Welcome back
              </Text>
              <Text style={tw`text-gray-300 text-base mb-8`}>
                Sign in to continue your journey
              </Text>
            </Animated.View>
            
            {/* Form */}
            <Animated.View entering={FadeInDown.duration(800).delay(400)}>
              {error ? (
                <View style={tw`bg-error-500/20 p-3 rounded-lg mb-4`}>
                  <Text style={tw`text-error-500 text-sm`}>{error}</Text>
                </View>
              ) : null}
              
              <TextInput
                label="Email"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                leftIcon={<Mail size={20} color={colors.gray[400]} />}
              />
              
              <TextInput
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                leftIcon={<Lock size={20} color={colors.gray[400]} />}
              />
              
              <View style={tw`items-end mb-6`}>
                <Link href="/forgot-password" asChild>
                  <Text style={tw`text-primary-500 text-sm`}>
                    Forgot password?
                  </Text>
                </Link>
              </View>
            </Animated.View>
          </View>
          
          {/* Footer */}
          <Animated.View entering={FadeInDown.duration(800).delay(600)}>
            <Button
              fullWidth
              variant="primary"
              size="lg"
              isLoading={isLoading}
              onPress={handleLogin}
              style={tw`mb-4`}
            >
              Sign In
            </Button>
            
            <View style={tw`flex-row justify-center`}>
              <Text style={tw`text-gray-300 mr-1`}>
                Don't have an account?
              </Text>
              <Link href="/signup" asChild>
                <Text style={tw`text-primary-500 font-medium`}>
                  Sign Up
                </Text>
              </Link>
            </View>
          </Animated.View>
        </View>
      </ScrollView>
    </GradientBackground>
  );
}