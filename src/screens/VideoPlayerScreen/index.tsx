import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import Video from 'react-native-video';
import { Card, IconButton, Button, Avatar } from 'react-native-paper';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const VideoPlayerScreen = ({ route }: { route: any }) => {
    const { videoUrl, title, description } = route.params;

    const [likeCount, setLikeCount] = useState(0);
    const [dislikeCount, setDislikeCount] = useState(0);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleLike = () => setLikeCount(likeCount + 1);
    const handleDislike = () => setDislikeCount(dislikeCount + 1);
    const handleAddComment = () => {
        if (comment.trim()) {
            setComments([...comments, comment.trim()]);
            setComment('');
        }
    };

    const handleVideoLoad = () => {
        setIsLoading(false);
    };

    return (
        <View style={styles.container}>
            {/* Top Header */}
            <View style={styles.header}>
                <Avatar.Icon size={40} icon="video" />
                <Text style={styles.title}>{title}</Text>
            </View>

            {/* Video Section with Skeleton Loader */}
            <Card style={styles.card}>
                {isLoading && (
                    <SkeletonPlaceholder>
                        <SkeletonPlaceholder.Item width="100%" height={300} borderRadius={10} />
                    </SkeletonPlaceholder>
                )}
                <Video
                    source={{ uri: videoUrl }}
                    style={isLoading ? styles.hidden : styles.video}
                    controls={true}
                    resizeMode="contain"
                    onLoad={handleVideoLoad} // Fires when video is loaded
                />
            </Card>

            {/* Bottom Description */}
            <View style={styles.descriptionSection}>
                <Text style={styles.description}>{description}</Text>
            </View>

            {/* Like & Dislike Section */}
            <View style={styles.actions}>
                <TouchableOpacity onPress={handleLike} style={styles.actionButton}>
                    <IconButton icon="thumb-up" size={24} />
                    <Text>{likeCount} Likes</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDislike} style={styles.actionButton}>
                    <IconButton icon="thumb-down" size={24} />
                    <Text>{dislikeCount} Dislikes</Text>
                </TouchableOpacity>
            </View>

            {/* Comment Section */}
            {/* <View style={styles.commentSection}>
                <Text style={styles.commentTitle}>Comments</Text>
                <TextInput
                    value={comment}
                    onChangeText={setComment}
                    placeholder="Add a comment"
                    style={styles.commentInput}
                />
                <Button mode="contained" onPress={handleAddComment} style={styles.addCommentButton}>
                    Add Comment
                </Button>
                <FlatList
                    data={comments}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.commentItem}>
                            <Avatar.Text size={30} label={item.charAt(0).toUpperCase()} />
                            <Text style={styles.commentText}>{item}</Text>
                        </View>
                    )}
                />
            </View> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#6200ee',
    },
    title: {
        fontSize: 18,
        color: '#fff',
        marginLeft: 10,
        fontWeight: 'bold',
    },
    card: {
        margin: 16,
        borderRadius: 10,
        overflow: 'hidden',
    },
    video: {
        width: '100%',
        height: 300,
    },
    hidden: {
        width: 0,
        height: 0,
    },
    descriptionSection: {
        paddingHorizontal: 16,
        paddingBottom: 8,
    },
    description: {
        fontSize: 16,
        color: '#333',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    commentSection: {
        flex: 1,
        padding: 16,
    },
    commentTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    commentInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    addCommentButton: {
        marginBottom: 16,
    },
    commentItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    commentText: {
        marginLeft: 10,
        fontSize: 16,
        color: '#333',
    },
});

export default VideoPlayerScreen;
