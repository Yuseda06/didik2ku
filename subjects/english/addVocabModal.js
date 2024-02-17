// AddVocabModal.js
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { View, Modal, TextInput, Button, TouchableOpacity } from "react-native";
import translate from "translate-google-api";

export default function AddVocabModal({ isVisible, onClose, onAddWord }) {
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await translate(word, { from: "en", to: "ms" });
        setMeaning(result);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    if (word) {
      fetchData();
    }
  }, [word]);

  const handleAddWord = () => {
    onAddWord(word, meaning);
    setWord("");
    setMeaning("");
    onClose();
  };

  return (
    <Modal visible={isVisible} animationType="slide">
      <View className="flex-1 justify-center bg-[#ffaf00]   ">
        <View className="justify-center items-center gap-40">
          <TextInput
            placeholder="Enter word"
            value={word}
            onChangeText={(text) => setWord(text)}
            className="text-4xl"
          />

          <View className="flex flex-row gap-16">
            <TouchableOpacity onPress={handleAddWord}>
              <Feather name="plus-circle" size={60} color="white" />
            </TouchableOpacity>

            <TouchableOpacity onPress={onClose}>
              <Feather name="x-circle" size={60} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
