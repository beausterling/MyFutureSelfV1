import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import tw from '@/lib/tw';
import { colors } from '@/lib/theme';
import { Calendar, Clock, Phone } from 'lucide-react-native';
import { format } from 'date-fns';
import { type Goal } from '@/lib/supabase';

interface GoalCardProps {
  goal: Goal;
  onPress: () => void;
}

export function GoalCard({ goal, onPress }: GoalCardProps) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  
  // Calculate days remaining
  const today = new Date();
  const targetDate = new Date(goal.target_date);
  const daysRemaining = Math.max(0, Math.ceil((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
  
  // Progress percentage capped at 100
  const progress = Math.min(100, goal.progress);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  // Progress bar animation
  const progressWidth = useSharedValue(0);
  
  React.useEffect(() => {
    progressWidth.value = withTiming(progress / 100, {
      duration: 1000,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  }, [progress, progressWidth]);
  
  const progressStyle = useAnimatedStyle(() => {
    return {
      width: `${progressWidth.value * 100}%`,
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.98);
    opacity.value = withTiming(0.9, { duration: 150 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
    opacity.value = withTiming(1, { duration: 150 });
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View style={[tw`mb-4 rounded-2xl overflow-hidden`, styles.cardShadow, animatedStyle]}>
        <LinearGradient
          colors={[colors.secondary[950], colors.secondary[900]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={tw`p-4 border border-gray-800`}
        >
          <View style={tw`flex-row justify-between mb-2`}>
            <View style={tw`flex-1 pr-2`}>
              <Text style={tw`text-lg text-white font-semibold mb-1`}>
                {goal.title}
              </Text>
              <Text style={tw`text-gray-300 text-sm mb-2`} numberOfLines={2}>
                {goal.description}
              </Text>
            </View>
            
            <View style={tw`bg-primary-500/20 rounded-full h-16 w-16 justify-center items-center`}>
              <Text style={tw`text-primary-400 font-bold text-xl`}>{progress}%</Text>
            </View>
          </View>
          
          <View style={tw`h-2 bg-gray-800 rounded-full overflow-hidden mb-3`}>
            <Animated.View
              style={[
                tw`h-full rounded-full bg-primary-500`,
                progressStyle,
              ]}
            />
          </View>
          
          <View style={tw`flex-row justify-between`}>
            <View style={tw`flex-row items-center`}>
              <Calendar size={16} color={colors.gray[400]} />
              <Text style={tw`text-gray-400 text-xs ml-1`}>
                {format(targetDate, 'MMM dd, yyyy')}
              </Text>
            </View>
            
            <View style={tw`flex-row items-center`}>
              <Clock size={16} color={colors.gray[400]} />
              <Text style={tw`text-gray-400 text-xs ml-1`}>
                {daysRemaining} days left
              </Text>
            </View>
            
            <View style={tw`flex-row items-center`}>
              <Phone size={16} color={colors.primary[400]} />
              <Text style={tw`text-primary-400 text-xs ml-1 font-medium`}>
                Next: {format(new Date(goal.reminder_time), 'h:mm a')}
              </Text>
            </View>
          </View>
          
          <View style={tw`absolute top-0 right-0 ${goal.status === 'completed' ? 'bg-success' : 'bg-primary-500'} px-2 py-0.5 rounded-bl-lg`}>
            <Text style={tw`text-white text-xs font-medium`}>
              {goal.category}
            </Text>
          </View>
        </LinearGradient>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
});