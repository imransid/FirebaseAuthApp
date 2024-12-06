import React, { useState, useEffect, useRef } from "react";
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
    { id: 1, uri: Image1, title: "Innovate Your Design" },
    { id: 2, uri: Image2, title: "Transform Your UI" },
    { id: 3, uri: Image3, title: "Optimize Your Workflow" },
    { id: 4, uri: Image4, title: "A new world awaits not in distant lands" },
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
    const scrollViewRef = useRef(null);

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


    // Animated style for thumbnails
    const animatedThumbnailStyle = (isActive) =>
        useAnimatedStyle(() => ({
            transform: [{ scale: withTiming(isActive ? 1.2 : 1, { duration: 300 }) }],
            marginLeft: withTiming(isActive ? 20 : 0, { duration: 300 }),
            marginRight: withTiming(isActive ? 20 : 0, { duration: 300 }),
        }));



    useEffect(() => {
        // Check if the full text is displayed
        const currentTitle = images[activeImageIndex]?.title || "";
        if (displayedTitle === currentTitle) {
            // Delay before auto-scrolling to the next image
            const timeout = setTimeout(() => {
                const nextIndex = (activeImageIndex + 1) % images.length; // Loop back to the first image
                setActiveImageIndex(nextIndex);

                // Update animations for the next image
                translateX.value = withTiming(-width * nextIndex, {
                    duration: 800,
                    easing: Easing.out(Easing.exp),
                });
                opacity.value = 0;
                scale.value = 1.2;
                textOpacity.value = withTiming(0, { duration: 300 });
                backgroundColor.value = withTiming(
                    images[nextIndex].uri === Image1
                        ? "#FF6347"
                        : images[nextIndex].uri === Image2
                            ? "#32CD32"
                            : images[nextIndex].uri === Image3
                                ? "#1E90FF"
                                : "#FFD700",
                    { duration: 500 }
                );

                setTimeout(() => {
                    opacity.value = withTiming(1, { duration: 500 });
                    scale.value = withTiming(1, { duration: 500 });
                    textOpacity.value = withTiming(1, { duration: 500 });
                }, 300);
            }, 2000); // Delay of 2 seconds after full text display

            return () => clearTimeout(timeout); // Cleanup timeout on unmount
        }
    }, [displayedTitle, activeImageIndex]);


    useEffect(() => {
        if (scrollViewRef.current) {
            // Scroll to the active thumbnail
            scrollViewRef.current.scrollTo({
                x: activeImageIndex * 160, // Adjust thumbnail size + margin
                animated: true,
            });
        }
    }, [activeImageIndex]);



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
                                    animatedThumbnailStyle(index === activeImageIndex),
                                    index === activeImageIndex && styles.activeThumbnailImage,
                                ]}
                            />
                        </TouchableOpacity>
                    ))}

                </ScrollView>
            </View>
            <View style={styles.bottomView}>
                <Animated.View style={[animatedTextStyle, animatedShakeStyle]}>
                    <Text style={styles.title}>{displayedTitle}</Text>
                </Animated.View>
                <View style={styles.pagination}>
                    {images.map((_, index) => {
                        // Animated style for dots
                        const dotStyle = useAnimatedStyle(() => ({
                            width: withTiming(activeImageIndex === index ? 20 : 10, { duration: 300 }),
                            backgroundColor: activeImageIndex === index ? '#FF5673' : '#aaa',
                        }));

                        return (
                            <Animated.View key={index} style={[styles.dot, dotStyle]} />
                        );
                    })}
                </View>
                <TouchableOpacity style={styles.button} >
                    <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
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
        bottom: 175,
        zIndex: 1,
        alignItems: "center",
    },
    thumbnailContainer: {
        flexDirection: "row",
        paddingHorizontal: 30,
        height: 200,
        alignItems: 'center'
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
    bottomView: {
        backgroundColor: 'black',
        height: 220,
        width: '100%',
        position: 'absolute', // Ensure it's positioned absolutely
        bottom: 0,
        paddingTop: 70
    },
    dot: {
        height: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    pagination: {
        flexDirection: 'row',
        alignSelf: 'center',
    },
    button: {
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e73553',
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 20,
        width: '100%',
        height: 46,
        marginTop: 15
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },

});

export default AnimatedImageCarousel;

