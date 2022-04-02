import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeScreen from "../screens/WelcomeScreen";
import LogInScreen from "../screens/LogInScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import ResetCode from "../screens/ResetCodeScreen";
import NewPassScreen from "../screens/NewPassScreen";

const Stack = createStackNavigator();

export const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name='Welcome'
      component={WelcomeScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen name='Login' component={LogInScreen} />
    <Stack.Screen name='Register' component={RegisterScreen} />
    <Stack.Screen name='Forgot-password' component={ForgotPasswordScreen} />
    <Stack.Screen name='ResetCode' component={ResetCode} />
    <Stack.Screen name='NewPass' component={NewPassScreen} />
  </Stack.Navigator>
);
