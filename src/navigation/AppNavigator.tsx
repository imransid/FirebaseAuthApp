import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignInScreen from '../screens/SignInScreen';
import HomeScreen from '../screens/HomeScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import VideoPlayerScreen from '../screens/VideoPlayerScreen';
import ExploreTab from '@/Components/ExploreTab';
import SpeakingScreen from '@/screens/SpeakingScreen';
import ListeningScreen from '@/screens/ListeningScreen';
import WritingScreen from '@/screens/WritingScreen';
import ReadingScreen from '@/screens/ReadingScreen';
import SignUpScreen from '@/screens/SignUpScreen'
import MainScreen from '@/screens/MainScreen';
import {colors} from '@/theme/colors';
import {TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import styles from './style';
import SettingsScreen from '@/screens/SettingsScreen';

export type RootStackParamList = {
  Onboarding: undefined;
  Welcome: undefined;
  HomeScreen: {videoURL?: ''} | undefined;
  MainScreen: {chipName?: ''} | undefined;
};

const Stack = createStackNavigator();

const AppNavigator = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{headerShown: false}} // Hides the header for SignIn
      />

      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerShown: false }} // Hides the header for SignIn
      />
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{headerShown: false}} // Hides the header for SignIn
      />
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{headerShown: false}} // Hides the header for Onboarding
      />
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{headerShown: false}} // Hides the header for Welcome
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}} // Hides the header for Home
      />

      <Stack.Screen
        name="ExploreTab"
        component={ExploreTab}
        options={{headerShown: false}} // Hides the header for Home
      />
      <Stack.Screen
        name="VideoPlayer"
        component={VideoPlayerScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ListeningScreen"
        component={ListeningScreen}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.listeningChipColor, // Header background color
          },
          title: '',
          headerTintColor: '#fff', // Back arrow color
          headerLeft: () => (
            <TouchableOpacity
              style={styles.backArrowBackground}
              onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={styles.headerRightPosition}>
              <TouchableOpacity style={styles.backArrowBackground}>
                <Ionicons name="share-social" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="WritingScreen"
        component={WritingScreen}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.writingChipColor, // Header background color
          },
          title: '',
          headerTintColor: '#fff', // Back arrow color
          headerLeft: () => (
            <TouchableOpacity
              style={styles.backArrowBackground}
              onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={styles.headerRightPosition}>
              <TouchableOpacity style={styles.backArrowBackground}>
                <Ionicons name="share-social" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="ReadingScreen"
        component={ReadingScreen}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.readingChipColor, // Header background color
          },
          title: '',
          headerTintColor: '#fff', // Back arrow color
          headerLeft: () => (
            <TouchableOpacity
              style={styles.backArrowBackground}
              onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={styles.headerRightPosition}>
              <TouchableOpacity style={styles.backArrowBackground}>
                <Ionicons name="share-social" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="SpeakingScreen"
        component={SpeakingScreen}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.speakingChipColor, // Header background color
          },
          title: '',
          headerTintColor: '#fff', // Back arrow color
          headerLeft: () => (
            <TouchableOpacity
              style={styles.backArrowBackground}
              onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={styles.headerRightPosition}>
              <TouchableOpacity style={styles.backArrowBackground}>
                <Ionicons name="share-social" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: true,
          title: 'Settings',
          headerTintColor: '#000',
        }} // Hides the header for Onboarding
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
