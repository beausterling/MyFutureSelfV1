import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import tw from '@/lib/tw';
import { colors } from '@/lib/theme';

interface GradientBackgroundProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'primary' | 'dark';
}

export function GradientBackground({
  children,
  style,
  variant = 'dark',
}: GradientBackgroundProps) {
  const gradients = {
    primary: [colors.primary[500], colors.secondary[900]],
    dark: [colors.secondary[950], colors.secondary[900]],
  };

  return (
    <View style={[styles.container, style]}>
      <LinearGradient
        colors={gradients[variant]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});