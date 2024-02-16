import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { dbRealtime } from "../../firebaseConfig";
import { ref, onValue } from "firebase/database";

export default function AddVocab() {
  const [users, setUsers] = useState([]);

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

  return (
    <View>
      <Text>AddVocab</Text>
      {/* Render your users data as needed */}
      {users.map((user) => (
        <View key={user.id}>
          <Text>{user.id}</Text>
          {/* Check if 'english' and 'vocab' properties exist before accessing them */}
          {user.english?.vocab?.lesson1?.words &&
            // Render words and meanings
            Object.entries(user.english.vocab.lesson1.words).map(
              ([word, { meaning }]) => (
                <View key={word}>
                  <Text>{word}</Text>
                  <Text>{meaning}</Text>
                </View>
              )
            )}
        </View>
      ))}
    </View>
  );
}
