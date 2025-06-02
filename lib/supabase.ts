import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl as string;
const supabaseAnonKey = Constants.expoConfig?.extra?.supabaseAnonKey as string;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase credentials. Please check your environment variables.');
}

export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);

// Database types
export type Goal = {
  id: string;
  user_id: string;
  title: string;
  description: string;
  category: string;
  target_date: string;
  created_at: string;
  status: 'active' | 'completed' | 'failed';
  frequency: 'daily' | 'weekly' | 'monthly';
  reminder_time: string;
  progress: number;
};

export type Call = {
  id: string;
  goal_id: string;
  user_id: string;
  scheduled_at: string;
  completed_at: string | null;
  duration: number | null;
  recording_url: string | null;
  transcript_id: string | null;
  status: 'scheduled' | 'completed' | 'missed';
};

export type Transcript = {
  id: string;
  call_id: string;
  text: string;
  speakers: {
    speaker: 'user' | 'ai';
    text: string;
    timestamp: number;
  }[];
  summary: string;
  insights: string[];
};