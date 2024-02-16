import React, { useEffect, useState } from "react";
import { View, Text, Button, ScrollView } from "react-native";
import { dbRealtime } from "../../firebaseConfig";
import { ref, onValue, push, set } from "firebase/database";
import AddVocabModal from "../../subjects/english/addVocabModal";
import { useAuth } from "../../context/authContext";
import FloatingButton from "../../components/floatingButton";

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
    <ScrollView className="flex-1 border bg-green-600">
      <AddVocabModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onAddWord={handleAddWord}
      />
      {/* Render your users data as needed */}
      <View className="border bg-red-600 h-full w-full flex-1 mt-20 ">
        {users.map(
          (user) =>
            user?.id === user1 && (
              <View key={user.id} className=" bg-red-400 ">
                <Text>{user.id}</Text>
                {/* Render words and meanings */}
                {user.english?.vocab?.lesson1?.words &&
                  Object.entries(user.english.vocab.lesson1.words).map(
                    ([word, { meaning }]) => (
                      <View key={word}>
                        <Text>{word}</Text>
                        <Text>{meaning}</Text>
                      </View>
                    )
                  )}
              </View>
            )
        )}
      </View>
      <FloatingButton onPress={() => setIsModalVisible(true)} />
    </ScrollView>
  );
}
