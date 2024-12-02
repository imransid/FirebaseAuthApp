import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';


// Define the type for your navigation stack
type RootStackParamList = {
    Onboarding: undefined;
    Welcome: undefined;
};

// Define the type of navigation object
type NavigationProp = StackNavigationProp<RootStackParamList, 'Onboarding'>;


const LoginScreen = () => {

    const navigation = useNavigation<NavigationProp>();

    const handleGoogleSignIn = async () => {
        try {
            // Trigger Google Sign-In
            const userInfo = await GoogleSignin.signIn();

            // Check for a valid ID token
            if (userInfo?.data?.idToken) {
                // Create Google credential and authenticate with Firebase
                const googleCredential = auth.GoogleAuthProvider.credential(userInfo.data.idToken);
                const userCredential = await auth().signInWithCredential(googleCredential);

                // Determine if the user is new
                const isFirstTime = userCredential.additionalUserInfo?.isNewUser || false;
                navigation.replace(isFirstTime ? 'Onboarding' : 'Welcome');
            } else {
                Alert.alert('Sign-In Failed', 'No ID token found during Google sign-in.');
            }
        } catch (error) {
            console.error('Google Sign-In Error:', error);
            Alert.alert('Error', 'Something went wrong with the Google Sign-In process.');
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.signInButton} onPress={handleGoogleSignIn}>
                <Text style={styles.signInText}>Sign in with Google</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    signInButton: {
        padding: 15,
        backgroundColor: '#4285F4',
        borderRadius: 5,
    },
    signInText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default LoginScreen;
