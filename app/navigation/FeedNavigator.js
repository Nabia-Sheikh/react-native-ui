import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import routes from "./routes";
import ListingScreen from "../screens/ListingScreen";
import ListingDetailsScreen from "../screens/ListingDetailsScreen";
import PaymentScreen from "../screens/PaymentScreen";

const Stack = createStackNavigator();

const FeedNavigator = () => (
  <Stack.Navigator mode='card'>
    <Stack.Screen
      options={{
        headerShown: false,
      }}
      name='Listings'
      component={ListingScreen}
    />
    <Stack.Screen
      options={{
        headerTitle: "Listing Details",
      }}
      name={routes.LISTING_DETAILS}
      component={ListingDetailsScreen}
    />
    <Stack.Screen name={"Payment"} component={PaymentScreen} />
  </Stack.Navigator>
);

export default FeedNavigator;
