import React, { useEffect } from 'react';
import { FC } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './style';
import { useNavigation } from '@react-navigation/native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import Entypo from 'react-native-vector-icons/Entypo';
import { colors } from '@/theme/colors';
import LinearGradient from 'react-native-linear-gradient';

const MainScreen: FC = () => {
  const navigation = useNavigation();


  useEffect(() => {

    // get user details 

  })

  return (
    <>
      <View style={styles.header}>
        <View style={styles.headerChipProperties}>
          <TouchableOpacity style={styles.userNameChip}>
            <Text style={styles.userNameText}>UserName</Text>
          </TouchableOpacity>
          <View style={styles.notificationAndSettingsProperties}>
            <View style={styles.notificationAndSettings}>
              <TouchableOpacity style={styles.notificationChip}>
                <MaterialCommunityIcons
                  name="bell"
                  size={25}
                  color={colors.userNameTextColor}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.settingsChip}>
                <Ionicons
                  name="settings"
                  size={25}
                  color={colors.userNameTextColor}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.topCardPosition}>
        <TouchableOpacity style={styles.topCard}>
          <LinearGradient
            colors={['#f57c00', '#FF5252', '#ad1457', '#7d3c98', '#00695c']}
            start={{ x: 0, y: 0 }} // Starting point of the gradient (left side)
            end={{ x: 1, y: 0 }} // Ending point of the gradient (right side)
            style={styles.topCard}>
            <Text style={styles.topCardText1}>Full Video Package</Text>
            <Text style={styles.topCardText2}>
              - including 1x bonus feedback
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View style={styles.firstChipsPosition}>
        <View style={styles.chipPosition}>
          <TouchableOpacity
            style={styles.speakingChipProperties}
            onPress={() => navigation.navigate('SpeakingScreen' as never)}>
            <View style={styles.chipShadeInsideProperties}>
              <View style={styles.chipItems}>
                <View style={styles.chipInside}>
                  <MaterialCommunityIcons
                    name="microphone"
                    size={28}
                    color={colors.white}
                  />
                  <Text style={styles.chipText}>Speaking</Text>
                </View>
                <Text style={styles.chipSecondText}>with teacher</Text>
                <Text style={styles.chipSecondText}>feedback</Text>
              </View>
              <View style={styles.chipShadePosition}>
                <View style={styles.chipShadeStyle}>
                  <Entypo name="chevron-right" size={20} color={colors.white} />
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.writingChipProperties}
            onPress={() => navigation.navigate('WritingScreen' as never)}>
            <View style={styles.chipShadeInsideProperties}>
              <View style={styles.chipItems}>
                <View style={styles.chipInside}>
                  <MaterialCommunityIcons
                    name="pencil"
                    size={25}
                    color={colors.white}
                  />
                  <Text style={styles.chipText}>Writing</Text>
                </View>
                <Text style={styles.chipSecondText}>with teacher</Text>
                <Text style={styles.chipSecondText}>feedback</Text>
              </View>
              <View style={styles.writingAndReadingShade}>
                <View style={styles.chipShadePosition}>
                  <View style={styles.chipShadeStyle}>
                    <Entypo
                      name="chevron-right"
                      size={20}
                      color={colors.white}
                    />
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.secondChipsPosition}>
        <View style={styles.chipPosition}>
          <TouchableOpacity
            style={styles.listeningChipProperties}
            onPress={() => navigation.navigate('ListeningScreen' as never)}>
            <View style={styles.chipShadeInsideProperties}>
              <View style={styles.chipItems}>
                <View style={styles.chipInside}>
                  <MaterialIcons
                    name="headset"
                    size={25}
                    color={colors.white}
                  />
                  <Text style={styles.chipText}>Listening</Text>
                </View>
                <Text style={styles.chipSecondText}>with instant</Text>
                <Text style={styles.chipSecondText}>feedback</Text>
              </View>
              <View style={styles.listeningShadePosition}>
                <View style={styles.chipShadePosition}>
                  <View style={styles.chipShadeStyle}>
                    <Entypo
                      name="chevron-right"
                      size={20}
                      color={colors.white}
                    />
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.readingChipProperties}
            onPress={() => navigation.navigate('ReadingScreen' as never)}>
            <View style={styles.chipShadeInsideProperties}>
              <View style={styles.chipItems}>
                <View style={styles.chipInside}>
                  <Foundation
                    name="book-bookmark"
                    size={26}
                    color={colors.white}
                  />
                  <Text style={styles.chipText}>Reading</Text>
                </View>
                <Text style={styles.chipSecondText}>with instant</Text>
                <Text style={styles.chipSecondText}>feedback</Text>
              </View>
              <View style={styles.writingAndReadingShade}>
                <View style={styles.chipShadePosition}>
                  <View style={styles.chipShadeStyle}>
                    <Entypo
                      name="chevron-right"
                      size={20}
                      color={colors.white}
                    />
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default MainScreen;
