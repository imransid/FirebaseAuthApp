import React from 'react';
import {FC} from 'react';
import {View, Text} from 'react-native';
import styles from './style';

const NotificationScreen: FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>Coming Soon!</Text>
    </View>
  );
};

export default NotificationScreen;
