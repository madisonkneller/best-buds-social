import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
  MatchesScreen,
  SettingsScreen,
  SingleChatRoom,
  SetLocationScreen,
  LoginScreen,
  RegistrationScreen,
  HomeScreen,
  CurrentUserScreen,
  SingleMatchProfile,
} from "../screens/index";

const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "white",
  },
  headerTintColor: "#5271FF",
  headerBackTitle: "Back",
};

export function MainStackNavigator() {
  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
      </Stack.Navigator>
    </>
  );
}

export function CurrentUserNavigator() {
  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="CurrentUser" component={CurrentUserScreen} />
        <Stack.Screen name="Matches" component={MatchesScreen} />
      </Stack.Navigator>
    </>
  );
}

export function SingleMatchNavigator() {
  return (
    <>
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="SingleMatch" component={SingleMatchProfile} />
      </Stack.Navigator>
    </>
  );
}

export function HomeStackNavigator() {
  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="SingleMatch" component={SingleMatchProfile} />
      </Stack.Navigator>
    </>
  );
}

export function MatchesStackNavigator() {
  //"SingleChat" is nested inside "Matches", so can navigate from "Matches" to "SingleChatRoom"
  return (
    <>
      <Stack.Navigator screenOptions={screenOptionStyle}>
        <Stack.Screen name="Matches" component={MatchesScreen} />
        <Stack.Screen
          name="Best Buds Private Chat! 🐶"
          component={SingleChatRoom}
        />
      </Stack.Navigator>
    </>
  );
}

export function SettingsStackNavigator() {
  //"SetLocation" is nested inside "Settings", so can navigate from "Settings" to "SetLocation"
  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="SetLocation" component={SetLocationScreen} />
      </Stack.Navigator>
    </>
  );
}
