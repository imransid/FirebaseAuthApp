import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './style';
import { useNavigation } from '@react-navigation/native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import Entypo from 'react-native-vector-icons/Entypo';
import { colors } from '@/theme/colors';
import LinearGradient from 'react-native-linear-gradient';
import Spinner from 'react-native-loading-spinner-overlay';
import { GET_A_USER_QUERY, GET_ALL_USERS_QUERY } from '../../query/getAuser.query';
import { useMutation, useQuery } from '@apollo/client';
import { Modal, Portal, Button, DataTable, Checkbox, TextInput, Title, Menu } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import ToastPopUp from '@/utils/Toast.android';
import { CREATE_TUTORIAL_MUTATION } from '@/mutation/createTutorial.mutation';
import client, { tutorialLink } from '@/utils/apolloClient';


const MainScreen: FC = () => {
  const navigation = useNavigation();
  const [selectedUsers, setSelectedUsers] = useState<{ [key: string]: boolean }>({});
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);

  //getAllUsers
  const token = useSelector((state: RootState) => state.users.token)

  const [visible, setVisible] = useState(false);
  const [tutorialModalVisible, setTutorialModalVisible] = useState(false);
  const [tutorialData, setTutorialData] = useState({
    title: '',
    image: 'https://www.shutterstock.com/image-photo/graduation-cap-earth-globe-concept-260nw-2349898783.jpg',
    videoUrl: 'https://drive.google.com/file/d/1tz6SGcsPYJQrYIhqRWlCTnoDPxhR4vdN/view?usp=drive_link',
    category: '',
    description: '',
  });

  const { data, loading, error } = useQuery(GET_A_USER_QUERY, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const { data: Users, loading: usersLoading } = useQuery(GET_ALL_USERS_QUERY, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  useEffect(() => {

    if (data !== undefined && loading === false) {
      setUser(data.getAUser)
    }

    if (Users !== undefined && usersLoading === false) {
      setUsers(Users.getAllUsers)
    }

  }, [data, loading, Users])



  const handleEdit = (userId: string) => {
    console.log(`Edit user with ID: ${userId}`);
    // Implement the edit functionality here
  };

  const handleDelete = (userId: string) => {
    console.log(`Delete user with ID: ${userId}`);
    // Implement the delete functionality here
  };

  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);


  const showTutorialModal = () => setTutorialModalVisible(true);
  const hideTutorialModal = () => setTutorialModalVisible(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handleCheckboxChange = (userId: string, value: boolean) => {
    setSelectedUsers((prev) => ({
      ...prev,
      [userId]: value,
    }));
    console.log(`User with ID: ${userId} approved: ${value}`);
  };



  const handleCreateTutorial = async () => {
    client.setLink(tutorialLink); // Set to tutorial endpoint
    try {
      // Pass tutorialData as createTutorialInput in variables
      const { data } = await client.mutate({
        mutation: CREATE_TUTORIAL_MUTATION,
        variables: {
          createTutorialInput: tutorialData,
        },
        context: {
          headers: {
            Authorization: `Bearer ${token}`, // Add token here as well
          },
        },
      });

      // Close the modal after successful tutorial creation
      hideTutorialModal(); // Assuming closeModal is the function that closes the modal

      // Show success message (using a simple alert, you can replace it with a toast or modal message)
      ToastPopUp('Tutorial created successfully!');

      // Optionally, reset tutorialData if needed for form reset
      // setTutorialData(initialTutorialData); 
    } catch (error) {
      console.error('Error creating tutorial:', error);
      hideTutorialModal();
      // Handle error (You could also show an error message to the user)
      ToastPopUp('Failed to create tutorial. Please try again.');
    }
  };


  const fetchTutorials = async () => {
    // const query = `
    //   query GetAllTutorials {
    //     getAllTutorials {
    //       id
    //       title
    //       image
    //       videoUrl
    //       category
    //       description
    //       like
    //       dislike
    //     }
    //   }
    // `;

    // const response = await fetch('http://3.26.192.7:4001/graphql', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${token}`,
    //   },
    //   body: JSON.stringify({ query }),
    // });

    // console.log('response', response)

    // if (!response.ok) {
    //   throw new Error(`HTTP error! status: ${response.status}`);
    // }

    // const result = await response.json();
    return [];//result.data.getAllTutorials;
  };


  const handleListening = async () => {

    let tutorial = await fetchTutorials()


    // // // Assuming 'tutorial' contains the data fetched from the GraphQL query
    // const listeningTutorials = tutorial?.filter(item => item.category === 'Listening');

    // // Pass the filtered data to the 'ListeningScreen' via navigation
    navigation.navigate('ListeningScreen' as never);

  }

  const handleReading = async () => {

    let tutorial = await fetchTutorials()


    // // Assuming 'tutorial' contains the data fetched from the GraphQL query
    const ReadingTutorials = tutorial?.filter(item => item.category === 'Reading');

    // // Pass the filtered data to the 'ListeningScreen' via navigation
    navigation.navigate('ReadingScreen' as never, { tutorials: ReadingTutorials } as never);

  }


  const handleSpeaking = async () => {

    let tutorial = await fetchTutorials()


    // // Assuming 'tutorial' contains the data fetched from the GraphQL query
    const SpokingTutorials = tutorial?.filter(item => item.category === 'Spoking');

    // // Pass the filtered data to the 'ListeningScreen' via navigation
    navigation.navigate('SpeakingScreen' as never, { tutorials: SpokingTutorials } as never);

  }
  const handleWriting = async () => {

    let tutorial = await fetchTutorials()


    // // Assuming 'tutorial' contains the data fetched from the GraphQL query
    const listeningTutorials = tutorial?.filter(item => item.category === 'Listening');

    // // Pass the filtered data to the 'ListeningScreen' via navigation
    navigation.navigate('WritingScreen' as never, { tutorials: listeningTutorials } as never);

  }


  return (
    <>

      <Spinner
        visible={loading || usersLoading}
        textContent={' Loading...'}
        color={colors.white}
        textStyle={{ color: colors.white }}
      />

      {/* Add Tutorial Modal */}
      <Portal>
        <Modal visible={tutorialModalVisible} onDismiss={hideTutorialModal} contentContainerStyle={styles.modalContainer}>

          <Title>Add Tutorial</Title>
          <View style={styles.modalContent}>
            <TextInput
              label="Title"
              value={tutorialData.title}
              onChangeText={(text) => setTutorialData({ ...tutorialData, title: text })}
            />
            <TextInput
              label="Image URL"
              value={tutorialData.image}
              onChangeText={(text) => setTutorialData({ ...tutorialData, image: text })}
            />
            <TextInput
              label="Video URL"
              value={tutorialData.videoUrl}
              onChangeText={(text) => setTutorialData({ ...tutorialData, videoUrl: text })}
            />

            <Menu
              visible={menuVisible}
              onDismiss={closeMenu}
              anchor={
                <Button onPress={openMenu}>
                  {tutorialData.category || 'Select Category'}
                </Button>
              }
            >
              {['LISTENING', 'READING', 'WRITING', 'SPEAKING'].map((item) => (
                <Menu.Item
                  key={item}
                  onPress={() => {
                    setTutorialData({ ...tutorialData, category: item });
                    closeMenu();
                  }}
                  title={item}
                />
              ))}
            </Menu>
            <TextInput
              label="Description"
              value={tutorialData.description}
              onChangeText={(text) => setTutorialData({ ...tutorialData, description: text })}
            />
            <Button onPress={handleCreateTutorial}>Add Tutorial</Button>
          </View>
          <Button onPress={hideTutorialModal} style={styles.closeButton}>Close</Button>
        </Modal>
      </Portal>

      {/* user */}

      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
          <Text style={styles.modalTitle}>User List</Text>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Name</DataTable.Title>
              <DataTable.Title>Email</DataTable.Title>
              <DataTable.Title>Role</DataTable.Title>
              <DataTable.Title>Actions</DataTable.Title>
              <DataTable.Title>Approve Status</DataTable.Title>
            </DataTable.Header>
            {users?.map((user: any) => (
              <DataTable.Row key={user?.id}>
                <DataTable.Cell>{user?.firstName}</DataTable.Cell>
                <DataTable.Cell>{user?.email}</DataTable.Cell>
                <DataTable.Cell>{user?.role}</DataTable.Cell>
                <DataTable.Cell>
                  <Button onPress={() => handleDelete(user.id)}>Delete</Button>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Checkbox
                    status={selectedUsers[user.id] ? 'checked' : 'unchecked'}
                    onPress={() => handleCheckboxChange(user?.id, !selectedUsers[user?.id])}
                  />
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
          <Button onPress={hideModal} style={styles.closeButton}>Close</Button>
        </Modal>
      </Portal>

      <View style={styles.header}>
        <View style={styles.headerChipProperties}>
          <TouchableOpacity disabled={user?.role === 'admin' ? false : true} onPress={showModal} style={styles.userNameChip}>
            <Text style={styles.userNameText}>{user?.firstName}</Text>
          </TouchableOpacity>
          <View style={styles.notificationAndSettingsProperties}>
            <View style={styles.notificationAndSettings}>
              <TouchableOpacity style={styles.notificationChip}>
                <MaterialCommunityIcons
                  name="bell"
                  size={25}
                  color={colors.userNameTextColor}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.settingsChip}
                onPress={() => navigation.navigate('Settings' as never)}>
                <Ionicons
                  name="settings"
                  size={25}
                  color={colors.userNameTextColor}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.topCardPosition}>
        <TouchableOpacity style={styles.topCard} disabled={user?.role === 'admin' ? false : true} onPress={showTutorialModal} >
          <LinearGradient
            colors={['#f57c00', '#FF5252', '#ad1457', '#7d3c98', '#00695c']}
            start={{ x: 0, y: 0 }} // Starting point of the gradient (left side)
            end={{ x: 1, y: 0 }} // Ending point of the gradient (right side)
            style={styles.topCard}>
            <Text style={styles.topCardText1}>{user.role === 'admin' ? "Add Tutorial" : "Full Video Package"}</Text>
            <Text style={styles.topCardText2}>
              - including 1x bonus feedback
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View style={styles.firstChipsPosition}>
        <View style={styles.chipPosition}>
          <TouchableOpacity
            style={styles.speakingChipProperties}
            onPress={() => handleSpeaking()}>
            <View style={styles.chipShadeInsideProperties}>
              <View style={styles.chipItems}>
                <View style={styles.chipInside}>
                  <MaterialCommunityIcons
                    name="microphone"
                    size={28}
                    color={colors.white}
                  />
                  <Text style={styles.chipText}>Speaking</Text>
                </View>
                <Text style={styles.chipSecondText}>with teacher</Text>
                <Text style={styles.chipSecondText}>feedback</Text>
              </View>
              <View style={styles.chipShadePosition}>
                <View style={styles.chipShadeStyle}>
                  <Entypo name="chevron-right" size={20} color={colors.white} />
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.writingChipProperties}
            onPress={() => handleWriting()}>
            <View style={styles.chipShadeInsideProperties}>
              <View style={styles.chipItems}>
                <View style={styles.chipInside}>
                  <MaterialCommunityIcons
                    name="pencil"
                    size={25}
                    color={colors.white}
                  />
                  <Text style={styles.chipText}>Writing</Text>
                </View>
                <Text style={styles.chipSecondText}>with teacher</Text>
                <Text style={styles.chipSecondText}>feedback</Text>
              </View>
              <View style={styles.writingAndReadingShade}>
                <View style={styles.chipShadePosition}>
                  <View style={styles.chipShadeStyle}>
                    <Entypo
                      name="chevron-right"
                      size={20}
                      color={colors.white}
                    />
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.secondChipsPosition}>
        <View style={styles.chipPosition}>
          <TouchableOpacity
            style={styles.listeningChipProperties}
            onPress={() => handleListening()}>
            <View style={styles.chipShadeInsideProperties}>
              <View style={styles.chipItems}>
                <View style={styles.chipInside}>
                  <MaterialIcons
                    name="headset"
                    size={25}
                    color={colors.white}
                  />
                  <Text style={styles.chipText}>Listening</Text>
                </View>
                <Text style={styles.chipSecondText}>with instant</Text>
                <Text style={styles.chipSecondText}>feedback</Text>
              </View>
              <View style={styles.listeningShadePosition}>
                <View style={styles.chipShadePosition}>
                  <View style={styles.chipShadeStyle}>
                    <Entypo
                      name="chevron-right"
                      size={20}
                      color={colors.white}
                    />
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.readingChipProperties}
            onPress={() => handleReading()}>
            <View style={styles.chipShadeInsideProperties}>
              <View style={styles.chipItems}>
                <View style={styles.chipInside}>
                  <Foundation
                    name="book-bookmark"
                    size={26}
                    color={colors.white}
                  />
                  <Text style={styles.chipText}>Reading</Text>
                </View>
                <Text style={styles.chipSecondText}>with instant</Text>
                <Text style={styles.chipSecondText}>feedback</Text>
              </View>
              <View style={styles.writingAndReadingShade}>
                <View style={styles.chipShadePosition}>
                  <View style={styles.chipShadeStyle}>
                    <Entypo
                      name="chevron-right"
                      size={20}
                      color={colors.white}
                    />
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default MainScreen;
