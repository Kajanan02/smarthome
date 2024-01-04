import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

function AnalyticsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Analytics Screen</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text style={{ color: "#000" }}>Analytics Screen</Text>
      </TouchableOpacity>
    </View>
  );
}

export default AnalyticsScreen;
