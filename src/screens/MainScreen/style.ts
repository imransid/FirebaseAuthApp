import {colors} from '@/theme/colors';
import {StyleSheet} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {scale, moderateScale} from 'react-native-size-matters';

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
    top: scale(150),
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
  chipInside: {
    flexDirection: 'row',
    gap: scale(5),
  },
  chipItems: {
    marginLeft: scale(14),
  },
  chipText: {
    color: 'white',
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
  chipSecondText: {
    color: 'white',
    fontSize: moderateScale(13),
    fontWeight: '400',
  },
  chipShadeInsideProperties: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chipShadeStyle: {
    height: scale(80),
    width: scale(27),
    backgroundColor: '#FFFFFF33',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipShadePosition: {
    marginLeft: scale(10),
  },
  firstChipsPosition: {
    alignItems: 'center',
    top: scale(160),
  },
  secondChipsPosition: {
    alignItems: 'center',
    top: scale(170),
  },
  speakingChipProperties: {
    height: scale(85),
    width: scale(145),
    backgroundColor: colors.speakingChipColor,
    justifyContent: 'center',
    borderRadius: 16,
  },
  writingChipProperties: {
    height: scale(85),
    width: scale(145),
    backgroundColor: colors.writingChipColor,
    justifyContent: 'center',
    borderRadius: 16,
  },
  listeningChipProperties: {
    height: scale(85),
    width: scale(145),
    backgroundColor: colors.listeningChipColor,
    justifyContent: 'center',
    borderRadius: 16,
  },
  readingChipProperties: {
    height: scale(85),
    width: scale(145),
    backgroundColor: colors.readingChipColor,
    justifyContent: 'center',
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
    padding: scale(20),
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
  writingAndReadingShade: {
    marginLeft: scale(18),
  },
  listeningShadePosition: {
    marginLeft: scale(4),
  },

  showUserListButton: {
    marginTop: 10,
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    color: 'black',
  },
  closeButton: {
    marginTop: 20,
  },

  modalContent: {
    marginBottom: 20,
  },
  addTutorialChip: {
    backgroundColor: '#ff5722',
    padding: 10,
    borderRadius: 10,
  },
  addTutorialText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default styles;
