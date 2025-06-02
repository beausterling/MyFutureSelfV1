import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from '@/lib/tw';
import { GradientBackground } from '@/components/GradientBackground';
import { colors } from '@/lib/theme';
import { Button } from '@/components/Button';
import { Calendar, Phone, PhoneOutgoing, Play } from 'lucide-react-native';
import { format } from 'date-fns';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

// Mock call data
type CallData = {
  id: string;
  goal: string;
  goalCategory: string;
  date: Date;
  duration: number; // in minutes
  imageUrl: string;
  hasRecording: boolean;
  hasTranscript: boolean;
  status: 'completed' | 'scheduled' | 'missed';
};

const mockCalls: CallData[] = [
  {
    id: '1',
    goal: 'Run 5 miles every week',
    goalCategory: 'Fitness',
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    duration: 5,
    imageUrl: 'https://images.pexels.com/photos/2729899/pexels-photo-2729899.jpeg?auto=compress&cs=tinysrgb&w=600',
    hasRecording: false,
    hasTranscript: false,
    status: 'scheduled',
  },
  {
    id: '2',
    goal: 'Meditate daily for 10 minutes',
    goalCategory: 'Wellness',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    duration: 8,
    imageUrl: 'https://images.pexels.com/photos/3822583/pexels-photo-3822583.jpeg?auto=compress&cs=tinysrgb&w=600',
    hasRecording: true,
    hasTranscript: true,
    status: 'completed',
  },
  {
    id: '3',
    goal: 'Learn Spanish - 30 minutes daily',
    goalCategory: 'Learning',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    duration: 6,
    imageUrl: 'https://images.pexels.com/photos/5082152/pexels-photo-5082152.jpeg?auto=compress&cs=tinysrgb&w=600',
    hasRecording: true,
    hasTranscript: true,
    status: 'completed',
  },
  {
    id: '4',
    goal: 'Save $500 per month',
    goalCategory: 'Finance',
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    duration: 7,
    imageUrl: 'https://images.pexels.com/photos/3943723/pexels-photo-3943723.jpeg?auto=compress&cs=tinysrgb&w=600',
    hasRecording: false,
    hasTranscript: false,
    status: 'scheduled',
  },
];

// Group calls by status
const scheduledCalls = mockCalls.filter(call => call.status === 'scheduled');
const completedCalls = mockCalls.filter(call => call.status === 'completed');

export default function CallsScreen() {
  const handleCallPress = (callId: string) => {
    console.log(`Call pressed: ${callId}`);
    // Navigate to call details
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
                My Calls
              </Text>
              <Text style={tw`text-gray-300 text-sm`}>
                Upcoming and past conversations
              </Text>
            </View>
            
            <Button
              leftIcon={<PhoneOutgoing size={16} color={colors.white} />}
              variant="primary"
              size="sm"
            >
              Schedule
            </Button>
          </View>
          
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-8`}>
            {/* Upcoming Calls Section */}
            <View style={tw`mb-6`}>
              <Text style={tw`text-white text-lg font-medium mb-4`}>
                Upcoming Calls
              </Text>
              
              {scheduledCalls.length > 0 ? (
                scheduledCalls.map((call, index) => (
                  <Animated.View
                    key={call.id}
                    entering={FadeInDown.duration(500).delay(200 + index * 100)}
                  >
                    <UpcomingCallCard call={call} onPress={() => handleCallPress(call.id)} />
                  </Animated.View>
                ))
              ) : (
                <Text style={tw`text-gray-400 text-center py-4`}>
                  No upcoming calls scheduled
                </Text>
              )}
            </View>
            
            {/* Past Calls Section */}
            <View>
              <Text style={tw`text-white text-lg font-medium mb-4`}>
                Call History
              </Text>
              
              {completedCalls.length > 0 ? (
                completedCalls.map((call, index) => (
                  <Animated.View
                    key={call.id}
                    entering={FadeInDown.duration(500).delay(400 + index * 100)}
                  >
                    <PastCallCard call={call} onPress={() => handleCallPress(call.id)} />
                  </Animated.View>
                ))
              ) : (
                <Text style={tw`text-gray-400 text-center py-4`}>
                  No past calls found
                </Text>
              )}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
}

function UpcomingCallCard({ call, onPress }: { call: CallData; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={tw`mb-4`}>
      <View style={[tw`bg-secondary-900 rounded-xl p-4 border border-gray-800`, styles.cardShadow]}>
        <View style={tw`flex-row justify-between items-center`}>
          <View style={tw`flex-row items-center`}>
            <View style={tw`h-12 w-12 rounded-full bg-primary-500/20 items-center justify-center mr-3`}>
              <Phone size={20} color={colors.primary[400]} />
            </View>
            
            <View style={tw`flex-1`}>
              <Text style={tw`text-white font-medium mb-1`}>{call.goal}</Text>
              <View style={tw`flex-row items-center`}>
                <Calendar size={14} color={colors.gray[400]} style={tw`mr-1`} />
                <Text style={tw`text-gray-400 text-xs`}>
                  {format(call.date, 'EEE, MMM d • h:mm a')}
                </Text>
              </View>
            </View>
          </View>
          
          <View style={tw`bg-primary-500/10 px-3 py-1 rounded-full`}>
            <Text style={tw`text-primary-400 text-xs font-medium`}>
              {call.goalCategory}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

function PastCallCard({ call, onPress }: { call: CallData; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={tw`mb-4`}>
      <LinearGradient
        colors={[colors.secondary[900], colors.secondary[800]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[tw`rounded-xl p-4 border border-gray-800`, styles.cardShadow]}
      >
        <View style={tw`flex-row mb-3`}>
          <Image 
            source={{ uri: call.imageUrl }}
            style={tw`h-16 w-16 rounded-xl mr-3`}
            resizeMode="cover"
          />
          
          <View style={tw`flex-1 justify-center`}>
            <Text style={tw`text-white font-medium mb-1`}>{call.goal}</Text>
            <Text style={tw`text-gray-400 text-xs mb-1`}>
              {format(call.date, 'EEE, MMM d • h:mm a')}
            </Text>
            <View style={tw`flex-row`}>
              <View style={tw`bg-primary-500/10 px-2 py-0.5 rounded-full mr-2`}>
                <Text style={tw`text-primary-400 text-xs`}>
                  {call.duration} min
                </Text>
              </View>
              <View style={tw`bg-gray-800 px-2 py-0.5 rounded-full`}>
                <Text style={tw`text-gray-300 text-xs`}>
                  {call.goalCategory}
                </Text>
              </View>
            </View>
          </View>
          
          {call.hasRecording && (
            <View style={tw`justify-center`}>
              <View style={tw`bg-primary-500/20 h-10 w-10 rounded-full items-center justify-center`}>
                <Play size={18} color={colors.primary[400]} />
              </View>
            </View>
          )}
        </View>
        
        {call.hasTranscript && (
          <View style={tw`bg-secondary-950 p-3 rounded-lg`}>
            <Text style={tw`text-gray-300 text-xs mb-1 font-medium`}>
              Conversation Highlight
            </Text>
            <Text style={tw`text-gray-400 text-xs leading-5`} numberOfLines={2}>
              "I noticed you've been making great progress on your goal. What specific strategies have been working well for you? Let's make sure you maintain this momentum..."
            </Text>
          </View>
        )}
      </LinearGradient>
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