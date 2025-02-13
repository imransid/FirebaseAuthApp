import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
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
import {
  GET_A_USER_QUERY,
  GET_ALL_USERS_QUERY,
} from '../../query/getAuser.query';
import { useMutation, useQuery } from '@apollo/client';
import {
  Modal,
  Portal,
  Button,
  DataTable,
  Checkbox,
  TextInput,
  Title,
  Menu,
} from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import ToastPopUp from '@/utils/Toast.android';
import { CREATE_TUTORIAL_MUTATION } from '@/mutation/createTutorial.mutation';
import client, { tutorialLink } from '@/utils/apolloClient';
import {
  UPDATE_PROFILE_MUTATION,
  DELETE_USER_MUTATION,
} from '@/mutation/updateProfile.mutations';
import axios from 'axios';

const MainScreen: FC = () => {
  const navigation = useNavigation();
  const [selectedUsers, setSelectedUsers] = useState<{ [key: string]: boolean }>(
    {},
  );
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);

  //getAllUsers
  const token = useSelector((state: RootState) => state.users.token);

  const [visible, setVisible] = useState(false);
  const [tutorialModalVisible, setTutorialModalVisible] = useState(false);
  const [tutorialData, setTutorialData] = useState({
    title: '',
    image: '',
    videoUrl: '',
    category: '',
    description: '',
    source: 'drive',  // Default value for source
    mediaType: 'drive',  // Default mediaType value
    filename: 'tutorial-video.mp4',  // Default filename
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

  const [deleteUser] = useMutation(DELETE_USER_MUTATION, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`, // Pass the token
      },
    },
    onCompleted: () => {
      ToastPopUp('User deleted successfully!');
    },
    onError: error => {
      console.error('Error deleting user:', error);
      ToastPopUp('Failed to delete user. Please try again.');
    },
  });

  const [updateProfile] = useMutation(UPDATE_PROFILE_MUTATION, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`, // Pass the token
      },
    },
    onCompleted: data => {
      console.log('data', data);

      ToastPopUp(
        `Approval updated for ${data.updateUserApprovalStatus.firstName}!`,
      );
    },
    onError: error => {
      console.error('Error updating approval:', error);
      ToastPopUp('Failed to update approval. Please try again.');
    },
  });

  useEffect(() => {
    if (data !== undefined && loading === false) {
      setUser(data.getAUser);
    }

    if (Users !== undefined && usersLoading === false) {
      const filteredUsers = Users.getAllUsers.filter(
        user => user.role !== 'admin',
      );
      setUsers(filteredUsers);
    }
  }, [data, loading, Users]);

  const handleDelete = async (userId: string) => {
    Alert.alert(
      'Delete User', // Title
      'Are you sure you want to delete this user?', // Message
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Delete action canceled'),
          style: 'cancel', // Style for the cancel button
        },
        {
          text: 'OK',
          onPress: async () => {
            try {
              await deleteUser({
                variables: { id: parseInt(userId) },
              });
              console.log('User deleted successfully');
            } catch (error) {
              console.error('Error deleting user:', error);
            }
          },
        },
      ],
      { cancelable: false }, // Prevent dismissing the alert by tapping outside
    );
  };

  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const showTutorialModal = () => setTutorialModalVisible(true);
  const hideTutorialModal = () => setTutorialModalVisible(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const handleCheckboxChange = async (userId: string, value: boolean) => {
    setSelectedUsers(prev => ({
      ...prev,
      [userId]: value,
    }));

    // Call mutation to update approval status
    try {
      await updateProfile({
        variables: {
          approveStatus: value,
          id: parseInt(userId),
        },
      });
    } catch (error) {
      console.error('Error updating approval status:', error);
    }
  };

  const handleCreateTutorial = async () => {
    client.setLink(tutorialLink); // Set to tutorial endpoint
    try {


      const createTutorialMutation = `
      mutation CreateTutorial {
        createTutorial(
          createTutorialInput: {
            title: "${tutorialData.title}"
            image: "${tutorialData.image}"
            videoUrl: "${tutorialData.videoUrl}"
            category: "${tutorialData.category}"
            description: "${tutorialData.description}"
            like: ${0}
            dislike: ${0}
            source: "${tutorialData.source}"
            mediaType: "${tutorialData.mediaType}"
            filename: "${tutorialData.filename}"
          }
        ) {
          image
          title
          mediaType
          source
          description
          category
          filename
          id
          videoUrl
          like
          dislike
        }
      }
    `;


      const response = await axios.post(
        'http://3.27.192.76:4001/graphql',
        {
          query: createTutorialMutation
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Your token here
          }
        }
      );

      // Handle response data
      const { data } = response;
      if (data && data.data.createTutorial) {
        console.log('Tutorial created successfully:', data.data.createTutorial);
        // Optionally, show a success message or handle further UI actions
      } else {
        console.log('Failed to create tutorial', data.errors);
      }

      // const { data } = await client.mutate({
      //   mutation: CREATE_TUTORIAL_MUTATION,
      //   variables: {
      //     createTutorialInput: {
      //       ...tutorialData,
      //       source: 'drive',  // Example value for source
      //       mediaType: 'video',  // Example value for mediaType (change as per your requirement)
      //       filename: 'tutorial-video.mp4',  // Example filename (change as per your requirement)
      //     },
      //   },
      //   context: {
      //     headers: {
      //       Authorization: `Bearer ${token}`, // Add token here as well
      //     },
      //   },
      // });

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

  const handleListening = async () => {
    navigation.navigate('ListeningScreen' as never);
  };

  const handleReading = async () => {
    navigation.navigate('ReadingScreen' as never);
  };

  const handleSpeaking = async () => {
    navigation.navigate('SpeakingScreen' as never);
  };
  const handleWriting = async () => {
    navigation.navigate('WritingScreen' as never);
  };

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
        <Modal
          visible={tutorialModalVisible}
          onDismiss={hideTutorialModal}
          contentContainerStyle={styles.modalContainer}>
          <Title>Add Tutorial</Title>
          <View style={styles.modalContent}>
            <TextInput
              label="Title"
              value={tutorialData.title}
              onChangeText={text =>
                setTutorialData({ ...tutorialData, title: text })
              }
            />
            <TextInput
              label="Image URL"
              value={tutorialData.image}
              onChangeText={text =>
                setTutorialData({ ...tutorialData, image: text })
              }
            />
            <TextInput
              label="Video URL"
              value={tutorialData.videoUrl}
              onChangeText={text =>
                setTutorialData({ ...tutorialData, videoUrl: text })
              }
            />

            <Menu
              visible={menuVisible}
              onDismiss={closeMenu}
              anchor={
                <Button onPress={openMenu}>
                  {tutorialData.category || 'Select Category'}
                </Button>
              }>
              {['LISTENING', 'READING', 'WRITING', 'SPEAKING'].map(item => (
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
              onChangeText={text =>
                setTutorialData({ ...tutorialData, description: text })
              }
            />
            <Button onPress={handleCreateTutorial}>Add Tutorial</Button>
          </View>
          <Button onPress={hideTutorialModal} style={styles.closeButton}>
            Close
          </Button>
        </Modal>
      </Portal>

      {/* user */}

      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modalContainer}>
          <Text style={styles.modalTitle}>Student List</Text>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Name</DataTable.Title>
              <DataTable.Title>Email</DataTable.Title>
              <DataTable.Title>Role</DataTable.Title>
              {/* <DataTable.Title>Actions</DataTable.Title> */}
              <DataTable.Title>Approve Status</DataTable.Title>
            </DataTable.Header>
            {users?.map((user: any) => (
              <DataTable.Row key={user?.id}>
                <DataTable.Cell>{user?.firstName}</DataTable.Cell>
                <DataTable.Cell>{user?.email}</DataTable.Cell>
                <DataTable.Cell>{user?.role}</DataTable.Cell>
                {/* <DataTable.Cell>
                  <TouchableOpacity onPress={() => handleDelete(user.id)}>
                    <MaterialCommunityIcons
                      name="account-off"
                      size={25}
                      color={colors.userDlt}
                    />
                  </TouchableOpacity>
                </DataTable.Cell> */}
                <DataTable.Cell>
                  <Checkbox
                    status={selectedUsers[user.id] ? 'checked' : 'unchecked'}
                    onPress={() =>
                      handleCheckboxChange(user?.id, !selectedUsers[user?.id])
                    }
                  />
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
          <Button onPress={hideModal} style={styles.closeButton}>
            Close
          </Button>
        </Modal>
      </Portal>

      <View style={styles.header}>
        <View style={styles.headerChipProperties}>
          <TouchableOpacity
            disabled={user?.role === 'admin' ? false : true}
            onPress={showModal}
            style={styles.userNameChip}>
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
        <TouchableOpacity
          style={styles.topCard}
          disabled={user?.role === 'admin' ? false : true}
          onPress={showTutorialModal}>
          <LinearGradient
            colors={['#f57c00', '#FF5252', '#ad1457', '#7d3c98', '#00695c']}
            start={{ x: 0, y: 0 }} // Starting point of the gradient (left side)
            end={{ x: 1, y: 0 }} // Ending point of the gradient (right side)
            style={styles.topCard}>
            <Text style={styles.topCardText1}>
              {user.role === 'admin'
                ? 'Add Tutorial'
                : 'Journey with Polock Bhai'}
            </Text>
            {/* <Text style={styles.topCardText2}>
              Journey with Polock Bhai
            </Text> */}
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <View style={{ height: 20, width: '100%' }}></View>

      <View style={styles.topCardPosition}>
        <TouchableOpacity
          style={styles.topCard}
          // disabled={user?.role === 'admin' ? false : true}
          onPress={() => navigation.navigate("IELTSWebView")}>
          <LinearGradient
            colors={['#ad1457', '#7d3c98', '#00695c', '#f57c00', '#FF5252']}
            start={{ x: 0, y: 0 }} // Starting point of the gradient (left side)
            end={{ x: 1, y: 0 }} // Ending point of the gradient (right side)
            style={styles.topCard}>
            <Text style={styles.topCardText1}>
              {'Mock Tour'}
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
