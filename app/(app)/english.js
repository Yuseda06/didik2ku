import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  ScrollView,
  FlatList,
  StyleSheet,
} from "react-native";
import { dbRealtime } from "../../firebaseConfig";
import { ref, onValue, push, set } from "firebase/database";
import AddVocabModal from "../../subjects/english/addVocabModal";
import { useAuth } from "../../context/authContext";
import FloatingButton from "../../components/floatingButton";
import Carousel from "react-native-snap-carousel";

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

  return (
    <View className="flex-1 ">
      <ScrollView className="flex-1 bg-white">
        <AddVocabModal
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onAddWord={handleAddWord}
        />

        {/* Render your users data as needed */}
        <View
          className=" mt-10 "
          style={{ shadowOpacity: 1, shadowColor: "gray", shadowOffset: [] }}
        >
          {users.map(
            (user) =>
              user?.id === user1 && (
                <View key={user.id} className="h-[400px] w-full bg-white">
                  {/* Render words and meanings using react-native-snap-carousel */}
                  <Carousel
                    data={Object.entries(
                      user.english?.vocab?.lesson1?.words || []
                    )}
                    renderItem={({ item: [word, { meaning }] }) => (
                      <View style={styles.card}>
                        <Text>{word}</Text>
                        <Text>{meaning}</Text>
                      </View>
                    )}
                    sliderWidth={300} // Set your desired slider width
                    itemWidth={300} // Set your desired item width
                    layout={"default"}
                  />
                </View>
              )
          )}
        </View>
      </ScrollView>
      <FloatingButton onPress={() => setIsModalVisible(true)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    height: 400,
    width: 300,
    backgroundColor: "#ffff", // Use your desired color
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.15,
    shadowRadius: 9.84,
    elevation: 9,
    padding: 20,
    marginTop: 10,
  },
});
