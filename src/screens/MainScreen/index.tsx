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
import {useNavigation} from '@react-navigation/native';

const Image1 = require('../../assets/images/1.jpeg');
const Image2 = require('../../assets/images/2.jpeg');
const Image3 = require('../../assets/images/3.jpeg');

const carouselItems = [
  {
    id: 1,
    uri: Image1,
    title: 'Innovate Your Design with Cutting-Edge Imagery',
  },
  {
    id: 2,
    uri: Image2,
    title: 'Transform Your UI with Future-Ready Visuals',
  },
  {
    id: 3,
    uri: Image3,
    title: 'Optimize Your Workflow with Intelligent Visuals',
  },
];

const MainScreen: FC = () => {
  const width = Dimensions.get('window').width;
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.carouselPosition}>
        <Carousel
          loop
          width={width}
          height={width / 2}
          autoPlay={true}
          data={carouselItems}
          scrollAnimationDuration={1000}
          renderItem={({index}) => (
            <View style={styles.carouselItems}>
              <Text style={styles.itemText}>{index}</Text>
            </View>
          )}
        />
      </View>

      <View style={styles.topCardPosition}>
        <TouchableOpacity style={styles.topCard}>
          <Text style={styles.topCardText1}>Full Video Package</Text>
          <Text style={styles.topCardText2}>- including 1x bonus feedback</Text>
        </TouchableOpacity>
      </View>

      <View style={{alignItems: 'center', top: 425}}>
        <View style={{flexDirection: 'row', gap: 10}}>
          <TouchableOpacity
            style={{
              height: 100,
              width: 170,
              backgroundColor: 'orange',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 16,
            }}
            onPress={() => navigation.navigate('ContentScreen' as never)}>
            <Text style={styles.topCardText2}>Speaking</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 100,
              width: 170,
              backgroundColor: 'teal',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 16,
            }}
            onPress={() => navigation.navigate('ContentScreen' as never)}>
            <Text style={styles.topCardText2}>Writing</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{alignItems: 'center', top: 440}}>
        <View style={{flexDirection: 'row', gap: 10}}>
          <TouchableOpacity
            style={{
              height: 100,
              width: 170,
              backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 16,
            }}
            onPress={() => navigation.navigate('ContentScreen' as never)}>
            <Text style={styles.topCardText2}>Listening</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 100,
              width: 170,
              backgroundColor: 'purple',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 16,
            }}
            onPress={() => navigation.navigate('ContentScreen' as never)}>
            <Text style={styles.topCardText2}>Reading</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default MainScreen;
