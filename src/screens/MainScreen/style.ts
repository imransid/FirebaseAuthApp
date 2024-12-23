import {colors} from '@/theme/colors';
import {StyleSheet} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {scale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.appBackground,
  },
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
    height: scale(75),
    width: scale(300),
    //backgroundColor: 'red',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topCardPosition: {
    top: scale(180),
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
  chipPosition: {
    flexDirection: 'row',
    gap: scale(10),
  },
  firstChipsPosition: {
    alignItems: 'center',
    top: scale(190),
  },
  secondChipsPosition: {
    alignItems: 'center',
    top: scale(200),
  },
  speakingChipProperties: {
    height: scale(85),
    width: scale(145),
    backgroundColor: colors.speakingChipColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  writingChipProperties: {
    height: scale(85),
    width: scale(145),
    backgroundColor: colors.writingChipColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  listeningChipProperties: {
    height: scale(85),
    width: scale(145),
    backgroundColor: colors.listeningChipColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  readingChipProperties: {
    height: scale(85),
    width: scale(145),
    backgroundColor: colors.readingChipColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  userNameChip: {
    backgroundColor: 'white',
    height: scale(50),
    width: scale(150),
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationChip: {
    backgroundColor: 'white',
    height: 50,
    width: 55,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsChip: {
    backgroundColor: 'white',
    height: 50,
    width: 55,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: '#F2F1F6',
    height: scale(120),
  },
  headerChipProperties: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: scale(10),
  },
  userNameText: {
    color: colors.userNameTextColor,
    fontSize: scale(12),
    fontWeight: '600',
  },
  notificationAndSettingsProperties: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  notificationAndSettings: {
    flexDirection: 'row',
    gap: scale(10),
  },
});

export default styles;
