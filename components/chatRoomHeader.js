import { View, Text, Touchable, TouchableOpacity } from "react-native";
import React from "react";
import { Stack } from "expo-router";

import { Entypo, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function ChatRoomHeader({ user, router }) {
  return (
    <Stack.Screen
      options={{
        headerLeft: () => (
          <View className="flex-row items-center gap-4">
            <TouchableOpacity onPress={() => router.back()}>
              <Entypo name="chevron-left" size={hp(4)} color="#737373" />
            </TouchableOpacity>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
            >
              <Image
                source={user.profileUrl} // Assuming it's a PNG image, adjust accordingly
                style={{ aspectRatio: 1, borderRadius: 100, height: hp(3.5) }}
              />

              <Text
                style={{ fontSize: hp(2.0) }}
                className=" font-medium   text-neutral-500"
              >
                {user.username}
              </Text>
            </View>
          </View>
        ),
        headerRight: () => (
          <View className="flex-row items-center gap-8">
            <Ionicons name="call" size={hp(3)} color="#737373" />
            <Ionicons name="videocam" size={hp(3)} color="#737373" />
          </View>
        ),
        title: "",
        headerShadowVisible: false,
      }}
    />
  );
}
