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

const carouselItems = [
  {
    image:
      'https://images.unsplash.com/photo-1678436748951-ef6d381e7a25?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDN8YWV1NnJMLWo2ZXd8fGVufDB8fHx8fA%3D%3D',
    ar: 0.7,
  },
  {
    image:
      'https://images.unsplash.com/photo-1680813977591-5518e78445a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ar: 0.67,
  },
  {
    image:
      'https://images.unsplash.com/photo-1679508056887-5c76269dad54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ar: 0.8,
  },
];

const items = ['Speaking', 'Reading', 'Writing', 'Listening'];

const MainScreen: FC = () => {
  const width = Dimensions.get('window').width;

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
            }}>
            <Text>Speaking</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 100,
              width: 170,
              backgroundColor: 'teal',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 16,
            }}>
            <Text>Writing</Text>
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
            }}>
            <Text>Listening</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 100,
              width: 170,
              backgroundColor: 'purple',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 16,
            }}>
            <Text>Reading</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default MainScreen;
