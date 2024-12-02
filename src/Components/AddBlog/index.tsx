import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const AddBlog = ({ onSubmit }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleAddBlog = async () => {
        await firestore().collection('blogs').add({ title, content });
        onSubmit();
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={styles.input}
                placeholder="Content"
                value={content}
                onChangeText={setContent}
            />
            <Button title="Add Blog" onPress={handleAddBlog} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20 },
    input: { borderBottomWidth: 1, marginBottom: 10, padding: 8 },
});

export default AddBlog;
