import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Animated, {
    withTiming,
    withRepeat,
    useSharedValue,
    useAnimatedStyle,
    Easing,
} from 'react-native-reanimated';

const WelcomeScreen = ({ navigation }) => {
    // Shared values for watch hands animation
    const secondHandRotation = useSharedValue(0); // Rotate the second hand
    const minuteHandRotation = useSharedValue(0); // Rotate the minute hand
    const hourHandRotation = useSharedValue(0); // Rotate the hour hand

    // Animation trigger when the component mounts
    useEffect(() => {
        // Animate the second hand (360 degrees per minute)
        secondHandRotation.value = withRepeat(
            withTiming(360, { duration: 60000, easing: Easing.linear }),
            -1,
            false
        );

        // Animate the minute hand (360 degrees per hour)
        minuteHandRotation.value = withRepeat(
            withTiming(360, { duration: 3600000, easing: Easing.linear }),
            -1,
            false
        );

        // Animate the hour hand (360 degrees per 12 hours)
        hourHandRotation.value = withRepeat(
            withTiming(360, { duration: 43200000, easing: Easing.linear }),
            -1,
            false
        );
    }, []);

    // Animated styles for the watch hands
    const secondHandStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotate: `${secondHandRotation.value}deg` }],
        };
    });

    const minuteHandStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotate: `${minuteHandRotation.value}deg` }],
        };
    });

    const hourHandStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotate: `${hourHandRotation.value}deg` }],
        };
    });

    const handleContinue = () => {
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <Animated.Text style={styles.title}>Welcome Back!</Animated.Text>

            {/* Watch */}
            <View style={styles.watchContainer}>
                <View style={styles.watchFace}>
                    {/* Hour Hand */}
                    <Animated.View style={[styles.watchHand, styles.hourHand, hourHandStyle]} />
                    {/* Minute Hand */}
                    <Animated.View style={[styles.watchHand, styles.minuteHand, minuteHandStyle]} />
                    {/* Second Hand */}
                    <Animated.View style={[styles.watchHand, styles.secondHand, secondHandStyle]} />
                </View>
            </View>

            {/* Continue Button */}
            <Animated.View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleContinue}>
                    <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#6200EE', // Vibrant background color
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 8,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 3,
    },
    watchContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
    },
    watchFace: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 6,
        borderColor: '#fff', // White border for the watch
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    watchHand: {
        position: 'absolute',
        width: 2,
        height: 50,
        backgroundColor: '#fff',
        top: 25,
        left: 74, // Center of the watch face
        transformOrigin: '50% 100%',
    },
    secondHand: {
        height: 60,
        backgroundColor: '#FF4081', // Red color for the second hand
    },
    minuteHand: {
        height: 50,
        backgroundColor: '#00FF00', // Green color for the minute hand
    },
    hourHand: {
        height: 40,
        backgroundColor: '#0000FF', // Blue color for the hour hand
    },
    buttonContainer: {
        marginTop: 20,
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 30,
        backgroundColor: '#FF4081', // Vibrant button color
        borderRadius: 30,
        elevation: 5,
        shadowColor: '#FF4081',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default WelcomeScreen;
