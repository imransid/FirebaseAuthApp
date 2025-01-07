import React, {useEffect, useState} from 'react';
import {FC} from 'react';
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from './style';
import {Card, Paragraph, Title} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from '@apollo/client';
// import { GET_ALL_TUTORIALS_QUERY } from '@/query/getALLTutorial.query';
import Spinner from 'react-native-loading-spinner-overlay';
import {colors} from '@/theme/colors';
import {RootState} from '@/store';
import {useSelector} from 'react-redux';
import {GET_ALL_TUTORIALS_QUERY} from '@/query/getALLTutorial.query';

const WritingScreen: FC = () => {
  const token = useSelector((state: RootState) => state.users.token);
  const [listeningList, setListeningList] = useState([]);
  const {data, loading, error} = useQuery(GET_ALL_TUTORIALS_QUERY, {
    context: {
      uri: 'http://3.26.192.7:4001/graphql', // Set the dynamic link
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

  const renderItem = ({item}: {item: any}) => (
    <Card style={{margin: 10}}>
      <ImageBackground
        source={{uri: item.image}}
        style={styles.imageBackground}
        imageStyle={styles.imageStyle} // Optional: To customize the image styling
      >
        <Card.Content>
          <Title style={styles.titleText}>{item.title}</Title>
          <Paragraph style={styles.dateText}>Date: {item.createdAt}</Paragraph>
        </Card.Content>
      </ImageBackground>
      <Card.Content>
        <Paragraph>{item.description}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('VideoPlayer', {
              videoUrl: item.videoUrl,
              title: item.title,
              description: item.description,
              like: item.like,
              dislike: item.dislike,
              id: item.id,
            })
          }>
          <Text style={{color: '#007BFF', fontSize: 16}}>View Video</Text>
        </TouchableOpacity>
      </Card.Actions>
    </Card>
  );

  return (
    <View>
      <Spinner
        visible={loading}
        textContent={' Loading...'}
        color={colors.white}
        textStyle={{color: colors.white}}
      />

      <View style={styles.headerView}>
        <View style={styles.headericonAndText}>
          <View style={styles.headerMainIconPosition}>
            <FontAwesome5 name="headset" size={60} color="#fff" />
          </View>
          <Text style={styles.activityNameText}>WRITING</Text>
        </View>

        <View style={{left: 270, bottom: 60}}>
          <View
            style={{
              height: 54,
              width: 200,
              backgroundColor: '#ffffff40',
              borderRadius: 50,
            }}>
            <View style={{marginTop: 2}}>
              <View
                style={{
                  height: 50,
                  width: 50,
                  backgroundColor: '#ffffff40',
                  borderRadius: 50,
                  alignItems: 'center',
                }}></View>
            </View>
          </View>
        </View>
      </View>

      <FlatList
        data={listeningList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{paddingBottom: 180}} // Add extra padding here
      />
    </View>
  );
};

export default WritingScreen;
