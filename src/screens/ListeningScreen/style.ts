import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {colors} from '@/theme/colors';

const styles = StyleSheet.create({
  headerView: {
    height: scale(120),
    width: 'auto',
    backgroundColor: colors.listeningChipColor,
  },
  activityNameText: {
    color: 'white',
    fontSize: scale(14),
    fontWeight: '600',
  },
  headericonAndText: {
    left: scale(20),
    top: scale(20),
  },
  headerMainIconPosition: {
    left: scale(8),
  },
  headerTextPosition: {
    left: scale(115),
    bottom: scale(60),
  },
  headerTextStyle: {
    color: 'white',
    fontSize: scale(16),
    fontWeight: '600',
  },
  imageBackground: {
    height: 150, // Set height as per your design
    justifyContent: 'flex-end', // Align title and date at the bottom of the image
    padding: 10, // Add some padding for text
  },
  imageStyle: {
    borderRadius: 8, // Optional: To match the card's rounded corners
    overflow: 'hidden', // Ensures rounded corners are applied to the image
  },
  titleText: {
    color: '#fff', // Text color for better contrast
    fontSize: 18,
    fontWeight: 'bold',
  },
  dateText: {
    color: '#fff', // Text color for better contrast
    fontSize: 14,
  },
});

export default styles;
