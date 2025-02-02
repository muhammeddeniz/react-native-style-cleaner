import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ExampleScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello World!</Text>
      <View style={styles.contentBox}>
        <Text style={styles.description}>This is an example content.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: "#333",
  },
  contentBox: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
  },
  // unused styles
  test2: {
    color: "red",
  },
  test3: {
    color: "blue",
  },
});
export default ExampleScreen;
