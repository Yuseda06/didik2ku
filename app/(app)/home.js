import {
  View,
  Text,
  Button,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import Carousel from "react-native-reanimated-carousel";
import { BarChart, PieChart } from "react-native-gifted-charts";
import Chart from "../../components/chart";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ChatList from "./chatList";
import Loading from "../../components/loading";
import { usersRef } from "../../firebaseConfig";
import { getDocs, query, where } from "firebase/firestore";

export default function Home() {
  const { logout, user } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (user?.uid) getUsers();
  }, []);

  const getUsers = async () => {
    const q = query(usersRef, where("userId", "!=", user?.uid));

    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data() });
    });

    setUsers(data);
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="light" />

      <Chart />

      {/* {users?.length > 0 ? (
        <ChatList currentUser={user} users={users} />
      ) : (
        <View className="flex items-center" style={{ top: hp(30) }}>
          <Loading size={hp(25)} />
        </View>
      )} */}
    </View>
  );
}
