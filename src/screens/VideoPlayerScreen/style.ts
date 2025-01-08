import {colors} from '@/theme/colors';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 'auto',
    top: 5,
  },
  headerLeftIconPosition: {
    position: 'absolute',
    left: 10,
  },
  headerLeftIconBackground: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000020',
    borderRadius: 15,
  },
  headerTitlePosition: {
    position: 'absolute',
    right: 155,
  },
  title: {
    fontSize: 18,
    color: 'black',
    marginLeft: 80,
    fontWeight: 'bold',
  },
  card: {
    margin: 16,
    borderRadius: 10,
    overflow: 'hidden',
  },
  video: {
    width: '100%',
    height: 300,
  },
  hidden: {
    width: 0,
    height: 0,
  },
  descriptionSection: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentSection: {
    flex: 1,
    padding: 16,
  },
  commentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#888',
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: '#000',
  },
  addCommentButton: {
    marginBottom: 16,
  },
  commentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  commentText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  likeAndDislikeText: {
    fontSize: 14,
    color: '#888',
    fontWeight: '500',
  },
});

export default styles;
