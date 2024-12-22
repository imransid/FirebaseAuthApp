import {StyleSheet} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

import {colors} from '../../theme/colors';

const styles = StyleSheet.create({
  buttonProperties: {
    alignItems: 'center',
    backgroundColor: colors.buttonBg,
    borderRadius: scale(10),
    flexDirection: 'row',
    gap: scale(10),
    height: verticalScale(46),
    justifyContent: 'center',
    width: scale(260),
  },
  buttonText: {
    color: colors.white,
    //fontFamily: 'WorkSansSemiBold',
    fontWeight: '600',
    fontSize: moderateScale(16),
  },
});

export default styles;
