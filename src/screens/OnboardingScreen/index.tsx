import React, { useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    Dimensions,
    TouchableOpacity,
    Alert,
} from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

// Get screen width for swipe animations
const { width } = Dimensions.get('window');

// Updated image paths
const Image1 = require("../../assets/images/1.jpeg");
const Image2 = require("../../assets/images/2.jpeg");
const Image3 = require("../../assets/images/3.jpeg");

// Background image data
const images = [
    {
        id: 1,
        uri: Image1,
        title: 'Innovate Your Design with Cutting-Edge Imagery',
    },
    {
        id: 2,
        uri: Image2,
        title: 'Transform Your UI with Future-Ready Visuals',
    },
    {
        id: 3,
        uri: Image3,
        title: 'Optimize Your Workflow with Intelligent Visuals',
    }
];

const Onboarding = () => {
    const translateX = useSharedValue(0); // Tracks the swipe position
    const currentIndex = useSharedValue(0); // Shared value to track the current index
    const navigation = useNavigation();
    // Handle swipe gesture
    const handleSwipe = (event: any) => {
        const { translationX, velocityX } = event.nativeEvent;

        if (Math.abs(velocityX) > 500 || Math.abs(translationX) > width / 3) {
            const direction = translationX > 0 ? -1 : 1; // Determine the swipe direction

            if (
                (currentIndex.value === 0 && direction === -1) || // Prevent left swipe on the first image
                (currentIndex.value === images.length - 1 && direction === 1) // Prevent right swipe on the last image
            ) {
                translateX.value = withSpring(-currentIndex.value * width); // Snap back to current image
                return;
            }

            // Update the current index based on swipe direction
            currentIndex.value += direction;
        }

        // Animate the swipe to the next image
        translateX.value = withSpring(-currentIndex.value * width, {
            damping: 10, // Smoother transition
            stiffness: 100, // Adjust stiffness for smoother effect
        });
    };

    // Swipe to the next image
    const swipeToNext = () => {
        if (currentIndex.value < images.length - 1) {
            goToImage(currentIndex.value += 1);
        } else {
            navigation.navigate("Home" as never)
        }
    };

    // Skip onboarding and move to the last slide
    const skipOnboarding = () => {
        currentIndex.value = images.length - 1;
        translateX.value = withSpring(-currentIndex.value * width, {
            damping: 10,
            stiffness: 100,
        });

    };

    // Go to a specific image when a dot is pressed
    const goToImage = (index: any) => {
        currentIndex.value = index;
        translateX.value = withSpring(-index * width, {
            damping: 10,
            stiffness: 100,
        });
    };

    // Auto-swipe logic removed (as requested)

    // Animated style for swipe transition
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    // Animated style for text fade-out and fade-in effect
    const getTextStyle = (index: any) => {
        return useAnimatedStyle(() => ({
            opacity: withTiming(currentIndex.value === index ? 1 : 0, {
                duration: 500, // Duration of fade effect
            }),
        }));
    };

    return (
        <View style={styles.container}>
            {/* Swipeable images */}
            <PanGestureHandler onGestureEvent={handleSwipe}>
                <Animated.View style={[styles.swiperContainer, animatedStyle]}>
                    {images.map((image, index) => (
                        <View key={image.id} style={styles.imageContainer}>
                            <ImageBackground
                                source={image.uri}
                                style={styles.backgroundImage}
                            >
                                <View style={styles.overlay}>
                                    <Animated.Text style={[styles.title, getTextStyle(index)]}>
                                        {image.title}
                                    </Animated.Text>
                                </View>
                            </ImageBackground>
                        </View>
                    ))}
                </Animated.View>
            </PanGestureHandler>

            {/* Pagination Dots */}
            <View style={styles.pagination}>
                {images.map((_, index) => {
                    const dotStyle = useAnimatedStyle(() => ({
                        width: currentIndex.value === index ? 20 : 10,
                        backgroundColor:
                            currentIndex.value === index ? '#FF5673' : '#aaa',
                    }));
                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={() => goToImage(index)}
                        >
                            <Animated.View style={[styles.dot, dotStyle]} />
                        </TouchableOpacity>
                    );
                })}
            </View>

            {/* Skip Button */}
            <TouchableOpacity style={styles.skipButton} onPress={skipOnboarding}>
                <Text style={styles.skipButtonText}>Skip</Text>
            </TouchableOpacity>

            {/* Continue Button */}
            <TouchableOpacity style={styles.button} onPress={swipeToNext}>
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Onboarding;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    swiperContainer: {
        flexDirection: 'row',
        width: width * images.length,
        height: '100%',
    },
    imageContainer: {
        width,
        height: '100%',
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
        textAlign: 'center',
    },
    pagination: {
        position: 'absolute',
        bottom: 120,
        flexDirection: 'row',
        alignSelf: 'center',
    },
    dot: {
        height: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    skipButton: {
        position: 'absolute',
        top: 50,
        right: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 15,
    },
    skipButtonText: {
        color: '#FF5673',
        fontWeight: 'bold',
    },
    button: {
        position: 'absolute',
        bottom: 50,
        alignSelf: 'center',
        backgroundColor: '#FF5673',
        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
});
