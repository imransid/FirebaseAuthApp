import {colors} from '@/theme/colors';
import {StyleSheet} from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContent: {
    height: scale(140),
    width: 'auto',
    backgroundColor: colors.buttonBg,
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
  signUpHeaderImage: {
    height: scale(95),
    width: scale(95),
    marginLeft: scale(5),
  },
  signUpHeaderText1: {
    fontSize: moderateScale(20),
    fontWeight: '700',
    color: 'black',
  },
  signUpHeaderText2: {
    fontSize: moderateScale(20),
    fontWeight: '400',
    color: colors.typedText,
  },
  signUpContentContainer: {
    height: scale(800),
    width: 'auto',
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    bottom: scale(50),
  },
  signUpContentPosition: {
    alignItems: 'center',
    marginTop: scale(5),
  },
  inputText: {
    color: colors.typedText,
    fontSize: moderateScale(14),
  },
  textInputComponentProperties: {
    gap: verticalScale(6),
    marginTop: verticalScale(12),
  },
  errorTxt: {
    color: colors.error,
    fontSize: moderateScale(14),
  },
  buttonPosition: {
    marginTop: verticalScale(18),
  },
  secondaryHeaderTextPosition: {
    marginTop: scale(45),
  },
  secondaryHeaderTextProperties: {
    flexDirection: 'row',
    gap: 10,
  },
  secondaryHeaderImageProperties: {
    flexDirection: 'row',
    alignContent: 'center',
  },
});

export default styles;
