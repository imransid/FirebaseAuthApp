import React from 'react';
import {FC} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from './style';
import {Card, Paragraph, Title} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';

const listData = [
  {
    title: 'Listening Section 1',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7Y3mCIL-rKwmc220gblo52lpAjbKv46kO48gSssh3PXRJA9zPq-bILOOA4rhoVqXJSeE&usqp=CAU',
    date: '2024-12-01',
    videoUrl:
      'https://drive.google.com/uc?export=download&id=1g4hA4JXIsJnKWaNVLCbK21PnyD46URoO',
    description: 'Introduction to basic listening skills and exercises.',
  },
  {
    title: 'Listening Section 2',
    image: 'https://careersgyan.com/wp-content/uploads/2021/12/articles-04.jpg',
    date: '2024-12-02',
    videoUrl:
      'https://drive.google.com/uc?export=download&id=1g4hA4JXIsJnKWaNVLCbK21PnyD46URoO',
    description:
      'Understanding key details and identifying main ideas in conversations.',
  },
  {
    title: 'Listening Section 3',
    image: 'https://careersgyan.com/wp-content/uploads/2021/12/articles-04.jpg',
    date: '2024-12-03',
    videoUrl:
      'https://drive.google.com/uc?export=download&id=1g4hA4JXIsJnKWaNVLCbK21PnyD46URoO',
    description: 'Recognizing tone, context, and speaker intent.',
  },
  {
    title: 'Listening Section 4',
    image:
      'https://careersgyan.com/wp-content/uploads/2021/12/articles-03-346x188.jpg',
    date: '2024-12-04',
    videoUrl:
      'https://drive.google.com/uc?export=download&id=1g4hA4JXIsJnKWaNVLCbK21PnyD46URoO',
    description: 'Advanced listening strategies for academic lectures.',
  },
  {
    title: 'Listening Section 5',
    image: 'https://careersgyan.com/wp-content/uploads/2021/12/articles-04.jpg',
    date: '2024-12-05',
    videoUrl:
      'https://drive.google.com/uc?export=download&id=1g4hA4JXIsJnKWaNVLCbK21PnyD46URoO',
    description:
      'Practicing listening comprehension through real-world examples.',
  },
];

const ListeningScreen: FC = () => {
  const navigation = useNavigation();

  const renderItem = ({item}: {item: (typeof listData)[0]}) => (
    <>
      <Card style={styles.card}>
        <View style={styles.cardStyle}>
          <Image
            source={{uri: item.image}}
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
      <View style={styles.headerView}>
        <View style={styles.headericonAndText}>
          <View style={styles.headerMainIconPosition}>
            <FontAwesome5 name="headset" size={60} color="#fff" />
          </View>
          <Text style={styles.activityNameText}>LISTENING</Text>
        </View>
        <View style={styles.headerTextPosition}>
          <Text style={styles.headerTextStyle}>IELTS Daily Listening</Text>
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
        data={listData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{paddingBottom: 180}} // Add extra padding here
      />
    </View>
  );
};

export default ListeningScreen;
