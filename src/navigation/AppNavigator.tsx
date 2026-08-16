import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import SupportScreen from "../screens/SupportScreen";
import HomeScreen from "../screens/HomeScreen";
import SecurityScreens from "../screens/SecurityScreens";
import ConnectScreen from "../screens/ConnectScreen";
import GuideScreen from "../screens/GuideScreen";
import GuideDetailScreen from "../screens/GuideDetailScreen";
import ContactsScreen from "../screens/ContactsScreen";
import SafeReportScreen from "../screens/SafeReportScreen";




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
        <Stack.Screen name="Guide" component={GuideScreen} />
        <Stack.Screen name="GuideDetail" component={GuideDetailScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Contacts" component={ContactsScreen} />
        <Stack.Screen name="SafeReport" component={SafeReportScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
