import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';

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

export default styles;
