import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';

const styles = StyleSheet.create({
  backArrowBackground: {
    backgroundColor: '#ffffff40', // Semi-transparent white background
    borderRadius: 15, // Round shape
    padding: scale(6), // Padding around the icon
    marginLeft: scale(8), // Add some spacing from the left edge
  },
  headerRightPosition: {
    right: scale(8),
  },
});

export default styles;
