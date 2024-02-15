import { Drawer } from "expo-router/drawer";
import { Image, View, Text } from "react-native";
import icons from "../../constants/icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { DrawerItemList } from "@react-navigation/drawer";
import DrawerRight from "../../components/drawerRight";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../context/authContext";

export default function RootLayout() {
  const { user } = useAuth();
  console.log("user", user?.username);
  return (
    <Drawer
      screenOptions={{
        headerRight: () => <DrawerRight />,
        drawerStyle: {
          backgroundColor: "#FFF",
          width: 250,
        },

        headerStyle: {
          backgroundColor: "#ffaf00",
          height: 90,
          shadowColor: "#000",
          shadowOffset: {
            width: 2,
            height: 2,
          },
          shadowOpacity: 0,
          shadowRadius: 3.84,
          elevation: 15,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
        },
        headerTitleAlign: "center",
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        drawerLabelStyle: {
          color: "#111",
        },
      }}
      //  For custom content
      drawerContent={(props) => {
        return (
          <SafeAreaView>
            <View
              style={{
                height: 200,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                borderBottomColor: "#f4f4f4",
                borderBottomWidth: 1,
                paddingBottom: 12,
              }}
            >
              <Image
                source={{ uri: user?.profileUrl }}
                resizeMode="contain"
                style={{
                  height: 120,
                  width: 120,
                  borderRadius: 999,
                }}
              />

              <Text
                style={{
                  fontSize: 22,
                  marginVertical: 6,
                  fontWeight: "bold",
                  color: "#111",
                }}
              >
                {user?.username}
              </Text>

              {/* <Text
                style={{
                  fontSize: 16,
                  color: "#111",
                }}
              >
                Mobile Developer
              </Text> */}
            </View>
            <DrawerItemList {...props} />
          </SafeAreaView>
        );
      }}
    >
      <Drawer.Screen
        name="home"
        options={{
          drawerLabel: "Leaderboard",
          title: "Leaderboard",
          drawerIcon: () => (
            <Ionicons name="trophy" size={24} color="#ffaf00" />
          ),
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          drawerLabel: "Profile",
          title: "Profile",
          drawerIcon: () => (
            <Ionicons name="person" size={24} color="#ffaf00" />
          ),
        }}
      />
    </Drawer>
  );
}

// import { View, Text, Image } from "react-native";
// import React from "react";
// import { Stack } from "expo-router";
// import HomeHeader from "../../components/homeHeader";
// import { Drawer } from "../../components/homeDrawer";
// import icons from "../../constants/icons";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { DrawerItemList } from "@react-navigation/drawer";
// import DrawerRight from "../../components/drawerRight";

// export default function RootLayout() {
//   return (
//     <Drawer
//       screenOptions={{
//         headerRight: () => <DrawerRight />,
//         drawerLabelStyle: {
//           color: "#808080",
//           fontSize: 15,
//         },
//         headerTitleStyle: {
//           color: "white",
//           // Set the text color to white
//         },
//         headerTitleAlign: "center",

//         headerShadowVisible: true,
//         headerStyle: {
//           backgroundColor: "#ffaf00",
//           height: 90,
//           shadowColor: "#000",
//           shadowOffset: {
//             width: 2,
//             height: 2,
//           },
//           shadowOpacity: 0,
//           shadowRadius: 3.84,
//           elevation: 15,
//           borderBottomLeftRadius: 30,
//           borderBottomRightRadius: 30,
//         },
//       }}
//       drawerContent={(props) => {
//         return (
//           <SafeAreaView style={{ flex: 1 }}>
//             <View className="w-full h-[200px] justify-center items-center border-b border-b-[#f4f4f4] pb-3">
//               <Image
//                 source={require("../../assets/avatar.jpg")}
//                 resizeMode="contain"
//                 style={{
//                   width: 100,
//                   height: 100,
//                   borderRadius: 999,
//                 }}
//               />
//               <Text
//                 style={{
//                   fontSize: 22,
//                   marginVertical: 6,
//                   fontWeight: "bold",
//                   color: "#111",
//                 }}
//               >
//                 Yusri Saad
//               </Text>

//               <DrawerItemList {...props} />
//             </View>
//           </SafeAreaView>
//         );
//       }}
//     >
//       <Drawer.Screen
//         name="home" // This is the name of the page and must match the url from root
//         options={{
//           drawerLabel: "Home",
//           title: "Leaderboard",

//           drawerIcon: () => {
//             <Image
//               source={icons.home}
//               resizeMode="contain"
//               style={{
//                 width: 24,
//                 height: 24,
//                 tintColor: "#808080",
//               }}
//             />;
//           },
//         }}
//       />
//     </Drawer>
//   );
// }
