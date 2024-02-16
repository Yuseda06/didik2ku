import { Octicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Span,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Loading from "../components/loading";
import CustomKeyboard from "../components/customKeyboard";
import { useAuth } from "../context/authContext";
import Constants from "expo-constants";
import { signOut } from "firebase/auth";

export default function SignIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const { login } = useAuth();

  useEffect(() => {
    logout();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (e) {
      return { success: false, msg: e.message, error: e };
    }
  };

  const handleLogin = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("Oops!!!", "Please fill in all the fields");
      return;
    }

    setLoading(true);
    const response = await login(emailRef.current.trim(), passwordRef.current);
    setLoading(false);
    if (!response.success) {
      Alert.alert("Oops!!!", response.msg);
    }
  };

  return (
    <CustomKeyboard>
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

        <Text
          style={{ fontSize: hp(3) }}
          className="font-bold  text-center text-neutral-800 mt-8"
        >
          Welcome Back
        </Text>
        <View
          style={{ paddingTop: hp(8), paddingHorizontal: wp(5) }}
          className="flex-1 gap-12 -mt-[44px]"
        >
          <View className="gap-4 ">
            <View
              style={{ height: hp(7) }}
              className="flex-row gap-4 px-4 bg-[#efecec] items-center  rounded-xl"
            >
              <Octicons name="mail" size={hp(2.4)} color="gray" />
              <TextInput
                onChangeText={(value) => (emailRef.current = value)}
                style={{ fontSize: hp(2), height: hp(8) }}
                className="flex-1 font-semibold text-neutral-700 "
                placeholder="Email address"
                placeholderTextColor={"#555555"}
                autoCapitalize="none"
              />
            </View>

            <View className="gap-0">
              <View
                style={{ height: hp(7) }}
                className="flex-row gap-4 px-4  bg-[#efecec] items-center rounded-xl"
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
              <View className="flex-row justify-end items-center">
                <TouchableOpacity className="h-12  justify-center items-end pl-4">
                  <Text
                    style={{ fontSize: hp(1.8) }}
                    className="font-semibold text-right text-[#ffaf00] "
                  >
                    Forgot password?
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View>
              {loading ? (
                <View className="flex-row justify-center items-center">
                  <Loading size={hp(12)} />
                </View>
              ) : (
                <TouchableOpacity
                  onPress={handleLogin}
                  style={{ height: hp(9) }}
                  className=" justify-center"
                >
                  <View
                    style={{ height: hp(7) }}
                    className="bg-[#ffaf00] rounded-xl justify-center items-center"
                  >
                    <Text
                      style={{ fontSize: hp(2.7) }}
                      className="text-[#ffff]  font-bold "
                    >
                      Sign In
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
                Don't have an account yet?{" "}
              </Text>

              <TouchableOpacity
                onPress={() => {
                  router.push("signUp");
                }}
                className="h-14  gap-3 items-center justify-center pr-4"
              >
                <Text
                  style={{ fontSize: hp(1.8) }}
                  className="font-bold text-[#ffaf00]"
                >
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
            <Text
              className="text-center text-neutral-500 font-semibold mt-[90px]"
              style={{ fontSize: hp(1.24) }}
            >
              Build Number : {Constants.expoConfig.android.versionCode} Version
              : {Constants.expoConfig.version}{" "}
            </Text>
          </View>
        </View>
      </View>
    </CustomKeyboard>
  );
}
