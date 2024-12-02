import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
    withTiming,
    withSpring,
    useSharedValue,
    useAnimatedStyle,
    Easing,
    withDelay,
    withSequence,
} from 'react-native-reanimated';

import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const OnboardingScreen = () => {
    const navigation = useNavigation();
    // Shared values for animations
    const opacityTitle = useSharedValue(0);
    const scaleTitle = useSharedValue(0.5);
    const translateYTitle = useSharedValue(30); // For slide-in effect

    const opacityDescription = useSharedValue(0);
    const scaleDescription = useSharedValue(0.8);
    const translateYDescription = useSharedValue(30); // For slide-in effect

    const opacityButton = useSharedValue(0);
    const translateYButton = useSharedValue(30); // For button slide-in

    // Start animations when the component mounts
    useEffect(() => {
        // Animate title
        opacityTitle.value = withTiming(1, { duration: 800, easing: Easing.ease });
        scaleTitle.value = withSpring(1, { damping: 8, stiffness: 100 });
        translateYTitle.value = withTiming(0, { duration: 800, easing: Easing.ease });

        // Animate description
        opacityDescription.value = withTiming(1, { duration: 1000, easing: Easing.ease });
        scaleDescription.value = withSpring(1, { damping: 8, stiffness: 100 });
        translateYDescription.value = withTiming(0, { duration: 1000, easing: Easing.ease });

        // Animate button after a delay
        opacityButton.value = withDelay(200, withTiming(1, { duration: 800, easing: Easing.ease }));
        translateYButton.value = withDelay(200, withTiming(0, { duration: 800, easing: Easing.ease }));
    }, []);

    const handleFinishOnboarding = () => {
        navigation.navigate('Home' as never);
    };

    // Animated styles for the title
    const animatedTitleStyle = useAnimatedStyle(() => {
        return {
            opacity: opacityTitle.value,
            transform: [
                { scale: scaleTitle.value },
                { translateY: translateYTitle.value },
            ],
        };
    });

    // Animated styles for the description
    const animatedDescriptionStyle = useAnimatedStyle(() => {
        return {
            opacity: opacityDescription.value,
            transform: [
                { scale: scaleDescription.value },
                { translateY: translateYDescription.value },
            ],
        };
    });

    // Animated styles for the button
    const animatedButtonStyle = useAnimatedStyle(() => {
        return {
            opacity: opacityButton.value,
            transform: [{ translateY: translateYButton.value }],
        };
    });

    return (
        <View style={styles.container}>
            <Animated.Text style={[styles.title, animatedTitleStyle]}>
                Welcome to the App!
            </Animated.Text>
            <Animated.Text style={[styles.description, animatedDescriptionStyle]}>
                Explore our features, manage your profile, and much more.
            </Animated.Text>
            <Animated.View style={animatedButtonStyle}>
                <Button icon="send" mode="contained" onPress={handleFinishOnboarding}>
                    Get Started
                </Button>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    title: { fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
    description: { fontSize: 16, textAlign: 'center', marginBottom: 20 },
});

export default OnboardingScreen;
