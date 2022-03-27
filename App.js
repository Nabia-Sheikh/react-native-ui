import { SafeAreaView, StyleSheet, Platform, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState } from "react";
import colors from "./app/config/colors";
import ListingDetailsScreen from "./app/screens/ListingDetailsScreen";
import ListingScreen from "./app/screens/ListingScreen";
import { AuthNavigator } from "./app/navigation/AuthNavigator";
import myTheme from "./app/navigation/navigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";
import AuthContext from "./app/auth/context";
import authStorage from "./app/auth/storage";
import AppLoading from "expo-app-loading";

export default function App() {
  const [user, setUser] = useState();
  const [selectedPkg, setSelectedPkg] = useState();
  const [isReady, setLoadingComplete] = useState(false);

  const restoreUser = async () => {
    try {
      const userData = await authStorage.getUser();
      setUser(JSON.parse(userData));
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
    <AuthContext.Provider
      value={{ user, setUser, selectedPkg, setSelectedPkg }}
    >
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
