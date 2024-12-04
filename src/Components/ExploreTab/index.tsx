import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import Animated, { Easing, withRepeat, withSequence, withSpring, withTiming } from 'react-native-reanimated';
import {
    useNavigation,
} from '@react-navigation/native';
import BackIcon from '../../assets/svg/back';

// Skeleton Component with Reanimated for Instagram-like UI
const Skeleton = () => {
    // Define animation for skeleton fade effect
    const pulseAnim = withRepeat(
        withSequence(
            withTiming(1, { duration: 1000, easing: Easing.ease }), // Fade in
            withTiming(0.7, { duration: 1000, easing: Easing.ease }) // Fade out
        ),
        -1, // Infinite repeat
        1 // Repeat indefinitely
    );

    return (
        <View style={styles.skeletonContainer}>
            {/* Profile Image */}
            <Animated.View style={[styles.skeletonProfile, { opacity: pulseAnim }]} />

            {/* Username Skeleton */}
            <Animated.View style={[styles.skeletonText, { opacity: pulseAnim, width: '40%' }]} />

            {/* Image Skeleton */}
            <Animated.View style={[styles.skeletonImage, { opacity: pulseAnim }]} />

            {/* Caption Skeleton */}
            <Animated.View style={[styles.skeletonText, { opacity: pulseAnim, width: '60%' }]} />
        </View>
    );
};

const App = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const [numColumns, setNumColumns] = useState(1); // Control the number of columns

    const navigation = useNavigation();


    const fetchImages = async (newPage) => {
        try {
            const response = await fetch(`https://picsum.photos/v2/list?page=${newPage}&limit=10`);
            if (!response.ok) throw new Error('Failed to fetch images');
            const data = await response.json();
            setImages((prev) => (newPage === 1 ? data : [...prev, ...data]));
        } catch (error) {
            console.error('Error fetching images:', error);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    useEffect(() => {
        fetchImages(1);
    }, []);

    const handleLoadMore = () => {
        if (!loadingMore) {
            setLoadingMore(true);
            setPage((prev) => {
                const nextPage = prev + 1;
                fetchImages(nextPage);
                return nextPage;
            });
        }
    };

    const renderCapture = ({ item }) => (
        <View style={styles.imageContainer}>
            <Image source={{ uri: item.download_url }} style={styles.captureImage} />
        </View>
    );

    const renderFooter = () => {
        if (!loadingMore) return null;
        return <ActivityIndicator style={{ marginVertical: 16 }} size="large" color="#00aaff" />;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}><TouchableOpacity onPress={() => navigation.navigate("Home" as never)} ><BackIcon /></TouchableOpacity> Revisit your memories</Text>
            {loading ? (
                <FlatList
                    data={Array.from({ length: 6 })}
                    renderItem={({ index }) => <Skeleton key={index} />}
                    keyExtractor={(item, index) => index.toString()}
                />
            ) : (
                <FlatList
                    data={images}
                    renderItem={renderCapture}
                    keyExtractor={(item) => item.id}
                    numColumns={numColumns}
                    showsVerticalScrollIndicator={false}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={renderFooter}
                    key={numColumns} // Dynamically change key to force re-render
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    headerText: {
        fontSize: 18,
        color: '#000',
        marginBottom: 12,
    },
    skeletonContainer: {
        marginBottom: 16,
        marginTop: 10,
    },
    skeletonProfile: {
        width: 40,
        height: 40,
        borderRadius: 50,
        backgroundColor: '#ddd',
        marginBottom: 10,
    },
    skeletonImage: {
        width: '100%',
        height: 200,
        backgroundColor: '#ddd',
        borderRadius: 12,
        marginBottom: 10,
    },
    skeletonText: {
        height: 12,
        backgroundColor: '#ddd',
        marginBottom: 6,
        borderRadius: 4,
    },
    imageContainer: {
        marginBottom: 16,
    },
    captureImage: {
        width: '100%',
        height: 200,
        borderRadius: 12,
        marginBottom: 10,
    },
    username: {
        fontSize: 14,
        color: '#333',
        marginBottom: 4,
    },
    caption: {
        fontSize: 12,
        color: '#666',
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#302d2d',
        padding: 12,
        borderRadius: 12,
        position: 'absolute',
        bottom: 16,
        left: 16,
        right: 16,
    },
    addButton: {
        backgroundColor: '#00aaff',
        borderRadius: 50,
        padding: 12,
    },
});

export default App;