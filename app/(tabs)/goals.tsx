import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from '@/lib/tw';
import { GradientBackground } from '@/components/GradientBackground';
import { GoalCard } from '@/components/GoalCard';
import { colors } from '@/lib/theme';
import { type Goal } from '@/lib/supabase';
import { Button } from '@/components/Button';
import { Plus, Filter } from 'lucide-react-native';
import { IconButton } from '@/components/IconButton';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

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
  {
    id: '4',
    user_id: 'user123',
    title: 'Learn Spanish - 30 minutes daily',
    description: 'Achieve conversational fluency in Spanish by practicing daily',
    category: 'Learning',
    target_date: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date().toISOString(),
    status: 'active',
    frequency: 'daily',
    reminder_time: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    progress: 20,
  },
  {
    id: '5',
    user_id: 'user123',
    title: 'Save $500 per month',
    description: 'Build an emergency fund by saving consistently',
    category: 'Finance',
    target_date: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(),
    created_at: new Date().toISOString(),
    status: 'active',
    frequency: 'monthly',
    reminder_time: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    progress: 60,
  },
];

type CategoryTab = 'All' | 'Fitness' | 'Learning' | 'Wellness' | 'Finance' | 'Other';

export default function GoalsScreen() {
  const [activeTab, setActiveTab] = useState<CategoryTab>('All');
  
  const filteredGoals = activeTab === 'All' 
    ? mockGoals 
    : mockGoals.filter(goal => goal.category === activeTab);
  
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
              <Text style={tw`text-white text-2xl font-semibold`}>
                My Goals
              </Text>
              <Text style={tw`text-gray-300 text-sm`}>
                Track and manage your goals
              </Text>
            </View>
            
            <View style={tw`flex-row gap-2`}>
              <IconButton
                icon={<Filter size={18} color={colors.white} />}
                variant="ghost"
              />
              
              <Button
                leftIcon={<Plus size={18} color={colors.white} />}
                variant="primary"
                size="sm"
              >
                New Goal
              </Button>
            </View>
          </View>
          
          {/* Category Tabs */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={tw`pb-3`}
          >
            {(['All', 'Fitness', 'Learning', 'Wellness', 'Finance', 'Other'] as CategoryTab[]).map((category) => (
              <Pressable
                key={category}
                onPress={() => setActiveTab(category)}
                style={tw`mr-2`}
              >
                <LinearGradient
                  colors={
                    activeTab === category
                      ? [colors.primary[500], colors.primary[600]]
                      : [colors.gray[800], colors.gray[700]]
                  }
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={tw`px-4 py-2 rounded-full`}
                >
                  <Text
                    style={tw`${
                      activeTab === category ? 'text-white' : 'text-gray-300'
                    } font-medium`}
                  >
                    {category}
                  </Text>
                </LinearGradient>
              </Pressable>
            ))}
          </ScrollView>
          
          {/* Goals List */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tw`pt-4 pb-8`}
          >
            {filteredGoals.length > 0 ? (
              filteredGoals.map((goal, index) => (
                <Animated.View
                  key={goal.id}
                  entering={FadeInDown.duration(500).delay(200 + index * 100)}
                >
                  <GoalCard 
                    goal={goal} 
                    onPress={() => handleGoalPress(goal.id)} 
                  />
                </Animated.View>
              ))
            ) : (
              <Animated.View 
                entering={FadeIn.duration(800)}
                style={tw`items-center justify-center py-12`}
              >
                <View style={tw`bg-gray-800/50 p-8 rounded-3xl items-center mb-4`}>
                  <Target size={60} color={colors.gray[400]} />
                </View>
                <Text style={tw`text-gray-300 text-lg text-center mb-2`}>
                  No goals found in this category
                </Text>
                <Text style={tw`text-gray-500 text-center mb-6`}>
                  Create a new goal to get started
                </Text>
                <Button
                  leftIcon={<Plus size={16} color={colors.white} />}
                  variant="primary"
                >
                  Create Goal
                </Button>
              </Animated.View>
            )}
          </ScrollView>
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
}

function Target({ size, color }: { size: number; color: string }) {
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ 
        width: size, 
        height: size, 
        borderRadius: size / 2, 
        borderWidth: size / 12,
        borderColor: color,
        opacity: 0.3
      }} />
      <View style={{ 
        position: 'absolute',
        width: size * 0.65, 
        height: size * 0.65, 
        borderRadius: size, 
        borderWidth: size / 12,
        borderColor: color,
        opacity: 0.6
      }} />
      <View style={{ 
        position: 'absolute',
        width: size * 0.3, 
        height: size * 0.3, 
        borderRadius: size, 
        backgroundColor: color,
        opacity: 0.9
      }} />
    </View>
  );
}