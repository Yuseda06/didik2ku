import { View, Text, Dimensions } from "react-native";
import React from "react";
import { BarChart, PieChart } from "react-native-gifted-charts";

export default function Chart() {
  const width = Dimensions.get("window").width;
  const barData = [
    { value: 230, label: "Jan", frontColor: "#4ABFF4" },
    { value: 180, label: "Feb", frontColor: "#79C3DB" },
    { value: 195, label: "Mar", frontColor: "#28B2B3" },
    { value: 250, label: "Apr", frontColor: "#4ADDBA" },
    { value: 320, label: "May", frontColor: "#91E3E3" },
  ];

  const pieData = [
    {
      value: 80,
      color: "#009FFF",
      gradientCenterColor: "#006DFF",

      focused: true,
    },
    { value: 40, color: "#93FCF8", gradientCenterColor: "#3BE9DE" },
    { value: 16, color: "#BDB2FA", gradientCenterColor: "#8F80F3" },
    { value: 3, color: "#FFA5BA", gradientCenterColor: "#FF7F97" },
  ];
  return (
    <View className="flex pt-20 self-center">
      <BarChart
        showFractionalValue
        showYAxisIndices
        noOfSections={4}
        maxValue={400}
        data={barData}
        isAnimated
      />

      <View style={{ padding: 20, alignItems: "center" }}>
        <PieChart
          data={pieData}
          donut
          showGradient
          sectionAutoFocus
          radius={90}
          innerRadius={60}
          focusOnPress
          isAnimated
          innerCircleColor={"#232B5D"}
          centerLabelComponent={() => {
            return (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text
                  style={{ fontSize: 22, color: "white", fontWeight: "bold" }}
                >
                  47%
                </Text>
                <Text style={{ fontSize: 14, color: "white" }}>Excellent</Text>
              </View>
            );
          }}
        />
      </View>
    </View>
  );
}
