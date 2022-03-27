import { SafeAreaView, StyleSheet, Platform, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "./app/config/colors";
import AccountScreen from "./app/screens/AccountScreen";
import Form from "./app/screens/Form";
import ListingDetailsScreen from "./app/screens/ListingDetailsScreen";
import ListingEditScreen from "./app/screens/ListingEditScreen";
import ListingScreen from "./app/screens/ListingScreen";
import LogInScreen from "./app/screens/LogInScreen";
import MessagesScreen from "./app/screens/MessagesScreen";
import ViewImageScreen from "./app/screens/ViewImageScreen";
import WelcomeScreen from "./app/screens/WelcomeScreen";
import Playground from "./Playground";
import { AuthNavigator } from "./app/navigation/AuthNavigator";
import myTheme from "./app/navigation/navigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
import  AppLoading  from "expo-app-loading";

const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();

const CardsStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name='listings' component={ListingScreen} />
    <Stack.Screen name='details' component={ListingDetailsScreen} />
  </Stack.Navigator>
);

const TabsNavigator = () => (
  <Tabs.Navigator
    tabBarOptions={{
      activeTintColor: colors.primary,
      inactiveTintColor: colors.accent,
      labelStyle: { fontSize: 14 },
    }}
  >
    <Tabs.Screen
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name='home' color={color} size={size} />
        ),
      }}
      name='Feed'
      component={ListingScreen}
    />
    <Tabs.Screen name='AddCard' component={CardsStackNavigator} />
    <Tabs.Screen
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name='account' color={color} size={size} />
        ),
      }}
      name='Account'
      component={AccountScreen}
    />
  </Tabs.Navigator>
);

export default function App() {
  const [user, setUser] = useState();
  const [selectedPkg, setSelectedPkg] = useState();
  const [isReady, setLoadingComplete] = useState(false);

  const restoreUser = async () => {
    try {
      const userData = await authStorage.getUser();
      setUser(JSON.parse(userData));
      console.log("check user", userData);
    } catch (error) {
      console.log("Error restoring user");
    }
  };

  if (!isReady) {
    return (
      <AppLoading
        startAsync={restoreUser}
        onFinish={() => setLoadingComplete(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <AuthContext.Provider value={{ user, setUser, selectedPkg, setSelectedPkg }}>
      <NavigationContainer theme={myTheme}>
        <SafeAreaView style={styles.container}>
          {user ? <AppNavigator /> : <AuthNavigator />}
        </SafeAreaView>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: colors.white,
  },
});
