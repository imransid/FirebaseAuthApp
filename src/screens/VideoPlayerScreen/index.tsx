import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Video from 'react-native-video';
import {Card, IconButton} from 'react-native-paper';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './style';
import {useNavigation} from '@react-navigation/native';
import {UPDATE_TUTORIAL} from '@/mutation/updateTutorial.mutations';
import client, {tutorialLink} from '@/utils/apolloClient';
import {useSelector} from 'react-redux';
import {RootState} from '@/store';

const VideoPlayerScreen = ({route}: {route: any}) => {
  const {id, videoUrl, title, description, like, dislike} = route.params;

  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const token = useSelector((state: RootState) => state.users.token);

  const navigation = useNavigation();

  const handleLike = async () => {
    const newLikeCount = likeCount + 1;
    setLikeCount(newLikeCount);

    try {
      client.setLink(tutorialLink); // Set to tutorial endpoint

      if (id === null || id === undefined) {
        console.error('Error: id is null or undefined');
        return;
      }

      const {data} = await client.mutate({
        mutation: UPDATE_TUTORIAL,
        variables: {
          id: parseFloat(id), // Ensure id is a Float, if necessary
          like: newLikeCount, // Explicitly convert to Float
        },
        context: {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token
          },
        },
      });
      console.log('Updated likes:', data.updateTutorial.like);
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  };

  const handleDislike = async () => {
    const newDislikeCount = dislikeCount + 1;
    setDislikeCount(newDislikeCount);

    try {
      client.setLink(tutorialLink); // Set to tutorial endpoint
      const {data} = await client.mutate({
        mutation: UPDATE_TUTORIAL,
        variables: {
          id: parseFloat(id), // Ensure id is a Float, if necessary
          dislike: newDislikeCount, // Explicitly convert to Float
        },
        context: {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token
          },
        },
      });
      console.log('Updated dislikes:', data.updateTutorial.dislike);
    } catch (error) {
      console.error('Error updating dislikes:', error);
    }
  };

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
        <View style={styles.headerLeftIconPosition}>
          <TouchableOpacity
            style={styles.headerLeftIconBackground}
            onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
        </View>
        {/* <Avatar.Icon size={40} icon="video" /> */}

        <View style={styles.headerTitlePosition}>
          <Text style={styles.title}>{title}</Text>
        </View>
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
      {/* <View style={styles.commentSection}>
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
      </View> */}
    </View>
  );
};

export default VideoPlayerScreen;
