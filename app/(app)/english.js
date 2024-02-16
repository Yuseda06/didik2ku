import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  ScrollView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { dbRealtime } from "../../firebaseConfig";
import { ref, onValue, push, set } from "firebase/database";
import AddVocabModal from "../../subjects/english/addVocabModal";
import { useAuth } from "../../context/authContext";
import FloatingButton from "../../components/floatingButton";
import Swiper from "react-native-swiper";
import { Dimensions } from "react-native";
import { Audio } from "expo-av";

export default function AddVocab() {
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { user } = useAuth();
  const user1 = user?.username;

  useEffect(() => {
    const usersRef = ref(dbRealtime, "users/");

    const fetchData = async () => {
      try {
        onValue(usersRef, (snapshot) => {
          const data = snapshot.val();

          if (data) {
            const usersList = Object.entries(data).map(([id, user]) => ({
              id,
              ...user,
            }));
            setUsers(usersList);
          } else {
            console.warn("No data available");
          }
        });
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleAddWord = (word, meaning) => {
    if (user?.username) {
      const userLessonRef = ref(
        dbRealtime,
        `users/${user?.username}/english/vocab/lesson1/words/${word}`
      );

      // Set the meaning directly under the word
      set(userLessonRef, { meaning }).then(() => {
        console.log("Word added successfully");
      });
    } else {
      // If user doesn't exist, create the user and then add the word
      const newUserRef = push(ref(dbRealtime, "users"));
      const newUserId = newUserRef.key;

      const newUserLessonRef = ref(
        dbRealtime,
        `users/${newUserId}/english/vocab/lesson1/words/${word}`
      );

      // Set the meaning directly under the word
      set(newUserLessonRef, { meaning }).then(() => {
        console.log("User and word added successfully");
      });
    }
  };

  const speakText = async (text) => {
    if (text) {
      const speech = new Audio.Sound();
      try {
        await speech.loadAsync({
          uri: `https://translate.google.com/translate_tts?ie=UTF-8&q=${text}&tl=en&client=tw-ob`,
        });
        await speech.playAsync();
      } catch (error) {
        console.error("Error speaking text:", error);
      }
    }
  };

  return (
    <View className="flex-1 pt-4 pb-[70px] px-[10px]  ">
      <AddVocabModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onAddWord={handleAddWord}
      />
      {users.map(
        (user) =>
          user?.id === user1 && (
            <Swiper
              showsButtons={false}
              loop={false} // Change as needed // Change as needed
            >
              {Object.entries(user.english?.vocab?.lesson1?.words || []).map(
                ([word, { meaning }]) => (
                  <TouchableOpacity
                    key={word}
                    style={styles.card}
                    className="bg-white mb-2 flex-1 justify-center shadow  rounded-3xl items-center m-10"
                    onPress={() => speakText(word)}
                  >
                    <Text className="text-4xl">{word}</Text>
                    <Text className="text-[60px] text-neutral-600">
                      {meaning}
                    </Text>
                  </TouchableOpacity>
                )
              )}
            </Swiper>
          )
      )}
      <FloatingButton onPress={() => setIsModalVisible(true)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    // height: Dimensions.get("window").height - 250,
    // width: Dimensions.get("window").width - 50,

    shadowColor: "#d3d3d3",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.55,
    shadowRadius: 9.84,
    elevation: 20,
    // padding: 20,
    // marginTop: 10,
  },
});
