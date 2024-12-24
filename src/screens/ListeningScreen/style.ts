import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {colors} from '@/theme/colors';

const styles = StyleSheet.create({
  headerView: {
    height: scale(120),
    width: 'auto',
    backgroundColor: colors.listeningChipColor,
  },
  activityNameText: {
    color: 'white',
    fontSize: scale(14),
    fontWeight: '600',
  },
  headericonAndText: {
    left: scale(20),
    top: scale(20),
  },
  headerMainIconPosition: {
    left: scale(8),
  },
  headerTextPosition: {
    left: scale(115),
    bottom: scale(60),
  },
  headerTextStyle: {
    color: 'white',
    fontSize: scale(16),
    fontWeight: '600',
  },
  completedContainer: {
    height: scale(46),
    width: scale(200),
    backgroundColor: '#ffffff40',
    borderRadius: 50,
  },
  completedContainerPosition: {
    left: scale(225),
    bottom: scale(50),
  },
  completedContainerInside: {
    flexDirection: 'row',
  },
  completedContainerOuterRoundPosition: {
    marginTop: 2,
  },
  completedContainerOuterRound: {
    height: 50,
    width: 50,
    backgroundColor: '#ffffff40',
    borderRadius: 50,
    alignItems: 'center',
  },
  completedContainerInnerRound: {
    height: 43,
    width: 43,
    backgroundColor: '#ad145780',
    borderRadius: 50,
    marginTop: 3.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedPercentText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  completedTextPosition: {
    alignItems: 'center',
    justifyContent: 'center',
    left: 7,
  },
  completedText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default styles;
