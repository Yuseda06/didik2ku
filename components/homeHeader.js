import { View, Text, Platform, Pressable } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { blurhash } from "../utils/common";
import { useAuth } from "../context/authContext";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
  MenuProvider,
} from "react-native-popup-menu";
import { AntDesign, Feather } from "@expo/vector-icons";
import { MenuItem } from "./customMenuItems";
import { LinearGradient } from "expo-linear-gradient";
import GreetingText from "./greeting";
import { router } from "expo-router";

const ios = Platform.OS === "ios";

export default function HomeHeader() {
  const { user, logout } = useAuth();
  const { top } = useSafeAreaInsets();

  const handleProfile = () => {
    router.push("/profile");
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <View
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 2,
          height: 2,
        },
        shadowOpacity: 0,
        shadowRadius: 3.84,
        elevation: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        overflow: "hidden", // This is important for the shadow to be visible
      }}
    >
      <LinearGradient
        colors={["#ffaf00", "#ffaf00", "#ffaf00"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 2 }}
        style={{
          paddingTop: ios ? top : top + 10,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 20,

          // Add any other styles you need here
        }}
      >
        <View className=" flex-row gap-4 justify-center items-center">
          <Pressable>
            <Feather name="menu" size={hp(3)} color="white" />
          </Pressable>
          <GreetingText user={user} />
        </View>

        <View>
          <Menu>
            <MenuTrigger>
              <Image
                style={{
                  height: hp(4.3),
                  aspectRatio: 1,
                  borderRadius: 100,
                }}
                source={user?.profileUrl}
                placeholder={blurhash}
                transition={1000}
              />
            </MenuTrigger>
            <MenuOptions
              customStyles={{
                optionsContainer: {
                  borderRadius: 10,
                  borderCurve: "continuous",
                  backgroundColor: "white",
                  marginTop: 30,
                  marginLeft: -30,
                  width: 160,
                  shadowOpacity: 0.35,
                  shadowOffset: { width: 0, height: 0 },
                },
              }}
            >
              <MenuItem
                text="Profile"
                action={handleProfile}
                value={null}
                icon={<Feather name="user" size={hp(2.5)} color="#737373" />}
              />
              <Divider />
              <MenuItem
                text="Sign Out"
                action={handleLogout}
                value={null}
                icon={
                  <AntDesign name="logout" size={hp(2.5)} color="#737373" />
                }
              />
            </MenuOptions>
          </Menu>
        </View>
      </LinearGradient>
    </View>
  );
}

const Divider = () => {
  return <View className="p-[1px] bg-neutral-200" />;
};
