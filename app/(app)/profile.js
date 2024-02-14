import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import ProfileHeader from "../../components/profileHeader";
import { useLocalSearchParams, useRouter, useNavigation } from "expo-router";
import { useAuth } from "../../context/authContext";
import { Feather, FontAwesome, Octicons } from "@expo/vector-icons";
import Loading from "../../components/loading";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Image } from "expo-image";
import { blurhash } from "../../utils/common";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import {
  useProfileStore,
  usePictureStore,
  useUsernameStore,
} from "../../zustand/userProfileStore";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";

export default function profile() {
  const item = useLocalSearchParams();
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [editedUsername, setEditedUsername] = useState(user?.username);
  const [editedStaffId, setEditedStaffId] = useState(user?.staffId);
  const { userProfile, updateProfile } = useProfileStore();

  const { isPictureTaken, takePicture, resetPicture } = usePictureStore();
  const { isUsernameUpdated, updateUsername, resetUpdatedUsername } =
    useUsernameStore();

  console.log("editedUsername", editedUsername);
  console.log("user?.username", user?.username);
  console.log("isUsernameUpdated", isUsernameUpdated);

  const navigation = useNavigation();
  const profileImageSource = isPictureTaken
    ? { uri: userProfile?.profileUrl }
    : { uri: user?.profileUrl };

  const profileUsernameSource = isUsernameUpdated
    ? userProfile?.username
    : user?.username;

  useEffect(() => {
    setEditedUsername(profileUsernameSource);
  }, [isUsernameUpdated]);

  // useEffect(() => {
  //   navigation.addListener("beforeRemove", (e) => {
  //     e.preventDefault();

  //     if (isPictureTaken) {
  //       Alert.alert(
  //         "Oops",
  //         "You have not updated your profile picture yet. Do you want to leave without updating?",
  //         [
  //           {
  //             text: "No",
  //             style: "cancel",
  //           },
  //           {
  //             text: "Yes",
  //             onPress: () => {
  //               // User chose to leave without updating, navigate back
  //               router.push("/home");
  //             },
  //           },
  //         ]
  //       );
  //     }
  //   });
  // }, [isPictureTaken]);

  const pickImage = async () => {
    resetPicture();

    try {
      await ImagePicker.requestCameraPermissionsAsync();
      let result = await ImagePicker.launchCameraAsync({
        cameraType: ImagePicker.CameraType.front,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.cancelled) {
        // Resize image
        const resizedImage = await resizeImage(result.assets[0].uri);

        // Convert resized image to base64
        const base64Image = await convertToBase64(resizedImage.uri);

        // Set profile image and update profile with the base64 data

        updateProfile({
          profileUrl: "data:image/jpeg;base64," + base64Image,
          username: editedUsername,
          staffId: editedStaffId,
        });
        takePicture();
      }
    } catch (error) {
      alert("Error occurred while picking image: " + error.message);
    }
  };

  const updateUserData = async (userId) => {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    updateProfile({
      username: editedUsername,
      staffId: editedStaffId,
    });

    try {
      setLoading(true);
      let updatedProfileUrl = isPictureTaken
        ? userProfile?.profileUrl
        : user?.profileUrl;

      if (docSnap.exists()) {
        await updateDoc(docRef, {
          username: editedUsername,
          staffId: editedStaffId,
          profileUrl: updatedProfileUrl || null, // Use null if updatedProfileUrl is empty
        });
        setLoading(false);
      }

      updateUsername();

      Alert.alert("Yeay !!!", "Profile updated successfully");
    } catch (e) {
      Alert.alert("Error occurred while updating user data " + e.message);
      setLoading(false);
    }
  };

  const convertToBase64 = async (uri) => {
    try {
      const fileUri = uri;
      const base64 = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      return base64;
    } catch (error) {
      console.error("Error converting image to base64:", error);
      throw error;
    }
  };

  // ... (Other imports)

  const resizeImage = async (uri) => {
    try {
      const resizedImage = await ImageManipulator.manipulateAsync(
        uri,
        [{ resize: { width: 500, height: 500 } }],
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
      );

      return resizedImage;
    } catch (error) {
      console.error("Error resizing image:", error);
      throw error;
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      className="flex-1 bg-white px-4 "
    >
      <StatusBar style="dark" />
      <ProfileHeader user={user} router={router} key={user.userId} />
      <View className="h3 border-b border-neutral-200 " />

      <View className="flex-1  items-center justify-start relative  pt-10">
        <View
          style={{
            borderRadius: 900,
            alignItems: "center",
          }}
        >
          <Image
            style={{
              height: hp(30),
              width: hp(30),
              borderRadius: 900, // Set the border radius here
              // This margin is not needed for centering
            }}
            source={profileImageSource}
            placeholder={blurhash}
            transition={500}
          />
        </View>

        <TouchableOpacity
          className=" absolute top-[190px] left-[230px] h-14 w-14 rounded-full items-center justify-center bg-[#f5f5f5]"
          onPress={pickImage}
        >
          <Feather name="camera" size={hp(3)} color="#737373" />
        </TouchableOpacity>

        <View className="flex-1 gap-4 w-full px-4 mt-10">
          <View
            style={{ height: hp(7) }}
            className="flex-row gap-4 px-4 bg-neutral-100 mt-30 items-center rounded-xl"
          >
            <Feather name="user" size={hp(2.4)} color="gray" />
            <TextInput
              value={editedUsername}
              onChangeText={(value) => setEditedUsername(value)}
              style={{ fontSize: hp(2), height: hp(8) }}
              className="flex-1 font-semibold text-neutral-700 "
              placeholder="Username"
              placeholderTextColor={"#555555"}
              onFocus={() => {}}
            />
          </View>

          <View
            style={{ height: hp(7) }}
            className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-xl"
          >
            <FontAwesome name="id-card-o" size={hp(2.4)} color="gray" />
            <TextInput
              value={editedStaffId}
              onChangeText={(value) => setEditedStaffId(value)}
              style={{ fontSize: hp(2), height: hp(8) }}
              className="flex-1 font-semibold text-neutral-700"
              placeholder="Staff ID"
              placeholderTextColor={"#555555"}
            />
          </View>

          <View>
            {loading ? (
              <View className="flex-row justify-center items-center">
                <Loading size={hp(12)} />
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  updateUserData(user?.userId);
                }}
                style={{ height: hp(6.5) }}
                className="bg-teal-700 rounded-xl justify-center items-center mt-6"
              >
                <Text
                  style={{ fontSize: hp(2.7) }}
                  className="text-white font-bold"
                >
                  Update profile
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
