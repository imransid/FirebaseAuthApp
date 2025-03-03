import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

const SettingsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Animated.Text entering={FadeInDown.duration(800).springify()} style={styles.title}>
        Settings
      </Animated.Text>
      <Animated.Text entering={FadeInUp.duration(1000).springify()} style={styles.subtitle}>
        Awesome things are coming soon!
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ffffff",
  },
  subtitle: {
    marginTop: 10,
    fontSize: 18,
    color: "#bbbbbb",
  },
});

export default SettingsScreen;
