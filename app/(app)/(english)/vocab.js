import { View, Text } from "react-native";
import React, { useState } from "react";
import FloatingButton from "../../../components/floatingButton";
import RightSlideModal from "../../../components/rightSlideModal";

export default function Vocab() {
  const [modalVisible, setModalVisible] = useState(false);
  const handleButtonPress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleModalPress = (event) => {
    // Prevent the press event from propagating to underlying components
    event.stopPropagation();
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home Screen</Text>
      {/* Your main screen content here */}
      <FloatingButton onPress={handleButtonPress} />
      <RightSlideModal isVisible={modalVisible} onClose={handleCloseModal} />
    </View>
  );
}
