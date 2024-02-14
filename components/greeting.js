import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const GreetingText = ({ user }) => {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      setGreeting("Good morning!");
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting("Good afternoon!");
    } else {
      setGreeting("Good evening!");
    }
  }, []); // The empty dependency array ensures that this effect runs once on component mount

  return (
    <View>
      <Text style={{ fontSize: hp(1.7), color: "white" }}>{greeting}</Text>

      <Text style={{ fontSize: hp(1.7), color: "white" }} className="font-bold">
        {user}
      </Text>
    </View>
  );
};

export default GreetingText;
