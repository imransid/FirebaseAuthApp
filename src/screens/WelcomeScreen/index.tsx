import React, { useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import { Text } from "react-native-paper";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    Easing,
    interpolate,
    Extrapolate,
} from "react-native-reanimated";

// Screen dimensions
const { width, height } = Dimensions.get("window");

// Images
const Image1 = require("../../assets/images/1.jpeg");
const Image2 = require("../../assets/images/2.jpeg");
const Image3 = require("../../assets/images/3.jpeg");
const Image4 = require("../../assets/images/4.jpg");

const images = [
    { id: 1, uri: Image1, title: "Innovate Your Design with Cutting-Edge Imagery" },
    { id: 2, uri: Image2, title: "Transform Your UI with Future-Ready Visuals" },
    { id: 3, uri: Image3, title: "Optimize Your Workflow with Intelligent Visuals" },
    { id: 4, uri: Image4, title: "A new world awaits not in distant lands, but in the vision we dare to create today." },
];

const AnimatedImageCarousel = () => {
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [displayedTitle, setDisplayedTitle] = useState(""); // For typewriter effect
    const [titleIndex, setTitleIndex] = useState(0); // To track the character being typed
    const translateX = useSharedValue(0);
    const opacity = useSharedValue(1);
    const scale = useSharedValue(1);
    const textOpacity = useSharedValue(0);
    const shake = useSharedValue(0); // For shake effect
    const backgroundColor = useSharedValue("transparent"); // For background color change

    // Create the typewriter effect
    useEffect(() => {
        const title = images[activeImageIndex]?.title || "";
        const interval = setInterval(() => {
            if (titleIndex < title.length) {
                setDisplayedTitle((prev) => prev + title[titleIndex]);
                setTitleIndex((prev) => prev + 1);
            } else {
                clearInterval(interval); // Stop when all characters are displayed
            }
        }, 100); // Adjust the speed here

        return () => clearInterval(interval); // Cleanup on component unmount
    }, [titleIndex, activeImageIndex]);

    // Reset title and typewriter effect when the active image changes
    useEffect(() => {
        setDisplayedTitle(""); // Reset displayed title
        setTitleIndex(0); // Reset title index
    }, [activeImageIndex]);

    // Trigger the shake effect when the title changes
    useEffect(() => {
        shake.value = withTiming(10, { duration: 100, easing: Easing.bounce }, () => {
            shake.value = withTiming(-10, { duration: 100, easing: Easing.bounce }, () => {
                shake.value = withTiming(0, { duration: 100, easing: Easing.bounce });
            });
        });
    }, [activeImageIndex]);

    const handleScroll = (event) => {
        const scrollX = event.nativeEvent.contentOffset.x;
        const focusIndex = Math.round(scrollX / 150);
        if (focusIndex !== activeImageIndex) {
            setActiveImageIndex(focusIndex);
            translateX.value = withTiming(-width * focusIndex, {
                duration: 800,
                easing: Easing.out(Easing.exp),
            });
            opacity.value = 0;
            scale.value = 1.2;
            textOpacity.value = withTiming(0, { duration: 300 });
            backgroundColor.value = withTiming(
                images[focusIndex].uri === Image1
                    ? "#FF6347"
                    : images[focusIndex].uri === Image2
                        ? "#32CD32"
                        : images[focusIndex].uri === Image3
                            ? "#1E90FF"
                            : "#FFD700",
                { duration: 500 }
            );

            setTimeout(() => {
                opacity.value = withTiming(1, { duration: 500 });
                scale.value = withTiming(1, { duration: 500 });
                textOpacity.value = withTiming(1, { duration: 500 });
            }, 300);
        }
    };

    // Animated style for the background image transition
    const animatedBackgroundStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    const animatedBackgroundColorStyle = useAnimatedStyle(() => ({
        backgroundColor: backgroundColor.value,
    }));

    const animatedImageStyle = useAnimatedStyle(() => ({
        opacity: interpolate(opacity.value, [0, 1], [0.5, 1], Extrapolate.CLAMP),
        transform: [{ scale: interpolate(scale.value, [1, 1.2], [1, 1.2], Extrapolate.CLAMP) }],
    }));

    const animatedTextStyle = useAnimatedStyle(() => ({
        opacity: textOpacity.value,
    }));

    const animatedShakeStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: shake.value }],
    }));

    return (
        <View style={styles.container}>
            <Animated.View
                style={[styles.carousel, animatedBackgroundStyle, animatedBackgroundColorStyle]}
            >
                {images.map((image) => (
                    <Animated.Image
                        key={image.id}
                        source={image.uri}
                        style={[styles.image, animatedImageStyle]}
                        resizeMode="cover"
                    />
                ))}
            </Animated.View>

            {/* Title Text with Typewriter and Shake effect */}
            <Animated.View style={[animatedTextStyle, animatedShakeStyle]}>
                <Text style={styles.title}>{displayedTitle}</Text>
            </Animated.View>

            {/* Scrollable Thumbnail Navigation */}
            <View style={styles.thumbnailNavigation}>
                <ScrollView
                    horizontal
                    contentContainerStyle={[
                        styles.thumbnailContainer,
                        { paddingRight: width / 2 - 75 },
                    ]}
                    showsHorizontalScrollIndicator={false}
                    decelerationRate="fast"
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                >
                    {images.map((image, index) => (
                        <TouchableOpacity
                            key={image.id}
                            style={styles.thumbnailButton}
                        >
                            <Animated.Image
                                source={image.uri}
                                style={[
                                    styles.thumbnailImage,
                                    index === activeImageIndex && styles.activeThumbnailImage,
                                ]}
                            />
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        justifyContent: "center",
        alignItems: "center",
    },
    carousel: {
        flexDirection: "row",
        width: "100%",
        height: height,
        position: "absolute",
    },
    image: {
        width: width,
        height: height,
    },
    title: {
        color: "#FFF",
        fontSize: 17,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        paddingHorizontal: 20,
        zIndex: 1,
    },
    thumbnailNavigation: {
        position: "absolute",
        bottom: 10,
        zIndex: 1,
        alignItems: "center",
    },
    thumbnailContainer: {
        flexDirection: "row",
        paddingHorizontal: 20,
    },
    thumbnailButton: {
        marginHorizontal: 5,
    },
    thumbnailImage: {
        width: 150,
        height: 150,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#FFF",
    },
    activeThumbnailImage: {
        borderColor: "#FF5252",
    },
});

export default AnimatedImageCarousel;

