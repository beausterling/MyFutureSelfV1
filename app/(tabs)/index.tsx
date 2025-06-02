import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from '@/lib/tw';
import { GradientBackground } from '@/components/GradientBackground';
import { useUser } from '@clerk/clerk-expo';
import { GoalCard } from '@/components/GoalCard';
import { Bell, Plus } from 'lucide-react-native';
import { colors } from '@/lib/theme';
import { type Goal } from '@/lib/supabase';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { IconButton } from '@/components/IconButton';

// Mock data for demonstration
const mockGoals: Goal[] = [
  {
    id: '1',
    user_id: 'user123',
    title: 'Run 5 miles every week',
    description: 'Maintain my fitness by running consistently each week',
    category: 'Fitness',
    target_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date().toISOString(),
    status: 'active',
    frequency: 'weekly',
    reminder_time: new Date().toISOString(),
    progress: 65,
  },
  {
    id: '2',
    user_id: 'user123',
    title: 'Read 2 books per month',
    description: 'Expand my knowledge by reading consistently',
    category: 'Learning',
    target_date: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date().toISOString(),
    status: 'active',
    frequency: 'monthly',
    reminder_time: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    progress: 30,
  },
  {
    id: '3',
    user_id: 'user123',
    title: 'Meditate daily for 10 minutes',
    description: 'Practice mindfulness daily to reduce stress and improve focus',
    category: 'Wellness',
    target_date: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date().toISOString(),
    status: 'active',
    frequency: 'daily',
    reminder_time: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    progress: 45,
  },
];

export default function HomeScreen() {
  const { user } = useUser();
  
  useFocusEffect(
    React.useCallback(() => {
      // Fetch user goals when the screen comes into focus
      // This would be where you'd fetch actual data from Supabase
      return () => {
        // Clean up if needed
      };
    }, [])
  );

  const firstName = user?.firstName || 'there';
  
  const handleGoalPress = (goalId: string) => {
    console.log(`Goal pressed: ${goalId}`);
    // Navigate to goal details
  };

  return (
    <GradientBackground>
      <StatusBar style="light" />
      <SafeAreaView style={tw`flex-1`} edges={['top', 'left', 'right']}>
        <View style={tw`flex-1 px-5`}>
          {/* Header */}
          <View style={tw`flex-row justify-between items-center mt-2 mb-6`}>
            <View>
              <Text style={tw`text-gray-300 text-base mb-1`}>
                Welcome back,
              </Text>
              <Text style={tw`text-white text-2xl font-semibold`}>
                {firstName}
              </Text>
            </View>
            
            <IconButton
              icon={<Bell size={22} color={colors.white} />}
              variant="ghost"
            />
          </View>
          
          {/* Progress Overview */}
          <Animated.View 
            entering={FadeInDown.duration(800).delay(200)}
            style={[tw`mb-6 rounded-2xl overflow-hidden`, styles.cardShadow]}
          >
            <LinearGradient
              colors={[colors.primary[600], colors.primary[500]]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={tw`p-4`}
            >
              <View style={tw`flex-row justify-between items-center mb-3`}>
                <Text style={tw`text-white font-semibold text-lg`}>
                  Progress Overview
                </Text>
                <Text style={tw`text-white/80 text-sm`}>
                  This Week
                </Text>
              </View>
              
              <View style={tw`flex-row justify-between mb-2`}>
                <View style={tw`items-center`}>
                  <Text style={tw`text-white text-2xl font-bold`}>3</Text>
                  <Text style={tw`text-white/80 text-xs`}>Active Goals</Text>
                </View>
                
                <View style={tw`h-14 border-r border-white/20`} />
                
                <View style={tw`items-center`}>
                  <Text style={tw`text-white text-2xl font-bold`}>2</Text>
                  <Text style={tw`text-white/80 text-xs`}>Upcoming Calls</Text>
                </View>
                
                <View style={tw`h-14 border-r border-white/20`} />
                
                <View style={tw`items-center`}>
                  <Text style={tw`text-white text-2xl font-bold`}>45%</Text>
                  <Text style={tw`text-white/80 text-xs`}>Avg Progress</Text>
                </View>
              </View>
            </LinearGradient>
          </Animated.View>
          
          {/* Goals Section */}
          <View style={tw`flex-row justify-between items-center mb-4`}>
            <Text style={tw`text-white text-xl font-semibold`}>
              My Goals
            </Text>
            
            <IconButton
              icon={<Plus size={20} color={colors.white} />}
              variant="primary"
              size="sm"
            />
          </View>
          
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tw`pb-8`}
          >
            {mockGoals.map((goal, index) => (
              <Animated.View
                key={goal.id}
                entering={FadeInDown.duration(500).delay(300 + index * 100)}
              >
                <GoalCard 
                  goal={goal} 
                  onPress={() => handleGoalPress(goal.id)} 
                />
              </Animated.View>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </GradientBackground>
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