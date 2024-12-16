import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignInScreen from '../screens/SignInScreen';
import HomeScreen from '../screens/HomeScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import ExploreTab from '@/Components/ExploreTab';
import VideoScreen from '@/screens/VideoScreen';

export type RootStackParamList = {
  HomeScreen: {videoURL?: ''} | undefined;
  VideoScreen: {videoURL: string};
};

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
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
        name="VideoScreen"
        component={VideoScreen}
        options={{headerShown: false}} // Hides the header for Home
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
