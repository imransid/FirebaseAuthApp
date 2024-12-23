import React from 'react';
import {FC} from 'react';
import {
  Dimensions,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import styles from './style';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '@/navigation/AppNavigator';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Col, Grid, Row} from 'react-native-easy-grid';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '@/theme/colors';
import LinearGradient from 'react-native-linear-gradient';

type MainScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'MainScreen'
>;

type MainScreenRouteProp = RouteProp<RootStackParamList, 'MainScreen'>;

const MainScreen: FC = () => {
  const width = Dimensions.get('window').width;
  const navigation = useNavigation<MainScreenNavigationProp>();

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
            start={{x: 0, y: 0}} // Starting point of the gradient (left side)
            end={{x: 1, y: 0}} // Ending point of the gradient (right side)
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
            onPress={() =>
              navigation.navigate('ContentScreen', {chipName: 'Speaking'})
            }>
            <Text style={styles.topCardText2}>Speaking</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.writingChipProperties}
            onPress={() =>
              navigation.navigate('ContentScreen', {chipName: 'Writing'})
            }>
            <Text style={styles.topCardText2}>Writing</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.secondChipsPosition}>
        <View style={styles.chipPosition}>
          <TouchableOpacity
            style={styles.listeningChipProperties}
            onPress={() =>
              navigation.navigate('ContentScreen', {chipName: 'Listening'})
            }>
            <Text style={styles.topCardText2}>Listening</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.readingChipProperties}
            onPress={() =>
              navigation.navigate('ContentScreen', {chipName: 'Reading'})
            }>
            <Text style={styles.topCardText2}>Reading</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default MainScreen;
