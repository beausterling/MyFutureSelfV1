import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Pressable, Platform } from 'react-native';
import { Link, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowRight, MessageSquare, Target, Zap } from 'lucide-react-native';
import { colors } from '@/lib/theme';

export default function LandingScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Hero Section */}
      <LinearGradient
        colors={[colors.secondary[950], colors.secondary[900]]}
        style={styles.heroContainer}
      >
        <View style={styles.hero}>
          <View style={styles.heroContent}>
            <Image 
              source={{ uri: "https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg" }}
              style={styles.heroImage}
            />
            <Text style={styles.title}>Meet Your Future Self</Text>
            <Text style={styles.subtitle}>
              AI-powered accountability that helps you achieve your goals through simulated conversations with your future self
            </Text>
            <Pressable 
              style={styles.ctaButton}
              onPress={() => router.push('/signup')}
            >
              <LinearGradient
                colors={[colors.primary[500], colors.primary[600]]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.ctaGradient}
              >
                <Text style={styles.ctaText}>Get Started</Text>
                <ArrowRight size={20} color={colors.white} />
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      </LinearGradient>

      {/* Features Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Why It Works</Text>
        <View style={styles.features}>
          <FeatureCard
            icon={<MessageSquare size={32} color={colors.primary[400]} />}
            title="AI-Powered Conversations"
            description="Engage in meaningful dialogue with a simulation of your future self, powered by advanced AI technology"
          />
          <FeatureCard
            icon={<Target size={32} color={colors.primary[400]} />}
            title="Goal Tracking"
            description="Set, track, and achieve your goals with personalized guidance and accountability"
          />
          <FeatureCard
            icon={<Zap size={32} color={colors.primary[400]} />}
            title="Instant Motivation"
            description="Get immediate feedback and encouragement from your future self to stay on track"
          />
        </View>
      </View>

      {/* Testimonials Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Success Stories</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.testimonials}
        >
          <TestimonialCard
            image="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg"
            name="Sarah M."
            role="Entrepreneur"
            quote="This app completely changed how I approach my goals. The conversations with my future self keep me motivated and accountable."
          />
          <TestimonialCard
            image="https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg"
            name="David R."
            role="Fitness Enthusiast"
            quote="I've achieved more in 3 months using this app than I did in the past year. The accountability is game-changing."
          />
          <TestimonialCard
            image="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"
            name="Emily L."
            role="Student"
            quote="Having conversations with my future self helps me stay focused on my long-term goals. It's like having a mentor who truly understands me."
          />
        </ScrollView>
      </View>

      {/* Download Section */}
      <View style={styles.downloadSection}>
        <Text style={styles.downloadTitle}>Download the App</Text>
        <Text style={styles.downloadSubtitle}>Start your journey to becoming your best self today</Text>
        <View style={styles.storeButtons}>
          <Pressable style={styles.storeButton}>
            <Image 
              source={{ uri: "https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg" }}
              style={styles.storeImage}
            />
          </Pressable>
          <Pressable style={styles.storeButton}>
            <Image 
              source={{ uri: "https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" }}
              style={styles.storeImage}
            />
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <View style={styles.featureCard}>
      <View style={styles.featureIcon}>{icon}</View>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
    </View>
  );
}

function TestimonialCard({ image, name, role, quote }) {
  return (
    <View style={styles.testimonialCard}>
      <Image source={{ uri: image }} style={styles.testimonialImage} />
      <Text style={styles.testimonialQuote}>{quote}</Text>
      <Text style={styles.testimonialName}>{name}</Text>
      <Text style={styles.testimonialRole}>{role}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.secondary[950],
  },
  content: {
    paddingBottom: 40,
  },
  heroContainer: {
    minHeight: Platform.OS === 'web' ? '100vh' : 600,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'web' ? 0 : 60,
  },
  hero: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 1200,
    marginHorizontal: 'auto',
  },
  heroContent: {
    alignItems: 'center',
    maxWidth: 800,
    padding: 20,
  },
  heroImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 40,
  },
  title: {
    fontSize: Platform.OS === 'web' ? 64 : 48,
    fontFamily: 'Inter-Bold',
    color: colors.white,
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: Platform.OS === 'web' ? 24 : 18,
    fontFamily: 'Inter-Regular',
    color: colors.gray[300],
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: Platform.OS === 'web' ? 36 : 27,
  },
  ctaButton: {
    overflow: 'hidden',
    borderRadius: 16,
    marginTop: 20,
  },
  ctaGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    gap: 12,
  },
  ctaText: {
    color: colors.white,
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
  },
  section: {
    padding: 40,
    maxWidth: 1200,
    marginHorizontal: 'auto',
    width: '100%',
  },
  sectionTitle: {
    fontSize: 36,
    fontFamily: 'Inter-Bold',
    color: colors.white,
    textAlign: 'center',
    marginBottom: 40,
  },
  features: {
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    gap: 24,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  featureCard: {
    backgroundColor: colors.secondary[900],
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    flex: Platform.OS === 'web' ? 1 : undefined,
    minWidth: Platform.OS === 'web' ? 300 : undefined,
    maxWidth: Platform.OS === 'web' ? 400 : undefined,
    borderWidth: 1,
    borderColor: colors.gray[800],
  },
  featureIcon: {
    backgroundColor: colors.primary[500] + '20',
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  featureTitle: {
    fontSize: 24,
    fontFamily: 'Inter-SemiBold',
    color: colors.white,
    textAlign: 'center',
    marginBottom: 12,
  },
  featureDescription: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: colors.gray[300],
    textAlign: 'center',
    lineHeight: 24,
  },
  testimonials: {
    paddingHorizontal: 20,
    gap: 24,
    flexDirection: 'row',
  },
  testimonialCard: {
    backgroundColor: colors.secondary[900],
    borderRadius: 24,
    padding: 32,
    width: Platform.OS === 'web' ? 400 : 300,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray[800],
  },
  testimonialImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 24,
  },
  testimonialQuote: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: colors.gray[300],
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  testimonialName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: colors.white,
    textAlign: 'center',
  },
  testimonialRole: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: colors.gray[400],
    textAlign: 'center',
    marginTop: 4,
  },
  downloadSection: {
    padding: 40,
    alignItems: 'center',
    backgroundColor: colors.secondary[900],
  },
  downloadTitle: {
    fontSize: 36,
    fontFamily: 'Inter-Bold',
    color: colors.white,
    textAlign: 'center',
    marginBottom: 16,
  },
  downloadSubtitle: {
    fontSize: 18,
    fontFamily: 'Inter-Regular',
    color: colors.gray[300],
    textAlign: 'center',
    marginBottom: 40,
  },
  storeButtons: {
    flexDirection: 'row',
    gap: 20,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  storeButton: {
    height: 60,
  },
  storeImage: {
    height: 60,
    width: 200,
    resizeMode: 'contain',
  },
});