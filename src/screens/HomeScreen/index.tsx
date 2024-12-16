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

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'HomeScreen'
>;

type HomeScreenRouteProp = RouteProp<RootStackParamList, 'HomeScreen'>;

const categories = [
  {id: 1, name: 'Sport'},
  {id: 2, name: 'Politics'},
  {id: 3, name: 'Technology', isActive: true},
  {id: 4, name: 'Economy'},
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
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const route = useRoute<HomeScreenRouteProp>();

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
      onPress={() => setActiveCategory(item.name)}>
      <Text
        style={[
          styles.categoryText,
          item.name === activeCategory && styles.activeCategoryText,
        ]}>
        {item.name.slice(0, 4)}
      </Text>
    </TouchableOpacity>
  );

  const renderPost = ({item}) => (
    console.log('ITEM : ', item),
    (
      <TouchableOpacity
        style={styles.card}
        onPress={() => handleGoTOVideo(item.videoURL)}>
        {/* <Image source={{uri: item.videoURL}} style={styles.cardImage} /> */}
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardDescription}>{item.description}</Text>
          <View style={styles.cardFooter}>
            {/* <TouchableOpacity
            style={[styles.voteButton, styles.editButton]}
            onPress={() => handleEditBlog(item)}>
            <Text style={styles.voteText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.voteButton, styles.deleteButton]}
            onPress={() => handleDeleteBlog(item.id)}>
            <Text style={styles.voteText}>Delete</Text>
          </TouchableOpacity> */}
            <Text style={styles.postDate}>Posted: {item.date}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  );

  const filteredPosts = blogs.filter(post => post.category === activeCategory);

  const handleAddBlog = async () => {
    if (
      newBlog.title &&
      newBlog.description &&
      newBlog.videoURL &&
      newBlog.date &&
      newBlog.category
    ) {
      try {
        const date = moment(newBlog.date);
        if (editMode) {
          await firestore()
            .collection('blogs')
            .doc(selectedBlog.id)
            .update({
              ...newBlog,
              date: date.format('DD/MM/YYYY'),
            });
          setEditMode(false);
          setSelectedBlog(null);
        } else {
          await firestore()
            .collection('blogs')
            .add({
              ...newBlog,
              date: date.format('DD/MM/YYYY'),
            });
        }
        setShowModal(false);
        setNewBlog({
          title: '',
          description: '',
          videoURL: '',
          date: '',
          category: activeCategory,
        });
      } catch (error) {
        console.error('Error adding/updating blog: ', error);
      }
    } else {
      alert('Please fill all fields');
    }
  };

  const handleEditBlog = blog => {
    setEditMode(true);
    setSelectedBlog(blog);
    setNewBlog({
      title: blog.title,
      description: blog.description,
      videoURL: blog.videoURL,
      date: blog.date,
      category: blog.category,
    });
    openModal();
  };

  const handleDeleteBlog = async blogId => {
    try {
      await firestore().collection('blogs').doc(blogId).delete();
    } catch (error) {
      console.error('Error deleting blog: ', error);
    }
  };

  const handleGoTOVideo = videoURL => {
    navigation.navigate('VideoScreen', {videoURL});
    console.log('URL : ', videoURL);
  };

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

      <TouchableOpacity
        onPress={() => navigation.navigate('ExploreTab' as never)}>
        <Text style={styles.sectionTitle}>{activeCategory}</Text>
      </TouchableOpacity>
      <FlatList
        data={filteredPosts}
        renderItem={renderPost}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.postList}
      />

      <TouchableOpacity style={styles.addButton} onPress={openModal}>
        <PlusIcon />
      </TouchableOpacity>

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

              <Button
                title={editMode ? 'Update Blog' : 'Add Blog'}
                onPress={handleAddBlog}
              />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    paddingTop: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#2A2A2A',
  },
  categoryList: {
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  categoryButton: {
    width: 90,
    paddingVertical: 8,
    paddingHorizontal: 5,
    backgroundColor: '#EDEDED',
    borderRadius: 20,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeCategory: {
    backgroundColor: '#FFBE0B',
  },
  categoryText: {
    fontSize: 14,
    color: '#2A2A2A',
    fontWeight: '600',
  },
  activeCategoryText: {
    color: '#FFF',
    fontWeight: '800',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginVertical: 10,
    color: '#2A2A2A',
  },
  postList: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginVertical: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 3},
    elevation: 3,
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  cardContent: {
    flex: 1,
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  voteButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#FFBE0B',
  },
  deleteButton: {
    backgroundColor: '#F44336',
  },
  voteText: {
    color: '#FFF',
    fontSize: 12,
  },
  postDate: {
    fontSize: 12,
    color: '#777',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#FFBE0B',
    borderRadius: 50,
    padding: 15,
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    width: '100%',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#CCC',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
    color: '#000',
  },
  closeButton: {
    backgroundColor: '#FF5722',
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  closeText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default App;
