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

        <View style={{left: 270, bottom: 60}}>
          <View
            style={{
              height: 54,
              width: 200,
              backgroundColor: '#ffffff40',
              borderRadius: 50,
            }}>
            <View style={{marginTop: 2}}>
              <View
                style={{
                  height: 50,
                  width: 50,
                  backgroundColor: '#ffffff40',
                  borderRadius: 50,
                  alignItems: 'center',
                }}></View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ListeningScreen;
