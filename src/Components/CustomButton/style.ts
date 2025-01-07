import {StyleSheet} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

import {colors} from '../../theme/colors';

const styles = StyleSheet.create({
  buttonProperties: {
    alignItems: 'center',
    backgroundColor: colors.buttonBg,
    borderRadius: scale(10),
    flexDirection: 'row',
    height: verticalScale(46),
    justifyContent: 'center',
    width: scale(240),
  },
  buttonText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: moderateScale(18),
  },
});

export default styles;
