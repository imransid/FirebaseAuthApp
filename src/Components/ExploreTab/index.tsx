import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Animated, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image'; // For optimized image loading

interface ImageData {
    id: string;
    author: string;
    width: number;
    height: number;
    url: string;
    download_url: string;
}

const ExploreTab = () => {
    const [images, setImages] = useState<ImageData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [selectedImageDetails, setSelectedImageDetails] = useState<ImageData | null>(null);

    const scaleValue = useRef(new Animated.Value(1)).current; // Use useRef for scaling animation

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const res = await fetch('https://picsum.photos/v2/list?page=1&limit=30');
                if (!res.ok) throw new Error('Failed to fetch images');
                const data: ImageData[] = await res.json();
                setImages(data);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching images:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchImages();
    }, []);

    // Handle image click for zoom and details display
    const handleImageClick = (imageUrl: string, imageDetails: ImageData) => {
        setSelectedImage(imageUrl);
        setSelectedImageDetails(imageDetails);

        // Trigger the scaling animation
        Animated.spring(scaleValue, {
            toValue: 1.5, // Scale up
            useNativeDriver: true,
        }).start();
    };

    // Close the selected image view
    const handleClose = () => {
        setSelectedImage(null);
        setSelectedImageDetails(null);
        Animated.spring(scaleValue, {
            toValue: 1, // Reset the scale
            useNativeDriver: true,
        }).start();
    };

    // Memoize the render function for FlatList items to prevent unnecessary re-renders
    const renderExploreItem = useCallback(
        ({ item }: { item: ImageData }) => (
            <TouchableOpacity onPress={() => handleImageClick(item.download_url, item)}>
                <View style={styles.imageContainer}>
                    <FastImage
                        source={{ uri: item.download_url }}
                        style={styles.exploreImage}
                        resizeMode={FastImage.resizeMode.cover} // For better image fitting
                    />
                </View>
            </TouchableOpacity>
        ),
        []
    );

    // Optimized FlatList rendering
    const renderContent = () => {
        if (loading) {
            return <ActivityIndicator size="large" color="#0000ff" />;
        }

        if (error) {
            return <Text style={styles.errorText}>{error}</Text>;
        }

        return (
            <FlatList
                data={images}
                renderItem={renderExploreItem}
                keyExtractor={(item) => item.id} // Use id for keyExtractor to improve list performance
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.exploreList}
                initialNumToRender={5} // Number of items initially rendered
                maxToRenderPerBatch={10} // Maximum items to render in a batch
                windowSize={5}  // Render 5 batches in the viewport at once
                getItemLayout={(data, index) => ({ length: 120, offset: 120 * index, index })} // Improve scrolling performance
            />
        );
    };

    const renderSelectedImageDetails = () => {
        if (!selectedImage || !selectedImageDetails) return null;

        return (
            <Animated.View
                style={[styles.overlay, { transform: [{ scale: scaleValue }] }]}>
                <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
                    <Text style={styles.closeButtonText}>X</Text>
                </TouchableOpacity>
                <FastImage
                    source={{ uri: selectedImage }}
                    style={styles.selectedImage}
                    resizeMode={FastImage.resizeMode.contain}
                />

                <Text style={styles.imageDetailsText}>Author: {selectedImageDetails.author}</Text>
                <Text style={styles.imageDetailsText}>Width: {selectedImageDetails.width}</Text>
                <Text style={styles.imageDetailsText}>Height: {selectedImageDetails.height}</Text>
                <Text style={styles.imageDetailsText}>ID: {selectedImageDetails.id}</Text>
            </Animated.View>
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Explore</Text>
            {renderContent()}
            {renderSelectedImageDetails()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    exploreList: { marginBottom: 20 },
    imageContainer: {
        width: 120, // Fixed size for the image container
        height: 120, // Maintain a consistent height and width ratio
        marginRight: 10,
        borderRadius: 10,
        overflow: 'hidden', // Prevent image overflow
    },
    exploreImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10, // Optional: you can tweak this for rounded corners
    },
    errorText: {
        fontSize: 16,
        color: 'red',
        textAlign: 'center',
        marginTop: 20,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        zIndex: 1,
        padding: 20,
    },
    selectedImage: {
        width: 300,
        height: 300,
        borderRadius: 15,
        marginBottom: 20,
    },
    imageDetailsText: {
        color: 'white',
        fontSize: 16,
        marginVertical: 5,
        textAlign: 'center',
    },
    closeButton: {
        // position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: 20,
        padding: 10,
        color: 'rgba(109, 107, 107, 0.7)',
    },
    closeButtonText: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
    },
});

export default ExploreTab;
