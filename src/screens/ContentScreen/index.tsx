import React, {useEffect, useRef} from 'react';
import {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RootStackParamList} from '@/navigation/AppNavigator';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import Video, {VideoRef} from 'react-native-video';
import {WebView} from 'react-native-webview';
import Lessons from '../Lessons';
import Exercises from '../Exercises';
import styles from './style';
import {colors} from '@/theme/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

type ContentScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ContentScreen'
>;

type ContentScreenRouteProp = RouteProp<RootStackParamList, 'ContentScreen'>;

const ContentScreen: FC = () => {
  const route = useRoute<ContentScreenRouteProp>();
  const navigation = useNavigation<ContentScreenNavigationProp>();
  const {chipName} = route.params;

  console.log('Chip Name : ', chipName);

  // useEffect(() => {
  //   // Dynamically set the header color based on chipName
  //   const headerColor =
  //     chipName === 'Speaking'
  //       ? colors.speakingChipColor
  //       : chipName === 'Reading'
  //         ? colors.readingChipColor
  //         : chipName === 'Listening'
  //           ? colors.listeningChipColor
  //           : colors.writingChipColor;

  //   navigation.setOptions({
  //     headerStyle: {backgroundColor: headerColor},
  //     headerTitle: chipName, // Optional: Set the header title to the chipName
  //   });
  // }, [chipName, navigation]);

  return (
    <>
      {chipName === 'Speaking' ? (
        <View style={styles.speakingheaderContent}>
          <View style={styles.headertextPosition}>
            <View style={{backgroundColor: '#000', borderRadius: 50}}>
              <AntDesign name="arrowleft" size={20} color="white" />
            </View>
            <Text style={styles.headerTextProperties}>Chip</Text>
          </View>
        </View>
      ) : chipName === 'Reading' ? (
        <View style={styles.readingheaderContent}>
          <View style={styles.headertextPosition}>
            <Text style={styles.headerTextProperties}>Chip</Text>
          </View>
        </View>
      ) : chipName === 'Listening' ? (
        <View style={styles.listeningheaderContent}>
          <View style={styles.headertextPosition}>
            <Text style={styles.headerTextProperties}>Chip</Text>
          </View>
        </View>
      ) : (
        <View style={styles.writingheaderContent}>
          <View style={styles.headertextPosition}>
            <Text style={styles.headerTextProperties}>Chip</Text>
          </View>
        </View>
      )}
    </>
  );
};

export default ContentScreen;
