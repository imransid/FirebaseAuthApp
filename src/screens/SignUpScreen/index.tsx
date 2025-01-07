import React, {useState} from 'react';
import {
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Controller, set, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {signUpFormValidation} from '@/utils/formValidation';
import CustomTextInput from '@/Components/CustomTextInput/CustomTextInput';
import CustomButton from '@/Components/CustomButton/CustomButton';
import {RootStackParamList} from '@/navigation/AppNavigator';
import {useMutation} from '@apollo/client';
import {REGISTER_MUTATION} from '@/mutation/register.mutations';
import ToastPopUp from '@/utils/Toast.android';
import styles from './style';

// Define the type of navigation object
type NavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

const SignUpScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [disable, setDisable] = useState(false);

  const [registerMutation] = useMutation(REGISTER_MUTATION);

  // interface for create account
  interface ISignUpDataProps {
    firstName: string;
    email: string;
    password: string;
    confirmPassword: string;
    lastName: string;
    role: string;
  }

  // yup validation with react-hook-form
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<ISignUpDataProps>({
    resolver: yupResolver(signUpFormValidation),
    defaultValues: {
      firstName: '',
      email: '',
      password: '',
      confirmPassword: '',
      lastName: '',
      role: 'student',
    },
  });

  const handleSignUp = async (data: ISignUpDataProps) => {
    setDisable(true);
    try {
      const response = await registerMutation({
        variables: {input: data},
      });

      if (response.data.register) {
        ToastPopUp(response.data.register.message);
        navigation.navigate('SignIn' as never);
      }
    } catch (error) {
      console.error('Sign-Up Error:', error);
      Alert.alert('Error', 'Failed to create account. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <View style={styles.headertextPosition}>
          <Text style={styles.headerTextProperties}>Create Your Account!</Text>
        </View>
      </View>

      <ScrollView style={styles.signUpContentContainer}>
        <View style={styles.secondaryHeaderImageProperties}>
          <Image
            source={require('../../assets/images/book_logo.png')}
            style={styles.signUpHeaderImage}></Image>
          <View style={styles.secondaryHeaderTextPosition}>
            <View style={styles.secondaryHeaderTextProperties}>
              <Text style={styles.signUpHeaderText1}>IELTS</Text>
              <Text style={styles.signUpHeaderText2}>With POLOCK BHAI</Text>
            </View>
          </View>
        </View>

        <View style={styles.signUpContentPosition}>
          <View style={styles.textInputComponentProperties}>
            <Controller
              control={control}
              name="firstName"
              render={({field: {onChange, value}}) => (
                <CustomTextInput
                  type="string"
                  value={value}
                  onChangeText={onChange}
                  placeholder="First Name"
                  inputStyle={styles.inputText}
                  isError={Boolean(errors.firstName)}
                  leftIcon={
                    <MaterialCommunityIcons
                      name="account-outline"
                      size={28}
                      color={'#888888'}
                    />
                  }
                />
              )}
            />
            {errors.firstName != null && (
              <Text style={styles.errorTxt}>{errors.firstName.message}</Text>
            )}
          </View>

          <View style={styles.textInputComponentProperties}>
            <Controller
              control={control}
              name="lastName"
              render={({field: {onChange, value}}) => (
                <CustomTextInput
                  type="string"
                  value={value}
                  onChangeText={onChange}
                  placeholder="Last Name"
                  inputStyle={styles.inputText}
                  isError={Boolean(errors.lastName)}
                  leftIcon={
                    <MaterialCommunityIcons
                      name="account-outline"
                      size={28}
                      color={'#888888'}
                    />
                  }
                />
              )}
            />
            {errors.lastName != null && (
              <Text style={styles.errorTxt}>{errors.lastName.message}</Text>
            )}
          </View>

          <View style={styles.textInputComponentProperties}>
            <Controller
              control={control}
              name="email"
              render={({field: {onChange, value}}) => (
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
            <Controller
              control={control}
              name="password"
              render={({field: {onChange, value}}) => (
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

          <View style={styles.textInputComponentProperties}>
            {/* <Text style={styles.inputHeader}>Password</Text> */}
            <Controller
              control={control}
              name="confirmPassword"
              render={({field: {onChange, value}}) => (
                <CustomTextInput
                  type="password"
                  value={value}
                  onChangeText={onChange}
                  placeholder="Confirm Password"
                  inputStyle={styles.inputText}
                  isPassword
                  isError={Boolean(errors.confirmPassword)}
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
            {errors.confirmPassword != null && (
              <Text style={styles.errorTxt}>
                {errors.confirmPassword.message}
              </Text>
            )}
          </View>

          <View style={styles.buttonPosition}>
            <CustomButton
              text="Sign Up"
              onPress={handleSubmit(handleSignUp)}
              icon={<></>}
              disabled={disable}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUpScreen;
