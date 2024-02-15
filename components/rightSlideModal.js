import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const RightSlideModal = ({ isVisible, onClose }) => {
  const [text, setText] = useState("");
  const name = useRef("");
  const handleTextChange = (inputText) => {
    setText(inputText);
  };

  const handleSubmit = () => {
    // Handle submission logic here
    console.log("Entered text:", text);

    // Close the modal
    onClose();
  };

  return (
    <Modal
      transparent
      visible={isVisible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            onChangeText={(value) => (name.current = value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Type something..."
            onChangeText={handleTextChange}
            value={text}
          />
          <TextInput
            style={styles.input}
            placeholder="Type something..."
            onChangeText={handleTextChange}
            value={text}
          />
          <TextInput
            style={styles.input}
            placeholder="Type something..."
            onChangeText={handleTextChange}
            value={text}
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 16,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  submitButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default RightSlideModal;
