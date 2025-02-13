import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
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

const WritingScreen: FC = () => {
  const token = useSelector((state: RootState) => state.users.token);
  const [listeningList, setListeningList] = useState([]);
  const { data, loading, error } = useQuery(GET_ALL_TUTORIALS_QUERY, {
    context: {
      uri: 'http://3.27.192.76:4001/graphql', // Set the dynamic link
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const navigation = useNavigation();

  useEffect(() => {
    if (data !== undefined && loading === false) {
      const listeningTutorials = data?.getAllTutorials?.filter(
        item => item.category === 'WRITING',
      );
      setListeningList(listeningTutorials);
    }
  }, [data, loading]);

  const renderItem = ({ item }: { item: any }) => (
    <>
      <Card style={styles.card}>
        <View style={styles.cardStyle}>
          <Image
            source={{ uri: item.image }}
            style={styles.imageBackground}></Image>
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
    </>
  );

  return (
    <View>
      <Spinner
        visible={loading}
        textContent={' Loading...'}
        color={colors.white}
        textStyle={{ color: colors.white }}
      />

      <View style={styles.headerView}>
        <View style={styles.headericonAndText}>
          <View style={styles.headerMainIconPosition}>
            <FontAwesome5 name="headset" size={60} color="#fff" />
          </View>
          <Text style={styles.activityNameText}>WRITING</Text>
        </View>

        <View style={styles.headerTextPosition}>
          <Text style={styles.headerTextStyle}>IELTS Daily Writing</Text>
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
        contentContainerStyle={{ paddingBottom: 180 }} // Add extra padding here
      />
    </View>
  );
};

export default WritingScreen;
