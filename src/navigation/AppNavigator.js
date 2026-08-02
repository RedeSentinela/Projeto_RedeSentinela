import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import SupportScreen from "../screens/SupportScreen";
import HomeScreen from "../screens/HomeScreen";
import SecurityScreens from "../screens/SecurityScreens";
import ConnectScreen from "../screens/ConnectScreen";



const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Support" component={SupportScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Security" component={SecurityScreens} />
        <Stack.Screen name="Connect" component={ConnectScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
