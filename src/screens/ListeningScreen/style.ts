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
});

export default styles;
