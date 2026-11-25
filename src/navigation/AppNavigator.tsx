import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/welcome/Welcome";
import SupportScreen from "../screens/SupportScreen";
import SecurityScreens from "../screens/SecurityScreens";
import ConnectScreen from "../screens/ConnectScreen";
import GuideScreen from "../screens/GuideScreen";
import GuideDetailScreen from "../screens/GuideDetailScreen";
import ContactsScreen from "../screens/ContactsScreen";
import SafeReportScreen from "../screens/SafeReportScreen";
import LoadingScreen from "../screens/LoadingScreen";
import IntroScreen from "../screens/IntroScreen";
import UserTypeScreen from "../screens/UserTypeScreen";
import SignupUserScreen from "../screens/SignupUserScreen";
import SignupOrgScreen from "../screens/SignupOrgScreen";
import LoginUserScreen from "../screens/LoginUserScreen";
import LoginOrgScreen from "../screens/LoginOrgScreen";
import SearchHelpScreen from "../screens/SearchHelpScreen";
import RiskAnalysisScreen from "../screens/RiskAnalysisScreen";




const Stack = createNativeStackNavigator();

// Caminho de cada tela no navegador (versão web), ex: /analise-risco
const linking = {
  prefixes: [],
  config: {
    screens: {
      // comum aos dois fluxos
      Loading: "",
      Intro: "welcome",
      UserType: "user-type",
      // fluxo 1: usuária comum
      SignupUser: "cadastro/usuario",
      LoginUser: "login/usuario",
      Welcome: "passo-1",
      Support: "passo-2",
      Security: "passo-3",
      Connect: "passo-4",
      SearchHelp: "home",
      SafeReport: "registro-seguro",
      Contacts: "perfil",
      Guide: "guia",
      GuideDetail: "guia/detalhe",
      // fluxo 2: ONGs
      SignupOrg: "cadastro/organizacao",
      LoginOrg: "login/organizacao",
      RiskAnalysis: "analise-risco",
    },
  },
};

const onboardingScreenOptions = {
  headerShown: false,
  animation: "slide_from_right" as const,
  animationDuration: 700,
  gestureEnabled: true,
  fullScreenGestureEnabled: true,
};

export default function AppNavigator() {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator id="RootStack" initialRouteName="Loading" screenOptions={{ headerShown: false }}>
        {/* ---- comum aos dois fluxos ---- */}
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Intro" component={IntroScreen} />
        <Stack.Screen name="UserType" component={UserTypeScreen} />

        {/* ---- fluxo 1: usuária comum ---- */}
        <Stack.Screen name="SignupUser" component={SignupUserScreen} />
        <Stack.Screen name="LoginUser" component={LoginUserScreen} />
        {/* boas-vindas com passo a passo (depois do login) */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={onboardingScreenOptions} />
        <Stack.Screen name="Support" component={SupportScreen} options={onboardingScreenOptions} />
        <Stack.Screen name="Security" component={SecurityScreens} options={onboardingScreenOptions} />
        <Stack.Screen name="Connect" component={ConnectScreen} options={onboardingScreenOptions} />
        {/* Home = Busque Ajuda; menu: Registro Seguro, Meu Perfil, Guia de Apoio */}
        <Stack.Screen name="SearchHelp" component={SearchHelpScreen} />
        <Stack.Screen name="SafeReport" component={SafeReportScreen} />
        <Stack.Screen name="Contacts" component={ContactsScreen} />
        <Stack.Screen name="Guide" component={GuideScreen} />
        <Stack.Screen name="GuideDetail" component={GuideDetailScreen} />

        {/* ---- fluxo 2: ONGs ---- */}
        <Stack.Screen name="SignupOrg" component={SignupOrgScreen} />
        <Stack.Screen name="LoginOrg" component={LoginOrgScreen} />
        {/* Home da ONG = SafeSpace / Análise de Áreas de Risco */}
        <Stack.Screen name="RiskAnalysis" component={RiskAnalysisScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
