import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  ActivityIndicator,
  StyleSheet, 
  TouchableOpacityProps,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, borderRadius, spacing, fontSizes } from '@/lib/theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends TouchableOpacityProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  style,
  textStyle,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  const getButtonStyles = () => {
    const baseStyles = [
      styles.button,
      styles[size],
      styles[variant],
      fullWidth && styles.fullWidth,
      style,
    ];

    if (isDisabled) {
      baseStyles.push(styles.disabled);
    }

    return baseStyles;
  };

  const getTextStyles = () => {
    const baseStyles = [
      styles.text,
      styles[`${size}Text`],
      styles[`${variant}Text`],
      textStyle,
    ];

    if (isDisabled) {
      baseStyles.push(styles.disabledText);
    }

    return baseStyles;
  };

  const renderContent = () => (
    <>
      {isLoading ? (
        <ActivityIndicator
          color={variant === 'primary' ? colors.white : colors.primary[500]}
          size="small"
        />
      ) : (
        <View style={styles.contentContainer}>
          {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
          <Text style={getTextStyles()}>{children}</Text>
          {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
        </View>
      )}
    </>
  );

  if (variant === 'primary' && !isDisabled) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={isDisabled}
        style={[styles.buttonWrapper, fullWidth && styles.fullWidth]}
        {...props}
      >
        <LinearGradient
          colors={[colors.primary[400], colors.primary[600]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[getButtonStyles(), styles.gradient]}
        >
          {renderContent()}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={isDisabled}
      style={getButtonStyles()}
      {...props}
    >
      {renderContent()}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.xl,
  },
  buttonWrapper: {
    overflow: 'hidden',
    borderRadius: borderRadius.xl,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradient: {
    width: '100%',
  },
  fullWidth: {
    width: '100%',
  },
  // Size variants
  sm: {
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1.5],
    borderRadius: borderRadius.lg,
  },
  md: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
    borderRadius: borderRadius.xl,
  },
  lg: {
    paddingHorizontal: spacing[6],
    paddingVertical: spacing[3],
    borderRadius: borderRadius['2xl'],
  },
  // Text sizes
  smText: {
    fontSize: fontSizes.sm,
  },
  mdText: {
    fontSize: fontSizes.md,
  },
  lgText: {
    fontSize: fontSizes.lg,
    fontFamily: 'Inter-Medium',
  },
  // Variant styles
  primary: {},
  secondary: {
    backgroundColor: colors.secondary[100],
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary[500],
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  // Text colors
  primaryText: {
    color: colors.white,
  },
  secondaryText: {
    color: colors.secondary[950],
  },
  outlineText: {
    color: colors.primary[500],
  },
  ghostText: {
    color: colors.primary[500],
  },
  // Disabled state
  disabled: {
    backgroundColor: colors.gray[300],
    opacity: 0.5,
  },
  disabledText: {
    color: colors.gray[500],
  },
  // Icon spacing
  iconLeft: {
    marginRight: spacing[2],
  },
  iconRight: {
    marginLeft: spacing[2],
  },
  text: {
    fontFamily: 'Inter-Regular',
  },
});