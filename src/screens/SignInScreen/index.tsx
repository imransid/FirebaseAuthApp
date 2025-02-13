import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import CustomTextInput from '@/Components/CustomTextInput/CustomTextInput';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { colors } from '@/theme/colors';
import { signInFormValidation } from '@/utils/formValidation';
import CustomButton from '@/Components/CustomButton/CustomButton';
import { RootStackParamList } from '@/navigation/AppNavigator';
import { LOGIN_MUTATION } from '@/mutation/login.mutations';
import { useMutation } from '@apollo/client';
import ToastPopUp from '@/utils/Toast.android';
import { updateToken } from '@/store/slices/features/users/slice';
import { useDispatch } from 'react-redux';
import DeviceInfo from 'react-native-device-info';

import bookLogo from '../../assets/images/book_logo.jpeg'
// Define the type of navigation object
type NavigationProp = StackNavigationProp<RootStackParamList, 'Onboarding'>;

const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [disable, setDisable] = useState(false);

  const dispatch = useDispatch();

  const [loginMutation] = useMutation(LOGIN_MUTATION);

  // interface for creat account
  interface ILoginDataProps {
    email: string;
    password: string;
  }

  // yup validation with react-hook-form
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ILoginDataProps>({
    resolver: yupResolver(signInFormValidation),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleGoogleSignIn = async (data: ILoginDataProps) => {
    try {
      // Await deviceID retrieval to ensure it's a string
      const deviceID = await DeviceInfo.getUniqueId();

      // Add deviceID to data
      const updatedData = { ...data, deviceID };

      console.log("Google Sign-In Payload:", updatedData); // Debugging

      const response = await loginMutation({
        variables: { input: updatedData },
      });

      if (response.data?.login) {
        ToastPopUp(response.data.login.message);
        dispatch(updateToken(response.data.login.token));
        navigation.navigate('Main' as never);
      }
    } catch (error) {
      console.error('Sign-In Error:', error);
      Alert.alert('Error', 'Failed to CONNECT account. Please try again.');
    }
    // };

    // try {
    //   // Trigger Google Sign-In
    //   const userInfo = await GoogleSignin.signIn();

    //   // Check for a valid ID token
    //   if (userInfo?.data?.idToken) {
    //     // Create Google credential and authenticate with Firebase
    //     const googleCredential = auth.GoogleAuthProvider.credential(
    //       userInfo.data.idToken,
    //     );
    //     const userCredential =
    //       await auth().signInWithCredential(googleCredential);

    //     // Determine if the user is new
    //     const isFirstTime =
    //       userCredential.additionalUserInfo?.isNewUser || false;
    //     navigation.replace(isFirstTime ? 'Onboarding' : 'Welcome');
    //   } else {
    //     Alert.alert(
    //       'Sign-In Failed',
    //       'No ID token found during Google sign-in.',
    //     );
    //   }
    // } catch (error) {
    //   console.error('Google Sign-In Error:', error);
    //   Alert.alert(
    //     'Error',
    //     'Something went wrong with the Google Sign-In process.',
    //   );
    // }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <View style={styles.headertextPosition}>
          <Text style={styles.headerTextProperties}>
            It's time to pass IELTS!
          </Text>
        </View>
      </View>
      <View style={styles.loginContentContainer}>
        <View style={{ flexDirection: 'row', alignContent: 'center' }}>
          <Image
            source={bookLogo}
            style={styles.loginHeaderImage}></Image>
          <View style={{ marginTop: scale(45) }}>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <Text style={styles.loginHeaderText1}>IELTS</Text>
              <Text style={styles.loginHeaderText2}>With POLOCK BHAI</Text>
            </View>
          </View>
        </View>

        <View style={styles.loginContentPosition}>
          <View style={styles.textInputComponentProperties}>
            {/* <Text style={styles.inputHeader}>Email Address</Text> */}
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <CustomTextInput
                  type="email"
                  value={value}
                  onChangeText={onChange}
                  placeholder="Email"
                  inputStyle={styles.inputText}
                  isError={Boolean(errors.email)}
                  leftIcon={
                    <MaterialCommunityIcons
                      name="email-outline"
                      size={28}
                      color={'#888888'}
                    />
                  }
                />
              )}
            />
            {errors.email != null && (
              <Text style={styles.errorTxt}>{errors.email.message}</Text>
            )}
          </View>
          <View style={styles.textInputComponentProperties}>
            {/* <Text style={styles.inputHeader}>Password</Text> */}
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <CustomTextInput
                  type="password"
                  value={value}
                  onChangeText={onChange}
                  placeholder="Password"
                  inputStyle={styles.inputText}
                  isPassword
                  isError={Boolean(errors.password)}
                  leftIcon={
                    <MaterialCommunityIcons
                      name="lock-outline"
                      size={25}
                      color="#888888"
                    />
                  }
                />
              )}
            />
            {errors.password != null && (
              <Text style={styles.errorTxt}>{errors.password.message}</Text>
            )}
          </View>
          <View style={styles.buttonPosition}>
            <CustomButton
              onPress={handleSubmit(handleGoogleSignIn)}
              disabled={disable}
              icon={<></>}
              text="Log In"
            />
          </View>
          <View style={styles.buttonPosition}>
            <CustomButton
              onPress={() => navigation.navigate('SignUp' as never)}
              disabled={disable}
              icon={<></>}
              text="Sign Up"
            />
          </View>
          {/* <TouchableOpacity
        style={styles.signInButton}
        onPress={handleGoogleSignIn}>
        <Text style={styles.signInText}>Sign in with Google</Text>
      </TouchableOpacity> */}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    //backgroundColor: colors.buttonBg,
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
  loginHeaderImage: {
    height: scale(95),
    width: scale(95),
    marginLeft: scale(5),
  },
  loginHeaderText1: {
    fontSize: moderateScale(20),
    fontWeight: '700',
    color: 'black',
  },
  loginHeaderText2: {
    fontSize: moderateScale(20),
    fontWeight: '400',
    color: colors.typedText,
  },
  loginContentContainer: {
    height: scale(800),
    width: 'auto',
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    bottom: scale(50),
  },
  loginContentPosition: {
    alignItems: 'center',
    marginTop: scale(5),
  },
  inputText: {
    color: colors.typedText,
    fontSize: moderateScale(14),
  },
  textInputComponentPosition: {
    alignItems: 'center',
  },
  textInputComponentProperties: {
    gap: verticalScale(6),
    marginTop: verticalScale(12),
  },
  errorTxt: {
    color: colors.error,
    fontSize: moderateScale(14),
  },
  inputHeader: {
    color: colors.typedText,
    fontSize: moderateScale(14),
  },
  buttonPosition: {
    marginTop: verticalScale(18),
  },
});

export default LoginScreen;
