import React, { useState, useRef, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, SafeAreaView, TextInput, FlatList, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function App() {
  const [activeScreen, setActiveScreen] = useState('Home');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI workout assistant. I can help you with workout plans, exercise tips, nutrition advice, and answer any fitness-related questions. How can I help you today?",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const motivationalQuotes = [
    "Your only limit is your mind!",
    "Push yourself because no one else will!",
    "Great things never come from comfort zones!",
    "Don't stop when you're tired, stop when you're done!",
  ];

  const todayQuote = motivationalQuotes[new Date().getDay() % motivationalQuotes.length];
  const userName = "Alex";

  const generateAIResponse = (userMessage: string): string => {
    const responses = [
      "That's a great question! Based on my knowledge, I'd recommend focusing on compound movements that work multiple muscle groups for maximum efficiency.",
      "I understand what you're looking for. For best results, consistency is key - aim for 3-4 workouts per week with proper rest between sessions.",
      "That's an excellent goal! Let me suggest a progressive approach that will help you build strength safely while avoiding injury.",
      "Great question! Nutrition plays a crucial role in fitness. I recommend focusing on whole foods and adequate protein intake to support your workouts.",
      "I love your enthusiasm! Remember that proper form is more important than lifting heavy weights. Quality over quantity always wins.",
      "That's a common concern among fitness enthusiasts. The key is listening to your body and gradually increasing intensity over time.",
      "Excellent point! Recovery is just as important as the workout itself. Make sure you're getting enough sleep and managing stress levels.",
      "I'm here to help you succeed! Based on your question, I'd suggest starting with bodyweight exercises to build a solid foundation.",
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = () => {
    if (!currentInput.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: currentInput.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentInput('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(currentInput),
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  useEffect(() => {
    if (flatListRef.current && activeScreen === 'Chat') {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages, activeScreen]);

  const renderChatMessage = ({ item }: { item: Message }) => (
    <View style={[
      styles.messageContainer,
      item.sender === 'user' ? styles.userMessageContainer : styles.aiMessageContainer
    ]}>
      {item.sender === 'ai' && (
        <View style={styles.avatarContainer}>
          <LinearGradient
            colors={['#a855f7', '#ec4899']}
            style={styles.avatar}
          >
            <Ionicons name="sparkles" size={12} color="white" />
          </LinearGradient>
        </View>
      )}
      
      <View style={[
        styles.messageBubble,
        item.sender === 'user' ? styles.userMessage : styles.aiMessage
      ]}>
        <Text style={[
          styles.messageText,
          item.sender === 'user' ? styles.userMessageText : styles.aiMessageText
        ]}>
          {item.content}
        </Text>
        <Text style={[
          styles.messageTime,
          item.sender === 'user' ? styles.userMessageTime : styles.aiMessageTime
        ]}>
          {formatTime(item.timestamp)}
        </Text>
      </View>

      {item.sender === 'user' && (
        <View style={styles.avatarContainer}>
          <LinearGradient
            colors={['#3b82f6', '#6366f1']}
            style={styles.avatar}
          >
            <Ionicons name="person" size={12} color="white" />
          </LinearGradient>
        </View>
      )}
    </View>
  );

  const renderTypingIndicator = () => (
    <View style={[styles.messageContainer, styles.aiMessageContainer]}>
      <View style={styles.avatarContainer}>
        <LinearGradient
          colors={['#a855f7', '#ec4899']}
          style={styles.avatar}
        >
          <Ionicons name="sparkles" size={12} color="white" />
        </LinearGradient>
      </View>
             <View style={[styles.messageBubble, styles.aiMessage]}>
         <View style={styles.typingContainer}>
           <View style={styles.typingDot} />
           <View style={styles.typingDot} />
           <View style={styles.typingDot} />
           <Text style={[styles.messageText, styles.aiMessageText]}>AI is typing...</Text>
         </View>
       </View>
    </View>
  );

  const renderChatScreen = () => (
    <KeyboardAvoidingView 
      style={styles.chatContainer} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 25}
    >
      {/* Chat Header */}
      <View style={styles.chatHeader}>
        <Text style={styles.chatTitle}>AI Workout Assistant</Text>
        <View style={styles.chatStatus}>
          <View style={styles.onlineIndicator} />
          <Text style={styles.chatStatusText}>Online and ready to help</Text>
        </View>
      </View>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderChatMessage}
        keyExtractor={(item) => item.id}
        style={styles.messagesList}
        contentContainerStyle={styles.messagesContent}
        ListFooterComponent={isTyping ? renderTypingIndicator : null}
        showsVerticalScrollIndicator={false}
      />

      {/* Input Area */}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            value={currentInput}
            onChangeText={setCurrentInput}
            placeholder="Ask me about workouts, nutrition, or fitness..."
            style={styles.textInput}
            multiline
            editable={!isTyping}
            placeholderTextColor="#9ca3af"
          />
          <TouchableOpacity
            onPress={handleSendMessage}
            disabled={!currentInput.trim() || isTyping}
            style={[
              styles.sendButton,
              (!currentInput.trim() || isTyping) && styles.sendButtonDisabled
            ]}
          >
            <LinearGradient
              colors={(!currentInput.trim() || isTyping) ? ['#9ca3af', '#9ca3af'] : ['#a855f7', '#ec4899']}
              style={styles.sendButtonGradient}
            >
              <Ionicons name="send" size={20} color="white" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );

  const renderHomeScreen = () => (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#fdf2f8', '#fce7f3']} // purple-50 to pink-50
        style={styles.gradient}
      >
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.greeting}>Good morning, {userName}! 👋</Text>
            <Text style={styles.quote}>"{todayQuote}"</Text>
          </View>

          {/* Ask AI Button */}
          <TouchableOpacity style={styles.aiButtonContainer}>
            <LinearGradient
              colors={['#a855f7', '#ec4899']} // purple-500 to pink-500
              style={styles.aiButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Ionicons name="sparkles" size={20} color="white" style={styles.aiIcon} />
              <Text style={styles.aiButtonText}>Ask AI for Workout Ideas</Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Dashboard Metrics */}
          <View style={styles.metricsContainer}>
            <View style={styles.metricsRow}>
              <View style={[styles.metricCard, { backgroundColor: '#dbeafe' }]}>
                <Text style={[styles.metricNumber, { color: '#1e40af' }]}>12</Text>
                <Text style={[styles.metricLabel, { color: '#3730a3' }]}>Workouts</Text>
                <Text style={[styles.metricSubtext, { color: '#1e40af' }]}>This Month</Text>
              </View>
              <View style={[styles.metricCard, { backgroundColor: '#dcfce7' }]}>
                <Text style={[styles.metricNumber, { color: '#166534' }]}>45</Text>
                <Text style={[styles.metricLabel, { color: '#15803d' }]}>Minutes</Text>
                <Text style={[styles.metricSubtext, { color: '#166534' }]}>Avg Session</Text>
              </View>
            </View>
            <View style={styles.metricsRow}>
              <View style={[styles.metricCard, { backgroundColor: '#fed7d7' }]}>
                <Text style={[styles.metricNumber, { color: '#b91c1c' }]}>1,240</Text>
                <Text style={[styles.metricLabel, { color: '#dc2626' }]}>Calories</Text>
                <Text style={[styles.metricSubtext, { color: '#b91c1c' }]}>Burned</Text>
              </View>
              <View style={[styles.metricCard, { backgroundColor: '#fef3c7' }]}>
                <Text style={[styles.metricNumber, { color: '#d97706' }]}>4</Text>
                <Text style={[styles.metricLabel, { color: '#f59e0b' }]}>Streak</Text>
                <Text style={[styles.metricSubtext, { color: '#d97706' }]}>Days</Text>
              </View>
            </View>
          </View>

          {/* Quick Actions */}
          <View style={styles.quickActionsContainer}>
            <View style={styles.quickActionsRow}>
              <LinearGradient
                colors={['#dbeafe', '#bfdbfe']} // blue-100 to blue-200
                style={styles.quickActionCard}
              >
                <Ionicons name="calendar" size={32} color="#2563eb" />
                <Text style={[styles.quickActionTitle, { color: '#1e40af' }]}>Today's Plan</Text>
                <Text style={[styles.quickActionSubtitle, { color: '#2563eb' }]}>Upper Body</Text>
              </LinearGradient>

              <LinearGradient
                colors={['#dcfce7', '#bbf7d0']} // green-100 to green-200
                style={styles.quickActionCard}
              >
                <Ionicons name="trending-up" size={32} color="#16a34a" />
                <Text style={[styles.quickActionTitle, { color: '#166534' }]}>This Week</Text>
                <Text style={[styles.quickActionSubtitle, { color: '#16a34a' }]}>4/5 workouts</Text>
              </LinearGradient>
            </View>
          </View>

          {/* Workout Recommendations */}
          <View style={styles.recommendationsContainer}>
            <Text style={styles.recommendationsTitle}>Recommended for You</Text>
            
            <View style={styles.workoutCard}>
              <LinearGradient
                colors={['#fef3c7', '#fed7aa']}
                style={styles.workoutCardGradient}
              >
                <Text style={styles.workoutTitle}>Morning Cardio Blast</Text>
                <Text style={styles.workoutDescription}>High-intensity cardio to kickstart your day</Text>
                <View style={styles.workoutMeta}>
                  <Text style={styles.workoutTime}>⏱️ 25 min</Text>
                  <Text style={styles.workoutDifficulty}>🔥 Intermediate</Text>
                </View>
              </LinearGradient>
            </View>

            <View style={styles.workoutCard}>
              <LinearGradient
                colors={['#ddd6fe', '#c7d2fe']}
                style={styles.workoutCardGradient}
              >
                <Text style={styles.workoutTitle}>Upper Body Strength</Text>
                <Text style={styles.workoutDescription}>Build muscle with targeted upper body exercises</Text>
                <View style={styles.workoutMeta}>
                  <Text style={styles.workoutTime}>⏱️ 35 min</Text>
                  <Text style={styles.workoutDifficulty}>🔥 Advanced</Text>
                </View>
              </LinearGradient>
            </View>
          </View>

          {/* Bottom padding for scroll */}
          <View style={styles.bottomPadding} />
        </ScrollView>

                  {/* Bottom Navigation */}
          <View style={styles.bottomNav}>
            <TouchableOpacity 
              style={[styles.navItem, activeScreen === 'Home' && styles.activeNavItem]}
              onPress={() => setActiveScreen('Home')}
            >
              <Ionicons name="home" size={24} color={activeScreen === 'Home' ? "#a855f7" : "#6b7280"} />
              <Text style={[styles.navText, activeScreen === 'Home' && styles.activeNavText]}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.navItem, activeScreen === 'Workouts' && styles.activeNavItem]}
              onPress={() => setActiveScreen('Workouts')}
            >
              <Ionicons name="barbell" size={24} color={activeScreen === 'Workouts' ? "#a855f7" : "#6b7280"} />
              <Text style={[styles.navText, activeScreen === 'Workouts' && styles.activeNavText]}>Workouts</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.navItem, activeScreen === 'Chat' && styles.activeNavItem]}
              onPress={() => setActiveScreen('Chat')}
            >
              <Ionicons name="chatbubble" size={24} color={activeScreen === 'Chat' ? "#a855f7" : "#6b7280"} />
              <Text style={[styles.navText, activeScreen === 'Chat' && styles.activeNavText]}>Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.navItem, activeScreen === 'Profile' && styles.activeNavItem]}
              onPress={() => setActiveScreen('Profile')}
            >
              <Ionicons name="person" size={24} color={activeScreen === 'Profile' ? "#a855f7" : "#6b7280"} />
              <Text style={[styles.navText, activeScreen === 'Profile' && styles.activeNavText]}>Profile</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
        <StatusBar style="dark" />
      </SafeAreaView>
    );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#fdf2f8', '#fce7f3']} // purple-50 to pink-50
        style={styles.gradient}
      >
        {activeScreen === 'Chat' ? renderChatScreen() : renderHomeScreen()}
      </LinearGradient>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 24,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  quote: {
    fontSize: 16,
    fontWeight: '600',
    color: '#9333ea',
    fontStyle: 'italic',
  },
  aiButtonContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  aiButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  aiIcon: {
    marginRight: 8,
  },
  aiButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  metricsContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  metricCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 6,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  metricNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  metricSubtext: {
    fontSize: 12,
  },
  quickActionsContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  quickActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 4,
  },
  quickActionSubtitle: {
    fontSize: 12,
  },
  recommendationsContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  recommendationsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  workoutCard: {
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  workoutCardGradient: {
    padding: 16,
    borderRadius: 12,
  },
  workoutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  workoutDescription: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 12,
  },
  workoutMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  workoutTime: {
    fontSize: 14,
    color: '#6b7280',
  },
  workoutDifficulty: {
    fontSize: 14,
    color: '#6b7280',
  },
  bottomPadding: {
    height: 100,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  activeNavItem: {
    // Additional styling for active item if needed
  },
  navText: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  activeNavText: {
    color: '#a855f7',
    fontWeight: '600',
  },
  // Chat screen styles
  chatContainer: {
    flex: 1,
  },
  chatHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  chatTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  chatStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10b981',
    marginRight: 6,
  },
  chatStatusText: {
    fontSize: 14,
    color: '#6b7280',
  },
  messagesList: {
    flex: 1,
    paddingHorizontal: 16,
  },
  messagesContent: {
    paddingVertical: 16,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-end',
  },
  userMessageContainer: {
    justifyContent: 'flex-end',
  },
  aiMessageContainer: {
    justifyContent: 'flex-start',
  },
  avatarContainer: {
    marginHorizontal: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageBubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  userMessage: {
    backgroundColor: '#a855f7',
    borderBottomRightRadius: 4,
  },
  aiMessage: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
  userMessageText: {
    color: 'white',
  },
  aiMessageText: {
    color: '#1f2937',
  },
  messageTime: {
    fontSize: 11,
  },
  userMessageTime: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  aiMessageTime: {
    color: '#9ca3af',
  },
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#9ca3af',
    marginRight: 4,
  },
  inputContainer: {
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  textInput: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#d1d5db',
    fontSize: 16,
    marginRight: 12,
  },
  sendButton: {
    width: 44,
    height: 44,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  sendButtonGradient: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 