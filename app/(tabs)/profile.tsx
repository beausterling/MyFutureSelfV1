import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import tw from '@/lib/tw';
import { GradientBackground } from '@/components/GradientBackground';
import { useUser, useAuth } from '@clerk/clerk-expo';
import { Button } from '@/components/Button';
import { colors } from '@/lib/theme';
import { Settings, Bell, Shield, CircleHelp as HelpCircle, LogOut, ChevronRight, Phone } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

export default function ProfileScreen() {
  const { user } = useUser();
  const { signOut } = useAuth();
  
  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <GradientBackground>
      <StatusBar style="light" />
      <SafeAreaView style={tw`flex-1`} edges={['top', 'left', 'right']}>
        <View style={tw`flex-1 px-5`}>
          {/* Header */}
          <View style={tw`flex-row justify-between items-center mt-2 mb-6`}>
            <Text style={tw`text-white text-2xl font-semibold`}>
              Profile
            </Text>
            
            <Button
              leftIcon={<Settings size={18} color={colors.white} />}
              variant="ghost"
              size="sm"
            >
              Settings
            </Button>
          </View>
          
          <ScrollView 
            showsVerticalScrollIndicator={false} 
            contentContainerStyle={tw`pb-8`}
          >
            {/* Profile Card */}
            <Animated.View 
              entering={FadeInDown.duration(800).delay(200)}
              style={[tw`mb-6 rounded-2xl overflow-hidden`, styles.cardShadow]}
            >
              <LinearGradient
                colors={[colors.secondary[900], colors.secondary[800]]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={tw`p-5 border border-gray-800`}
              >
                <View style={tw`flex-row items-center`}>
                  {user?.imageUrl ? (
                    <Image
                      source={{ uri: user.imageUrl }}
                      style={tw`h-20 w-20 rounded-xl mr-4`}
                    />
                  ) : (
                    <View style={tw`h-20 w-20 rounded-xl bg-primary-500/30 items-center justify-center mr-4`}>
                      <Text style={tw`text-primary-400 text-2xl font-bold`}>
                        {user?.firstName?.[0] || 'U'}
                      </Text>
                    </View>
                  )}
                  
                  <View style={tw`flex-1`}>
                    <Text style={tw`text-white text-xl font-semibold mb-1`}>
                      {user?.firstName} {user?.lastName}
                    </Text>
                    <Text style={tw`text-gray-400 mb-2`}>
                      {user?.emailAddresses[0]?.emailAddress || 'No email'}
                    </Text>
                    
                    <View style={tw`flex-row`}>
                      <View style={tw`bg-primary-500/10 px-3 py-1 rounded-full mr-2`}>
                        <Text style={tw`text-primary-400 text-xs font-medium`}>
                          5 Goals
                        </Text>
                      </View>
                      <View style={tw`bg-primary-500/10 px-3 py-1 rounded-full`}>
                        <Text style={tw`text-primary-400 text-xs font-medium`}>
                          12 Calls
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </LinearGradient>
            </Animated.View>
            
            {/* Stats Card */}
            <Animated.View 
              entering={FadeInDown.duration(800).delay(300)}
              style={[tw`mb-6 rounded-2xl overflow-hidden`, styles.cardShadow]}
            >
              <LinearGradient
                colors={[colors.secondary[900], colors.secondary[800]]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={tw`p-4 border border-gray-800`}
              >
                <Text style={tw`text-white text-lg font-semibold mb-4`}>
                  Your Stats
                </Text>
                
                <View style={tw`flex-row justify-between mb-2`}>
                  <View style={tw`items-center`}>
                    <Text style={tw`text-white text-2xl font-bold`}>78%</Text>
                    <Text style={tw`text-gray-400 text-xs`}>Success Rate</Text>
                  </View>
                  
                  <View style={tw`h-14 border-r border-gray-700`} />
                  
                  <View style={tw`items-center`}>
                    <Text style={tw`text-white text-2xl font-bold`}>12</Text>
                    <Text style={tw`text-gray-400 text-xs`}>Total Calls</Text>
                  </View>
                  
                  <View style={tw`h-14 border-r border-gray-700`} />
                  
                  <View style={tw`items-center`}>
                    <Text style={tw`text-white text-2xl font-bold`}>3</Text>
                    <Text style={tw`text-gray-400 text-xs`}>Completed Goals</Text>
                  </View>
                </View>
                
                <View style={tw`mt-4 mb-2`}>
                  <Text style={tw`text-gray-300 text-sm font-medium mb-1`}>
                    Current Streak
                  </Text>
                  <View style={tw`h-2 bg-gray-800 rounded-full overflow-hidden`}>
                    <View style={tw`h-full bg-primary-500 w-3/4 rounded-full`} />
                  </View>
                  <View style={tw`flex-row justify-between mt-1`}>
                    <Text style={tw`text-gray-400 text-xs`}>0</Text>
                    <Text style={tw`text-primary-400 text-xs font-medium`}>
                      14 days
                    </Text>
                    <Text style={tw`text-gray-400 text-xs`}>30</Text>
                  </View>
                </View>
              </LinearGradient>
            </Animated.View>
            
            {/* Phone Number */}
            <Animated.View 
              entering={FadeInDown.duration(800).delay(400)}
              style={tw`mb-6`}
            >
              <Text style={tw`text-white text-lg font-semibold mb-4`}>
                Your Future Self Number
              </Text>
              
              <View style={[tw`bg-secondary-900 rounded-xl p-4 border border-gray-800`, styles.cardShadow]}>
                <View style={tw`flex-row items-center justify-between`}>
                  <View style={tw`flex-row items-center`}>
                    <Phone size={20} color={colors.primary[400]} style={tw`mr-3`} />
                    <Text style={tw`text-white text-base`}>(555) 123-4567</Text>
                  </View>
                  
                  <Button variant="outline" size="sm">
                    Change
                  </Button>
                </View>
              </View>
            </Animated.View>
            
            {/* Menu Items */}
            <Animated.View entering={FadeInDown.duration(800).delay(500)}>
              <Text style={tw`text-white text-lg font-semibold mb-4`}>
                Settings
              </Text>
              
              <View style={[tw`bg-secondary-900 rounded-xl overflow-hidden border border-gray-800`, styles.cardShadow]}>
                <MenuItem
                  icon={<Bell size={20} color={colors.gray[400]} />}
                  title="Notifications"
                  onPress={() => {}}
                />
                <MenuItem
                  icon={<Shield size={20} color={colors.gray[400]} />}
                  title="Privacy & Security"
                  onPress={() => {}}
                />
                <MenuItem
                  icon={<HelpCircle size={20} color={colors.gray[400]} />}
                  title="Help & Support"
                  onPress={() => {}}
                  isLast
                />
              </View>
              
              <View style={tw`mt-8`}>
                <Button
                  leftIcon={<LogOut size={18} color={colors.error[500]} />}
                  variant="ghost"
                  fullWidth
                  onPress={handleSignOut}
                >
                  <Text style={tw`text-error-500`}>Sign Out</Text>
                </Button>
              </View>
            </Animated.View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </GradientBackground>
  );
}

function MenuItem({ 
  icon, 
  title, 
  onPress,
  isLast = false,
}: { 
  icon: React.ReactNode;
  title: string;
  onPress: () => void;
  isLast?: boolean;
}) {
  return (
    <Pressable 
      onPress={onPress}
      style={({ pressed }) => [
        tw`flex-row items-center justify-between p-4`,
        !isLast && tw`border-b border-gray-800`,
        pressed && tw`bg-gray-800/30`,
      ]}
    >
      <View style={tw`flex-row items-center`}>
        <View style={tw`mr-3`}>{icon}</View>
        <Text style={tw`text-white`}>{title}</Text>
      </View>
      <ChevronRight size={20} color={colors.gray[400]} />
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
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 8,
  },
});