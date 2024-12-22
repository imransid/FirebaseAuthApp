import {StyleSheet} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {scale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  carouselPosition: {
    top: scale(120),
  },
  carouselItems: {
    flex: 2,
    borderRadius: 16,
    borderWidth: 0.5,
    justifyContent: 'center',
  },
  itemText: {
    textAlign: 'center',
    fontSize: 30,
    color: 'black',
  },
  topCard: {
    height: scale(100),
    width: scale(300),
    backgroundColor: 'red',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topCardPosition: {
    top: scale(350),
    alignItems: 'center',
  },
  topCardText1: {
    color: 'white',
    fontSize: 20,
  },
  topCardText2: {
    color: 'white',
    fontSize: 15,
  },
});

export default styles;
