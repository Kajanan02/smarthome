import React from "react";
import HomeScreen from "../screens/Home/homeScreen";
import AnalyticsScreen from "../screens/Analytics/AnalyticsScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Layers, Settings } from "react-native-feather";
import SettingsScreen from "../screens/Settings/settingsScreen";

const Tab = createBottomTabNavigator();

function TabsNavigation(props) {
  return (
    <Tab.Navigator sceneContainerStyle={{backgroundColor:"#fff"}}   screenOptions={({ route }) => ({
      headerShown: false,
      tabBarStyle: {
        height: 70,
        backgroundColor: '#fff',
        borderTopWidth: 0,

      },
    })}>
      <Tab.Screen   options={{
        tabBarShowLabel: false,
        tabBarIcon: ({focused, color, size }) => (
          <Home color={focused ? "#ffb34b" :"gray"} size={size} />
        ),
      }} name="Home" component={HomeScreen} />
      <Tab.Screen name="Analytics" options={{
        tabBarShowLabel: false,
        tabBarIcon: ({focused, color, size }) => (
          <Layers color={focused ? "#ffb34b" :"gray"} size={size} />
        ),
      }}component={AnalyticsScreen} />
      <Tab.Screen name="Settings" options={{
        tabBarShowLabel: false,
        tabBarIcon: ({focused, color, size }) => (
          <Settings color={focused ? "#ffb34b" :"gray"} size={size} />
        ),
      }}component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default TabsNavigation;
