import { Drawer } from "expo-router/drawer";
import { Image, View, Text } from "react-native";
import icons from "../../constants/icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { DrawerItemList } from "@react-navigation/drawer";
import DrawerRight from "../../components/drawerRight";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../context/authContext";
import { useRouter } from "expo-router";
import { Platform } from "react-native";

export default function RootLayout() {
  const { user } = useAuth();
  const route = useRouter();

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
          height: Platform.OS === "ios" ? 130 : 90,
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
                borderBottomColor: "#ebeae8",
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
                  borderWidth: 2,
                  borderColor: "gray",
                }}
              />

              <Text
                style={{
                  fontSize: 22,
                  marginVertical: 6,
                  fontWeight: "bold",
                  color: "#808080",
                  paddingTop: 10,
                }}
              >
                {user?.username}
              </Text>
            </View>
            <DrawerItemList {...props} />
          </SafeAreaView>
        );
      }}
    >
      <Drawer.Screen
        name="home"
        options={{
          drawerActiveBackgroundColor: "#fcf5e6",
          drawerLabel: "Leaderboard",
          drawerLabelStyle: {
            color: "#808080",
          },
          title: "Leaderboard",
          drawerIcon: () => (
            <Ionicons name="trophy" size={30} color="#ffaf00" />
          ),
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          drawerActiveBackgroundColor: "#fcf5e6",
          drawerLabel: "Profile",
          drawerLabelStyle: {
            color: "#808080",
          },
          title: "Profile",
          drawerIcon: () => (
            <Ionicons name="person" size={30} color="#ffaf00" />
          ),
        }}
      />
      <Drawer.Screen
        name="(english)/vocab"
        options={{
          drawerActiveBackgroundColor: "#fcf5e6",
          drawerLabelStyle: {
            color: "#808080",
          },
          drawerLabel: "Vocabulary",
          title: "Vocabulary",
          drawerIcon: () => (
            <Ionicons name="basketball" size={30} color="#ffaf00" />
          ),
        }}
      />
      <Drawer.Screen
        name="(english)/addVocab"
        options={{
          drawerActiveBackgroundColor: "#fcf5e6",
          drawerStatusBarAnimation: "fade",
          drawerLabelStyle: {
            color: "#808080",
          },
          drawerLabel: "Add Word",
          title: "Vocabulary",
          drawerIcon: () => <Ionicons name="add" size={30} color={"#ffaf00"} />,
        }}
      />
    </Drawer>
  );
}
