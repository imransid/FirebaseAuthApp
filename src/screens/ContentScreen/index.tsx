import React, {useRef} from 'react';
import {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '@/navigation/AppNavigator';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp, useRoute} from '@react-navigation/native';
import Video, {VideoRef} from 'react-native-video';
import {WebView} from 'react-native-webview';
import Lessons from '../Lessons';
import Exercises from '../Exercises';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

// type VideoScreenNavigationProp = NativeStackNavigationProp<
//   RootStackParamList,
//   'VideoScreen'
// >;

// type VideoScreenRouteProp = RouteProp<RootStackParamList, 'VideoScreen'>;

const Tab = createMaterialTopTabNavigator();

const ContentScreen: FC = () => {
  return <></>;
};

export default ContentScreen;
