import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const FloatingButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <FontAwesome6 name="plus" size={20} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#ffb901",
    padding: 15,
    borderRadius: 100,
    elevation: 15, // for Android shadow
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default FloatingButton;
