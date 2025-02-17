// styles.ts
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f4f4f4',
  },
  card: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 3,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  row: {
    flexDirection: 'row', // Aligns children horizontally
    alignItems: 'center', // Ensures vertical alignment
    justifyContent: 'space-between', // Distributes space between elements
    padding: 8, // Optional padding for better spacing
  },
});

export default styles;
