import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Video from 'react-native-video';
import {Card, IconButton, Button, Avatar} from 'react-native-paper';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import {colors} from '@/theme/colors';

const VideoPlayerScreen = ({route}: {route: any}) => {
  const {videoUrl, title, description} = route.params;

  const navigation = useNavigation();

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
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        {/* <Avatar.Icon size={40} icon="video" /> */}
        <Text style={styles.title}>{title}</Text>
      </View>

      {/* Video Section with Skeleton Loader */}
      <Card style={styles.card}>
        {isLoading && (
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item
              width="100%"
              height={300}
              borderRadius={10}
            />
          </SkeletonPlaceholder>
        )}
        <Video
          source={{uri: videoUrl}}
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
          <Text style={styles.likeAndDislikeText}>{likeCount} Likes</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDislike} style={styles.actionButton}>
          <IconButton icon="thumb-down" size={24} />
          <Text style={styles.likeAndDislikeText}>{dislikeCount} Dislikes</Text>
        </TouchableOpacity>
      </View>

      {/* Comment Section */}
      <View style={styles.commentSection}>
        <Text style={styles.commentTitle}>Comments</Text>
        <TextInput
          value={comment}
          onChangeText={setComment}
          placeholder="Add a comment"
          placeholderTextColor={'#888888'}
          style={styles.commentInput}
        />
        <Button
          mode="contained"
          onPress={handleAddComment}
          style={styles.addCommentButton}>
          Add Comment
        </Button>
        <FlatList
          data={comments}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <View style={styles.commentItem}>
              <Avatar.Text size={30} label={item.charAt(0).toUpperCase()} />
              <Text style={styles.commentText}>{item}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default VideoPlayerScreen;
