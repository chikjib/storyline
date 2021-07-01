import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

//Import Screens
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import { Colors } from "../components/styles";
const { primary, tertiary, green, brand } = Colors;

const Stack = createStackNavigator();

export default function AuthNavigationRoutes() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          title: "Sign Up",
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
