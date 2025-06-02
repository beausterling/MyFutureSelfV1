import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Link, router } from 'expo-router';
import { useSignUp } from '@clerk/clerk-expo';
import { GradientBackground } from '@/components/GradientBackground';
import { Button } from '@/components/Button';
import { TextInput } from '@/components/TextInput';
import { IconButton } from '@/components/IconButton';
import tw from '@/lib/tw';
import { ArrowLeft, Mail, Lock, User, Phone } from 'lucide-react-native';
import { colors } from '@/lib/theme';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function SignUpScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { signUp, setActive } = useSignUp();
  
  const handleSignUp = async () => {
    if (!firstName || !email || !password) {
      setError('Please fill in all required fields');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const result = await signUp.create({
        firstName,
        lastName,
        emailAddress: email,
        phoneNumber,
        password,
      });
      
      // This creates a session and signs the user in
      await setActive({ session: result.createdSessionId });
      router.replace('/(tabs)');
    } catch (err: any) {
      setError(err.errors?.[0]?.message || 'Failed to sign up. Please try again.');
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
                Create Account
              </Text>
              <Text style={tw`text-gray-300 text-base mb-8`}>
                Sign up to meet your future self
              </Text>
            </Animated.View>
            
            {/* Form */}
            <Animated.View entering={FadeInDown.duration(800).delay(400)}>
              {error ? (
                <View style={tw`bg-error-500/20 p-3 rounded-lg mb-4`}>
                  <Text style={tw`text-error-500 text-sm`}>{error}</Text>
                </View>
              ) : null}
              
              <View style={tw`flex-row gap-4`}>
                <View style={tw`flex-1`}>
                  <TextInput
                    label="First Name"
                    placeholder="First Name"
                    value={firstName}
                    onChangeText={setFirstName}
                    leftIcon={<User size={20} color={colors.gray[400]} />}
                  />
                </View>
                
                <View style={tw`flex-1`}>
                  <TextInput
                    label="Last Name"
                    placeholder="Last Name (Optional)"
                    value={lastName}
                    onChangeText={setLastName}
                    leftIcon={<User size={20} color={colors.gray[400]} />}
                  />
                </View>
              </View>
              
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
                label="Phone Number"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                leftIcon={<Phone size={20} color={colors.gray[400]} />}
              />
              
              <TextInput
                label="Password"
                placeholder="Create a password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                leftIcon={<Lock size={20} color={colors.gray[400]} />}
              />
              
              <Text style={tw`text-gray-400 text-xs mt-2 mb-6`}>
                Password must be at least 8 characters long with a mix of letters, numbers, and symbols.
              </Text>
            </Animated.View>
          </View>
          
          {/* Footer */}
          <Animated.View entering={FadeInDown.duration(800).delay(600)}>
            <Button
              fullWidth
              variant="primary"
              size="lg"
              isLoading={isLoading}
              onPress={handleSignUp}
              style={tw`mb-4`}
            >
              Create Account
            </Button>
            
            <View style={tw`flex-row justify-center`}>
              <Text style={tw`text-gray-300 mr-1`}>
                Already have an account?
              </Text>
              <Link href="/login" asChild>
                <Text style={tw`text-primary-500 font-medium`}>
                  Sign In
                </Text>
              </Link>
            </View>
          </Animated.View>
        </View>
      </ScrollView>
    </GradientBackground>
  );
}