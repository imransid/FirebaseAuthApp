import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Alert,
    Image,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { colors } from '@/theme/colors';
import { signUpFormValidation } from '@/utils/formValidation';
import CustomTextInput from '@/Components/CustomTextInput/CustomTextInput';
import CustomButton from '@/Components/CustomButton/CustomButton';
import { RootStackParamList } from '@/navigation/AppNavigator';
import { useMutation } from '@apollo/client';
import { REGISTER_MUTATION } from '@/mutation/register.mutations';
import stylesX from "../../Components/CustomButton/style"
import ToastPopUp from '@/utils/Toast.android';

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
        lastName: string;
        mobileNumber: string;
        role: string
    }

    // yup validation with react-hook-form
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<ISignUpDataProps>({
        resolver: yupResolver(signUpFormValidation),
        defaultValues: {
            firstName: '',
            email: '',
            password: '',
            lastName: '',
            mobileNumber: '',
            role: 'student',
        },
    });

    const handleSignUp = async (data: ISignUpDataProps) => {
        try {
            const response = await registerMutation({
                variables: { input: data },
            });

            if (response.data.register) {
                ToastPopUp(response.data.register.message)
                navigation.navigate("SignIn" as never);
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
            <View style={styles.signUpContentContainer}>
                <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                    <Image
                        source={require('../../assets/images/book_logo.png')}
                        style={styles.signUpHeaderImage}></Image>
                    <View style={{ marginTop: scale(45) }}>
                        <View style={{ flexDirection: 'row', gap: 10 }}>
                            <Text style={styles.signUpHeaderText1}>IELTS</Text>
                            <Text style={styles.signUpHeaderText2}>daily</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.signUpContentPosition}>
                    <View style={styles.textInputComponentProperties}>
                        <Controller
                            control={control}
                            name="firstName"
                            render={({ field: { onChange, value } }) => (
                                <CustomTextInput
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
                            render={({ field: { onChange, value } }) => (
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

                    <View style={styles.textInputComponentProperties}>
                        <Controller
                            control={control}
                            name="mobileNumber"
                            render={({ field: { onChange, value } }) => (
                                <CustomTextInput
                                    // type="string"
                                    value={value}
                                    onChangeText={onChange}
                                    placeholder="Mobile Number"
                                    inputStyle={styles.inputText}
                                    isError={Boolean(errors.mobileNumber)}
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
                        {errors.mobileNumber != null && (
                            <Text style={styles.errorTxt}>{errors.mobileNumber.message}</Text>
                        )}
                    </View>



                    <View style={styles.buttonPosition}>

                        <TouchableOpacity disabled={disable} style={stylesX.buttonProperties} onPress={handleSubmit(handleSignUp)} >
                            <Text style={stylesX.buttonText}>{
                                "Sign Up"
                            }</Text>

                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        </View>
    );
};

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
        height: scale(130),
        width: scale(130),
        marginLeft: scale(5),
    },
    signUpHeaderText1: {
        fontSize: moderateScale(38),
        fontWeight: '700',
        color: 'black',
    },
    signUpHeaderText2: {
        fontSize: moderateScale(38),
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
        color: colors.header,
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
});

export default SignUpScreen;
