import React from 'react';
import {FC} from 'react';
import {View, Text} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from './style';

const ListeningScreen: FC = () => {
  return (
    <ScrollView>
      <View style={styles.headerView}>
        <View style={styles.headericonAndText}>
          <View style={styles.headerMainIconPosition}>
            <FontAwesome5 name="headset" size={60} color="#fff" />
          </View>
          <Text style={styles.activityNameText}>LISTENING</Text>
        </View>
        <View style={styles.headerTextPosition}>
          <Text style={styles.headerTextStyle}>IELTS Daily Listening</Text>
        </View>

        <View style={styles.completedContainerPosition}>
          <View style={styles.completedContainer}>
            <View style={styles.completedContainerInside}>
              <View style={styles.completedContainerOuterRoundPosition}>
                <View style={styles.completedContainerOuterRound}>
                  <View style={styles.completedContainerInnerRound}>
                    <Text style={styles.completedPercentText}>0%</Text>
                  </View>
                </View>
              </View>
              <View style={styles.completedTextPosition}>
                <Text style={styles.completedText}>Completed</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ListeningScreen;
