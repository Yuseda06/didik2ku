import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

import MessageList from "../../components/messageList";
import { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Feather } from "@expo/vector-icons";
import ChatRoomHeader from "../../components/chatRoomHeader";
import CustomKeyboard from "../../components/customKeyboard";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useAuth } from "../../context/authContext";
import { getRoomId } from "../../utils/common";

export default function ChatRoom() {
  const item = useLocalSearchParams();
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const { user } = useAuth();
  const textRef = useRef("");
  const inputRef = useRef(null);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    updateScrollView();
  }, [messages]);

  const updateScrollView = () => {
    setTimeout(() => {
      scrollViewRef?.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  useEffect(() => {
    createRoomIfNotExists();
    let roomId = getRoomId(user?.userId, item?.userId);
    const docRef = doc(db, "rooms", roomId);
    const messagesRef = collection(docRef, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));

    let unsub = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map((doc) => {
        return doc.data();
      });

      setMessages([...allMessages]);
    });

    const KeyBoardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      updateScrollView
    );
    return () => {
      unsub();
      KeyBoardDidShowListener.remove();
    };
  }, []);

  const createRoomIfNotExists = async () => {
    let roomId = getRoomId(user?.userId, item?.userId);
    await setDoc(doc(db, "rooms", roomId), {
      roomId,
      createdAt: Timestamp.fromDate(new Date()),
    });
  };

  const handleSendMessage = async () => {
    let message = textRef.current.trim();
    if (!message) return;

    try {
      let roomId = getRoomId(user?.userId, item?.userId);
      const docRef = doc(db, "rooms", roomId);
      const messagesRef = collection(docRef, "messages");
      textRef.current = "";
      if (inputRef) inputRef?.current?.clear();

      const newDoc = await addDoc(messagesRef, {
        text: message,
        createdAt: Timestamp.fromDate(new Date()),
        senderName: user?.username,
        userId: user?.userId,
        profileUrl: user?.profileUrl,
      });
    } catch (err) {
      Alert.alert("Error", "Failed to send message");
    }
  };
  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ChatRoomHeader user={item} router={router} />
      <View className="h3 border-b border-neutral-200" />
      <View className="flex-1 justify-between bg-neutral-100 overflow-visible">
        <View className="flex-1">
          <MessageList
            scrollViewRef={scrollViewRef}
            messages={messages}
            currentUser={user}
          />
        </View>
        <View className="pt-2" style={{ marginBottom: hp(1.7) }}>
          <View className="flex-row mx-3 justify-between bg-white border p-2 border-neutral-300 rounded-full pl-5">
            <TextInput
              ref={inputRef}
              onChangeText={(value) => (textRef.current = value)}
              placeholder="Type message..."
              className="flex-1 mr-2"
              style={{ fontSize: hp(2) }}
            />
            <TouchableOpacity
              onPress={handleSendMessage}
              className="bg-neutral-200 p-2 mr-1 rounded-full"
            >
              <Feather name="send" size={hp(2.7)} color="#737373" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
