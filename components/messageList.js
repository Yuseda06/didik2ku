import { View, Text, ScrollView } from "react-native";
import React from "react";
import MessageItem from "./messageItem";

export default function MessageList({ messages, currentUser, scrollViewRef }) {
  console.log("currentUser in message list", currentUser);
  return (
    <ScrollView
      ref={scrollViewRef}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: 10 }}
    >
      {messages?.map((message, index) => (
        <MessageItem key={index} message={message} currentUser={currentUser} />
      ))}
    </ScrollView>
  );
}
