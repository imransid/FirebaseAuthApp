import {colors} from '@/theme/colors';
import {StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  speakingheaderContent: {
    height: scale(140),
    width: 'auto',
    backgroundColor: colors.speakingChipColor,
  },
  writingheaderContent: {
    height: scale(140),
    width: 'auto',
    backgroundColor: colors.writingChipColor,
  },
  listeningheaderContent: {
    height: scale(140),
    width: 'auto',
    backgroundColor: colors.listeningChipColor,
  },
  readingheaderContent: {
    height: scale(140),
    width: 'auto',
    backgroundColor: colors.readingChipColor,
  },
  headertextPosition: {
    alignItems: 'center',
    top: verticalScale(30),
  },
  headerTextProperties: {
    fontSize: scale(24),
    fontWeight: '600',
    color: '#fff',
  },
});

export default styles;
