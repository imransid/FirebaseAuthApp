import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from './style';
import { Card, Paragraph, Title } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@apollo/client';
import Spinner from 'react-native-loading-spinner-overlay';
import { colors } from '@/theme/colors';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { GET_ALL_TUTORIALS_QUERY } from '@/query/getALLTutorial.query';
import moment from 'moment';

const ReadingScreen: FC = () => {
  const token = useSelector((state: RootState) => state.users.token);
  const [listeningList, setListeningList] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { data, loading, error } = useQuery(GET_ALL_TUTORIALS_QUERY, {
    context: {
      uri: 'http://54.179.177.128:4001/graphql', // Set the dynamic link
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const navigation = useNavigation();

  useEffect(() => {
    if (data !== undefined && loading === false) {
      const listeningTutorials = data?.getAllTutorials?.filter(
        item => item.category === 'READING',
      );
      setListeningList(listeningTutorials);
    }
  }, [data, loading]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refetch(); // Refetch data from the server
    } catch (error) {
      console.error('Error during refetch:', error);
    }
    setIsRefreshing(false);
  };

  const renderItem = ({ item }: { item: any }) => (
    <Card style={styles.card}>
      <View style={styles.cardStyle}>
        <Image source={{ uri: item.image }} style={styles.imageBackground} />
        <View style={styles.cardProperties}>
          <Title style={styles.titleText}>{item.title}</Title>
          <Paragraph style={styles.dateText}>
            Date: {moment(item.date).format('DD MMMM, YYYY')}
          </Paragraph>

          <Text style={styles.descriptionText}>{item.description}</Text>

          <TouchableOpacity
            style={styles.viewVideoButton}
            onPress={() =>
              navigation.navigate('VideoPlayer', {
                videoUrl: item.videoUrl,
                title: item.title,
                description: item.description,
              })
            }>
            <Text style={styles.viewVideoText}>View Video</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Card>
  );

  return (
    <View style={{ flex: 1 }}>
      <Spinner
        visible={loading}
        textContent="Loading..."
        color={colors.white}
        textStyle={{ color: colors.white }}
      />

      <View style={styles.headerView}>
        <View style={styles.headericonAndText}>
          <View style={styles.headerMainIconPosition}>
            <FontAwesome5 name="headset" size={60} color="#fff" />
          </View>
          <Text style={styles.activityNameText}>READING</Text>
        </View>

        <View style={styles.headerTextPosition}>
          <Text style={styles.headerTextStyle}>IELTS Daily Reading</Text>
        </View>

        <View style={styles.completedContainerPosition}>
          <View style={styles.completedContainer}>
            <View style={styles.completedContainerInside}>
              <View style={styles.completedContainerOuterRoundPosition}>
                <View style={styles.completedContainerOuterRound}>
                  <View style={styles.completedContainerInnerRound}>
                    <Text style={styles.completedPercentText}>0%</Text>
                  </View>
                </View>
              </View>
              <View style={styles.completedTextPosition}>
                <Text style={styles.completedText}>Completed</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <FlatList
        data={listeningList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }} // Reduced padding
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing} // Show refresh spinner
            onRefresh={handleRefresh} // Call refresh handler on pull-to-refresh
          />
        }
      />
    </View>
  );
};

export default ReadingScreen;
