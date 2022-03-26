import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AccountScreen from "../screens/AccountScreen";
import ListingEditScreen from "../screens/ListingEditScreen";
import ListingScreen from "../screens/ListingScreen";
import FeedNavigator from "./FeedNavigator";
import AccountNavigator from "./AccountNavigator";
import NewListingButton from "./NewListingButton";

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name='home' color={color} size={size} />
        ),
      }}
      name='Feed'
      component={FeedNavigator}
    />
    <Tab.Screen
      options={({ navigation }) => ({
        tabBarButton: () => (
          <NewListingButton
            onPress={() => navigation.navigate("ListingEdit")}
          />
        ),
      })}
      name='ListingEdit'
      component={ListingEditScreen}
    />
    <Tab.Screen
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name='account' color={color} size={size} />
        ),
      }}
      name='Account'
      component={AccountNavigator}
    />
  </Tab.Navigator>
);

export default AppNavigator;
