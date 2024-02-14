import {
  View,
  Text,
  Button,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
// import Carousel from "react-native-reanimated-carousel";
// import { BarChart, PieChart } from "react-native-gifted-charts";
// import Chart from "../../components/chart";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
// import ChatList from "./chatList";
import Loading from "../../components/loading";
import { db, usersRef } from "../../firebaseConfig";
import { getDocs, query, where } from "firebase/firestore";
// import Papa from "papaparse";
// import * as FileSystem from "expo-file-system";

export default function Home() {
  const { logout, user } = useAuth();
  const [users, setUsers] = useState([]);

  console.log("user in home", user);

  // useEffect(() => {
  //   if (user?.uid) getUsers();
  //   exportToCSV();
  // }, []);

  const getUsers = async () => {
    const q = query(usersRef, where("userId", "!=", user?.uid));

    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data() });
    });

    setUsers(data);
  };

  // const exportToCSV = async () => {
  //   try {
  //     // Fetch data from Firestore and convert it to CSV
  //     const q = query(usersRef, where("userId", "!=", ""));

  //     const querySnapshot = await getDocs(q);
  //     let data = [];
  //     querySnapshot.forEach((doc) => {
  //       data.push({ ...doc.data() });
  //     });

  //     // const csvData = Papa.unparse(data);

  //     // console.log("csvData", csvData);

  //     // // Save CSV file to document directory
  //     // const filePath = `${FileSystem.documentDirectory}exported_data.csv`;
  //     // await FileSystem.writeAsStringAsync(filePath, csvData);

  //     console.log("CSV file exported successfully:", filePath);
  //   } catch (error) {
  //     console.error("Error exporting to CSV:", error);
  //   }
  // };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="light" />

      <View className="flex items-center" style={{ top: hp(30) }}>
        {/* <Loading size={hp(25)} /> */}
      </View>
    </View>
  );
}
