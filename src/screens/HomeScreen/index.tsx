import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Row} from 'react-native-easy-grid';
import firestore from '@react-native-firebase/firestore';
import {
  useSharedValue,
  withSpring,
  useAnimatedStyle,
} from 'react-native-reanimated'; // Import for animation
import PlusIcon from '../../../src/assets/svg/plus';
import moment from 'moment';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '@/navigation/AppNavigator';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import styles from './style';

// type HomeScreenNavigationProp = NativeStackNavigationProp<
//   RootStackParamList,
//   'HomeScreen'
// >;

// type HomeScreenRouteProp = RouteProp<RootStackParamList, 'HomeScreen'>;

const categories = [
  {id: 1, name: 'Speaking'},
  {id: 2, name: 'Writing'},
  {id: 3, name: 'Listening'},
  {id: 4, name: 'Reading'},
];

const App = () => {
  const [activeCategory, setActiveCategory] = useState('Technology');
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({
    title: '',
    description: '',
    videoURL: '',
    date: '',
    category: activeCategory,
  });
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false); // To handle editing mode
  const [selectedBlog, setSelectedBlog] = useState(null); // To store selected blog for editing
  const navigation = useNavigation();
  //const route = useRoute<HomeScreenRouteProp>();

  // Bottom sheet animation value
  const bottomSheetOffset = useSharedValue(-500);

  useEffect(() => {
    const unsubscribeBlogs = firestore()
      .collection('blogs')
      .onSnapshot(snapshot => {
        const blogList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBlogs(blogList);
      });

    return () => unsubscribeBlogs();
  }, []);

  const renderCategory = ({item}) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        item.name === activeCategory && styles.activeCategory,
      ]}
      onPress={() => navigation.navigate('ContentScreen' as never)}>
      <Text
        style={[
          styles.categoryText,
          item.name === activeCategory && styles.activeCategoryText,
        ]}>
        {item.name.slice(0, 10)}
      </Text>
    </TouchableOpacity>
  );

  // const renderPost = ({item}) => (
  //   console.log('ITEM : ', item),
  //   (
  //     <TouchableOpacity style={styles.card}>
  //       {/* <Image source={{uri: item.videoURL}} style={styles.cardImage} /> */}
  //       <View style={styles.cardContent}>
  //         <Text style={styles.cardTitle}>{item.title}</Text>
  //         <Text style={styles.cardDescription}>{item.description}</Text>
  //         <View style={styles.cardFooter}>
  //           <TouchableOpacity
  //             style={[styles.voteButton, styles.editButton]}
  //             onPress={() => handleEditBlog(item)}>
  //             <Text style={styles.voteText}>Edit</Text>
  //           </TouchableOpacity>
  //           <TouchableOpacity
  //             style={[styles.voteButton, styles.deleteButton]}
  //             onPress={() => handleDeleteBlog(item.id)}>
  //             <Text style={styles.voteText}>Delete</Text>
  //           </TouchableOpacity>
  //           <Text style={styles.postDate}>Posted: {item.date}</Text>
  //         </View>
  //       </View>
  //     </TouchableOpacity>
  //   )
  // );

  // const filteredPosts = blogs.filter(post => post.category === activeCategory);

  // const handleAddBlog = async () => {
  //   if (
  //     newBlog.title &&
  //     newBlog.description &&
  //     newBlog.videoURL &&
  //     newBlog.date &&
  //     newBlog.category
  //   ) {
  //     try {
  //       const date = moment(newBlog.date);
  //       if (editMode) {
  //         await firestore()
  //           .collection('blogs')
  //           .doc(selectedBlog.id)
  //           .update({
  //             ...newBlog,
  //             date: date.format('DD/MM/YYYY'),
  //           });
  //         setEditMode(false);
  //         setSelectedBlog(null);
  //       } else {
  //         await firestore()
  //           .collection('blogs')
  //           .add({
  //             ...newBlog,
  //             date: date.format('DD/MM/YYYY'),
  //           });
  //       }
  //       setShowModal(false);
  //       setNewBlog({
  //         title: '',
  //         description: '',
  //         videoURL: '',
  //         date: '',
  //         category: activeCategory,
  //       });
  //     } catch (error) {
  //       console.error('Error adding/updating blog: ', error);
  //     }
  //   } else {
  //     alert('Please fill all fields');
  //   }
  // };

  // const handleEditBlog = blog => {
  //   setEditMode(true);
  //   setSelectedBlog(blog);
  //   setNewBlog({
  //     title: blog.title,
  //     description: blog.description,
  //     videoURL: blog.videoURL,
  //     date: blog.date,
  //     category: blog.category,
  //   });
  //   openModal();
  // };

  // const handleDeleteBlog = async blogId => {
  //   try {
  //     await firestore().collection('blogs').doc(blogId).delete();
  //   } catch (error) {
  //     console.error('Error deleting blog: ', error);
  //   }
  // };

  // const handleGoTOVideo = videoURL => {
  //   navigation.navigate('ContentScreen', {videoURL});
  // };

  // Bottom sheet style animation
  const bottomSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withSpring(bottomSheetOffset.value, {
            damping: 20,
            stiffness: 90,
          }),
        },
      ],
    };
  });

  const openModal = () => {
    setShowModal(true);
    bottomSheetOffset.value = 0; // Trigger the modal to slide up
  };

  const closeModal = () => {
    setEditMode(false);
    setNewBlog({
      title: '',
      description: '',
      videoURL: '',
      date: '',
      category: activeCategory,
    });
    bottomSheetOffset.value = -500; // Close the modal by sliding it down
    setTimeout(() => {
      setShowModal(false);
    }, 300);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Home</Text>

      <Row style={{height: 120}}>
        <FlatList
          horizontal
          data={categories}
          renderItem={renderCategory}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.categoryList}
          showsHorizontalScrollIndicator={false}
        />
      </Row>

      {/* <TouchableOpacity
        onPress={() => navigation.navigate('ExploreTab' as never)}>
        <Text style={styles.sectionTitle}>{activeCategory}</Text>
      </TouchableOpacity> */}
      {/* <FlatList
        data={filteredPosts}
        renderItem={renderPost}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.postList}
      /> */}

      {/* <TouchableOpacity style={styles.addButton} onPress={openModal}>
        <PlusIcon />
      </TouchableOpacity> */}

      {/* Modal for adding a new blog */}
      {showModal && (
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={[styles.modalContainer, bottomSheetStyle]}>
            <View
              style={styles.modalContent}
              onStartShouldSetResponder={() => true}>
              <Text style={styles.modalTitle}>
                {editMode ? 'Edit Blog' : 'Add New Blog'}
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Title"
                placeholderTextColor="#888888"
                value={newBlog.title}
                onChangeText={text => setNewBlog({...newBlog, title: text})}
              />
              <TextInput
                style={styles.input}
                placeholder="Description"
                placeholderTextColor="#888888"
                value={newBlog.description}
                onChangeText={text =>
                  setNewBlog({...newBlog, description: text})
                }
              />
              <TextInput
                style={styles.input}
                placeholder="Video URL"
                placeholderTextColor="#888888"
                value={newBlog.videoURL}
                onChangeText={text => setNewBlog({...newBlog, videoURL: text})}
              />
              <TextInput
                style={styles.input}
                placeholder="Date"
                placeholderTextColor="#888888"
                value={newBlog.date}
                onChangeText={text => setNewBlog({...newBlog, date: text})}
              />
              <TextInput
                style={styles.input}
                placeholder="Category"
                placeholderTextColor="#888888"
                value={newBlog.category}
                onChangeText={text => setNewBlog({...newBlog, category: text})}
              />

              {/* <Button
                title={editMode ? 'Update Blog' : 'Add Blog'}
                onPress={handleAddBlog}
              /> */}
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Text style={styles.closeText}>Close</Text>
              </TouchableOpacity>

              <View style={{height: 120, width: '100%'}}></View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

export default App;
