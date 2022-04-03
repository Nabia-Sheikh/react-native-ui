import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListingScreen from "../screens/ListingScreen";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";
import AccountScreen from "../screens/AccountScreen";
import MessagesScreen from "../screens/MessagesScreen";
import TotalBookings from "../screens/TotalBookings";

const Stack = createStackNavigator();

const AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name='Account' component={AccountScreen} />
    <Stack.Screen name='Messages' component={MessagesScreen} />
    <Stack.Screen
      options={{
        headerTitle: "Total Bookings",
      }}
      name='TotalBookings'
      component={TotalBookings}
    />
  </Stack.Navigator>
);

export default AccountNavigator;
