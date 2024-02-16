// AddVocabModal.js
import React, { useState } from "react";
import { View, Modal, TextInput, Button } from "react-native";

export default function AddVocabModal({ isVisible, onClose, onAddWord }) {
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");

  const handleAddWord = () => {
    // Add your validation logic here if needed
    onAddWord(word, meaning);
    setWord("");
    setMeaning("");
    onClose();
  };

  return (
    <Modal visible={isVisible} animationType="slide">
      <View className="flex-1 justify-end bg-[#ffaf00]  pb-40 ">
        <View className="justify-center items-center gap-10">
          <TextInput
            placeholder="Enter word"
            value={word}
            onChangeText={(text) => setWord(text)}
          />
          <TextInput
            placeholder="Enter meaning"
            value={meaning}
            onChangeText={(text) => setMeaning(text)}
          />
          <Button title="Add Word" onPress={handleAddWord} />
          <Button title="Cancel" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}
