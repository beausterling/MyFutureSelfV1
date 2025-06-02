import React from 'react';
import { 
  TouchableOpacity, 
  TouchableOpacityProps, 
  StyleSheet,
  ViewStyle,
} from 'react-native';
import tw from '@/lib/tw';

interface IconButtonProps extends TouchableOpacityProps {
  icon: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'ghost';
  style?: ViewStyle;
}

export function IconButton({
  icon,
  size = 'md',
  variant = 'primary',
  style,
  ...props
}: IconButtonProps) {
  // Size styles
  const sizeMap = {
    sm: tw`p-1.5`,
    md: tw`p-2.5`,
    lg: tw`p-3.5`,
  };

  // Variant styles
  const variantMap = {
    primary: tw`bg-primary-500 rounded-full`,
    secondary: tw`bg-secondary-100 rounded-full`,
    ghost: tw`bg-transparent`,
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.button,
        sizeMap[size],
        variantMap[variant],
        style,
      ]}
      {...props}
    >
      {icon}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});