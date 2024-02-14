import { Feather, FontAwesome, Octicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Loading from "../components/loading";
import CustomKeyboard from "../components/customKeyboard";
import { useAuth } from "../context/authContext";

export default function SignUp() {
  const router = useRouter();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const usernameRef = useRef("");
  const profileRef = useRef("");
  const staffIdRef = useRef("");

  const handleRegister = async () => {
    if (!emailRef.current || !passwordRef.current || !usernameRef.current) {
      Alert.alert("Oops !!!", "Please fill in all the fields");
      return;
    }

    setLoading(true);

    let response = await register(
      emailRef.current,
      passwordRef.current,
      usernameRef.current,
      profileRef.current
    );

    setLoading(false);

    if (!response.success) {
      Alert.alert("Oops!!!", response.msg);
      return;
    }
  };

  return (
    <CustomKeyboard>
      <ScrollView>
        <View className="flex-1">
          <StatusBar style="dark" />
          <View
            className="items-center justify-center bg-[#e4e4e4] py-10
          rounded-bl-[50px] rounded-br-[50px] "
          >
            <Image
              style={{ height: hp(20) }}
              resizeMode="contain"
              source={require("../assets/images/login.gif")}
            />
          </View>
          <View
            style={{ paddingTop: hp(7), paddingHorizontal: wp(5) }}
            className="flex-1 gap-12 -mt-20"
          >
            <View className="gap-4">
              <Text
                style={{ fontSize: hp(3) }}
                className="font-bold  text-center text-neutral-800 mt-10 mb-4"
              >
                Create an account
              </Text>

              <View className="gap-4">
                <View
                  style={{ height: hp(7) }}
                  className="flex-row gap-4 px-4 bg-[#efecec] items-center rounded-xl"
                >
                  <Feather name="user" size={hp(2.4)} color="gray" />
                  <TextInput
                    onChangeText={(value) => (usernameRef.current = value)}
                    style={{ fontSize: hp(2), height: hp(8) }}
                    className="flex-1 font-semibold text-neutral-700 "
                    placeholder="Username"
                    placeholderTextColor={"#555555"}
                  />
                </View>

                <View
                  style={{ height: hp(7) }}
                  className="flex-row gap-4 px-4  bg-[#efecec] items-center rounded-xl"
                >
                  <Octicons name="mail" size={hp(2.4)} color="gray" />
                  <TextInput
                    onChangeText={(value) => (emailRef.current = value)}
                    style={{ fontSize: hp(2), height: hp(8) }}
                    className="flex-1 font-semibold text-neutral-700"
                    placeholder="Email address"
                    placeholderTextColor={"#555555"}
                    autoCapitalize="none"
                  />
                </View>

                <View className="gap-3">
                  <View
                    style={{ height: hp(7) }}
                    className="flex-row gap-4 px-4 bg-[#efecec] items-center rounded-xl"
                  >
                    <Octicons name="lock" size={hp(2.4)} color="gray" />
                    <TextInput
                      onChangeText={(value) => (passwordRef.current = value)}
                      style={{ fontSize: hp(2), height: hp(8) }}
                      className="flex-1 font-semibold text-neutral-700"
                      secureTextEntry={true}
                      placeholder="Password"
                      placeholderTextColor={"#555555"}
                    />
                  </View>
                </View>

                <View className="gap-3">
                  <View
                    style={{ height: hp(7) }}
                    className="flex-row gap-4 px-4 bg-[#efecec] items-center rounded-xl"
                  >
                    <Octicons name="lock" size={hp(2.4)} color="gray" />
                    <TextInput
                      onChangeText={(value) => (profileRef.current = value)}
                      style={{ fontSize: hp(2), height: hp(8) }}
                      className="flex-1 font-semibold text-neutral-700"
                      secureTextEntry={false}
                      placeholder="Profile Url"
                      placeholderTextColor={"#555555"}
                    />
                  </View>
                </View>

                <View>
                  {loading ? (
                    <View className="flex-row justify-center items-center">
                      <Loading size={hp(12)} />
                    </View>
                  ) : (
                    <TouchableOpacity
                      onPress={handleRegister}
                      style={{ height: hp(9) }}
                      className=" justify-center"
                    >
                      <View
                        style={{ height: hp(7) }}
                        className="bg-secondary rounded-xl justify-center items-center"
                      >
                        <Text
                          style={{ fontSize: hp(2.7) }}
                          className="text-white font-bold text-[#ffff]"
                        >
                          Sign Up
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                </View>

                <View className="flex-row justify-center items-center">
                  <Text
                    style={{ fontSize: hp(1.8) }}
                    className="font-semibold text-neutral-500"
                  >
                    Already have an account?{" "}
                  </Text>

                  <TouchableOpacity
                    onPress={() => {
                      router.push("signIn");
                    }}
                    className="h-14  gap-3 items-center justify-center pr-4"
                  >
                    <Text
                      style={{ fontSize: hp(1.8) }}
                      className="font-bold text-secondary"
                    >
                      Sign In
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </CustomKeyboard>
  );
}
