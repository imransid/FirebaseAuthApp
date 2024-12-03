import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TextInput, TouchableOpacity, Alert, Dimensions } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Modal from 'react-native-modal';
import Animated, { Easing, withSpring, withTiming, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import ToastPopUp from '@/utils/Toast.android';

const { height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
    const [blogs, setBlogs] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [blogTitle, setBlogTitle] = useState('');
    const [blogContent, setBlogContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editBlogId, setEditBlogId] = useState(null);

    // Animated values for modal animation
    const translateY = useSharedValue(height); // Initially offscreen
    const opacity = useSharedValue(0); // Initially invisible

    // Animate modal when visible
    const modalStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: withSpring(translateY.value, { damping: 20, stiffness: 100 }) }],
            opacity: withTiming(opacity.value, { duration: 300 }),
        };
    });

    useEffect(() => {
        // Fetch Blogs from Firestore
        const unsubscribeBlogs = firestore()
            .collection('blogs')
            .onSnapshot((snapshot) => {
                const blogList = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setBlogs(blogList);
            });

        // Clean up subscription
        return () => unsubscribeBlogs();
    }, []);

    const handleSignOut = () => {
        auth().signOut().then(() => navigation.replace('SignIn'));
    };

    const handleAddOrEditBlog = async () => {
        if (!blogTitle || !blogContent) {
            Alert.alert('Error', 'Please fill in both title and content.');
            return;
        }

        try {
            setIsSubmitting(true); // Set to true to disable button

            if (editMode) {

                console.log('data', '< data >')
                // Edit existing blog
                const data = await firestore().collection('blogs').doc(editBlogId).update({
                    title: blogTitle,
                    content: blogContent,
                    updatedAt: firestore.FieldValue.serverTimestamp(),
                });

                console.log('data', data)

                ToastPopUp('Success.. Blog updated successfully!');
            } else {
                // Add new blog
                await firestore().collection('blogs').add({
                    title: blogTitle,
                    content: blogContent,
                    createdAt: firestore.FieldValue.serverTimestamp(),
                });
                ToastPopUp('Success.. Blog added successfully!');
            }

            // Reset form after successful submission
            setBlogTitle('');
            setBlogContent('');
            closeModal();
        } catch (error) {
            Alert.alert('Error', 'Something went wrong. Please try again later.');
        } finally {
            setIsSubmitting(false); // Set back to false to re-enable button
        }
    };

    const renderBlogItem = ({ item }) => (
        <View style={styles.blogItem}>
            <Text style={styles.blogTitle}>{item.title}</Text>
            <Text style={styles.blogContent}>{item.content}</Text>
            <TouchableOpacity
                onPress={() => openEditModal(item)}
                style={styles.editButton}
            >
                <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
        </View>
    );

    // Show modal with animation
    const openModal = () => {
        setModalVisible(true);
        setEditMode(false); // Reset to add mode
        translateY.value = 0; // Move the modal into view
        opacity.value = 1; // Fade in the modal
    };

    // Show edit modal with data
    const openEditModal = (blog) => {
        setModalVisible(true);
        setEditMode(true); // Switch to edit mode
        setEditBlogId(blog.id); // Set blog ID for editing
        setBlogTitle(blog.title); // Populate title
        setBlogContent(blog.content); // Populate content
        translateY.value = 0; // Move the modal into view
        opacity.value = 1; // Fade in the modal
    };

    // Hide modal with animation
    const closeModal = () => {
        translateY.value = height; // Move the modal offscreen
        opacity.value = 0; // Fade out the modal
        setTimeout(() => setModalVisible(false), 300); // Close after animation completes
        setBlogTitle(''); // Reset input fields
        setBlogContent('');
        setEditBlogId(null);
        setEditMode(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Welcome to Home!</Text>
            <View style={{ height: 10, width: '100%' }}></View>
            <Button title="Sign Out" color="red" onPress={handleSignOut} />
            <View style={{ height: 10, width: '100%' }}></View>
            <Button title="ExploreTab" color="green" onPress={() => navigation.navigate('ExploreTab')} />
            <View style={{ height: 10, width: '100%' }}></View>
            <Button title="Add Blog" onPress={openModal} />

            {/* Modal for adding or editing blog */}
            <Modal
                isVisible={modalVisible}
                onBackdropPress={closeModal}
                onBackButtonPress={closeModal}
                backdropOpacity={0.5}
                style={styles.modal}
            >
                <Animated.View style={[styles.modalContent, modalStyle]}>
                    <Text style={styles.modalHeader}>{editMode ? 'Edit Blog' : 'Add Blog'}</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Blog Title"
                        value={blogTitle}
                        onChangeText={setBlogTitle}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Blog Content"
                        value={blogContent}
                        onChangeText={setBlogContent}
                        multiline
                    />

                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={handleAddOrEditBlog}
                        disabled={isSubmitting}
                    >
                        <Text style={styles.buttonText}>{isSubmitting ? 'Submitting...' : 'Submit'}</Text>
                    </TouchableOpacity>
                </Animated.View>
            </Modal>

            {/* List of blogs */}
            <FlatList
                data={blogs}
                renderItem={renderBlogItem}
                keyExtractor={(item) => item.id}
                style={styles.blogList}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    blogList: { flex: 1, marginVertical: 10 },
    blogItem: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        padding: 15,
        marginVertical: 10,
    },
    blogTitle: { fontSize: 18, fontWeight: 'bold' },
    blogContent: { fontSize: 14, marginVertical: 10 },
    editButton: { backgroundColor: '#007BFF', padding: 10, borderRadius: 5 },
    buttonText: { color: '#fff', textAlign: 'center' },

    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        minHeight: 250,
    },
    modalHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
        paddingLeft: 10,
    },
    submitButton: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
});

export default HomeScreen;
