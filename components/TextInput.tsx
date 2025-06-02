import React, { useState } from 'react';
import { 
  View, 
  TextInput as RNTextInput, 
  Text, 
  StyleSheet, 
  TextInputProps as RNTextInputProps,
  Platform,
} from 'react-native';
import tw from '@/lib/tw';
import { Eye as EyeIcon, EyeOff as EyeOffIcon } from 'lucide-react-native';
import { colors } from '@/lib/theme';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface TextInputProps extends RNTextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function TextInput({
  label,
  error,
  leftIcon,
  rightIcon,
  secureTextEntry,
  ...props
}: TextInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const borderColor = error
    ? tw.color('error-500')
    : isFocused
    ? tw.color('primary-500')
    : tw.color('gray-300');

  return (
    <View style={tw`mb-4 w-full`}>
      {label && (
        <Text style={tw`text-sm font-medium mb-1.5 text-gray-800`}>
          {label}
        </Text>
      )}
      
      <View
        style={[
          tw`flex-row items-center bg-white border rounded-xl px-3 py-2`,
          { borderColor },
          Platform.OS === 'web' && styles.webInput
        ]}
      >
        {leftIcon && <View style={tw`mr-2`}>{leftIcon}</View>}
        
        <RNTextInput
          style={tw`flex-1 text-base text-gray-900`}
          placeholderTextColor={tw.color('gray-400')}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          {...props}
        />
        
        {secureTextEntry && (
          <TouchableOpacity onPress={togglePasswordVisibility} style={tw`ml-2`}>
            {isPasswordVisible ? (
              <EyeOffIcon size={20} color={colors.gray[400]} />
            ) : (
              <EyeIcon size={20} color={colors.gray[400]} />
            )}
          </TouchableOpacity>
        )}
        
        {rightIcon && !secureTextEntry && (
          <View style={tw`ml-2`}>{rightIcon}</View>
        )}
      </View>
      
      {error && (
        <Text style={tw`text-xs text-error-500 mt-1`}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  webInput: {
    outlineStyle: 'none',
  },
});