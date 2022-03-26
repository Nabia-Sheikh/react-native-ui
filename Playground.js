import {
  useDimensions,
  useDeviceOrientation,
} from "@react-native-community/hooks";
import { useState } from "react";
import {
  SafeAreaView,
  Dimensions,
  StyleSheet,
  StatusBar,
  Text,
  Image,
  TouchableNativeFeedback,
  View,
  Button,
  Alert,
  Platform,
  Switch,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import L from "./app/components/AppPicker";
import ImageInput from "./app/components/ImageInput";
import ImageInputList from "./app/components/ImageInputList";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import LogInScreen from "./app/screens/LogInScreen";
import WelcomeScreen from "./app/screens/WelcomeScreen";

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const StackNavigator = () => (
  <Stack.Navigator
    initialRouteName='Welcome'
    screenOptions={{
      headerTitleAlign: "center",
      headerTintColor: "white",
      headerStyle: {
        backgroundColor: "tomato",
        borderRadius: 50,
      },
    }}
  >
    <Stack.Screen name='Welcome' component={WelcomeScreen} />
    <Stack.Screen
      options={({ route }) => ({
        // headerShown: false,
        // title: route.params.message,
        // title: "Log In Screen title",
        headerTitle: "Log In Screen",
        headerTitleAlign: "center",
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "tomato",
          borderRadius: 50,
        },
      })}
      name='Login'
      component={LogInScreen}
    />
  </Stack.Navigator>
);

const TabNavigator = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeBackgroundColor: "blue",
      activeTintColor: "white",
      inactiveTintColor: "darkgray",
      labelStyle: {
        fontSize: 12,
        alignContent: "center",
        alignItems: "center",
        justifyContent: "center",
      },
    }}
  >
    <Tab.Screen
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name='home' color={color} size={size} />
        ),
      }}
      name='Welcome'
      component={WelcomeScreen}
    />
    <Tab.Screen name='Login' component={StackNavigator} />
  </Tab.Navigator>
);

const categories = [
  { label: "SHIRTS", value: 1 },
  { label: "HOODIES", value: 2 },
  { label: "HATS", value: 3 },
  { label: "Googles", value: 4 },
];

export default function Playground() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [category, setCategory] = useState();

  // * Image Picker

  const [imageUris, setimageUris] = useState([]);

  //* Get Dimensions
  // console.log(Dimensions.get("window"));

  //* Get Orientation
  const { landscape } = useDeviceOrientation();
  //* useDimensions
  // console.log(useDimensions());

  const handleClick = (clicked) => {
    Alert.alert("Message", clicked, [
      { text: "OK", onPress: () => console.log("OK Pressed") },
      { text: "Cancel", onPress: () => console.log("Cancel Pressed") },
    ]);
    // Alert.prompt("Message", "Enter your name", (text) => console.log(text));
  };

  const handleAdd = (uri) => {
    setimageUris([...imageUris, uri]);
  };

  const handleRemove = (uri) => {
    setimageUris(imageUris.filter((imageUri) => imageUri !== uri));
  };

  return (
    <NavigationContainer style={styles.container}>
      <TabNavigator />

      {/*Image Picker */}
      {/* <ImageInputList
        onAddImage={handleAdd}
        onRemoveImage={handleRemove}
        onChangeImage={(uri) => setimageUris(uri)}
        imageUris={imageUris}
      /> */}

      {/* Text Chapter
      -------------------------------------------------------------- */}
      {/* <Text
        style={{ color: "black" }}
        numberOfLines={1}
        onPress={() => handleClick("Text Clicked")}
      >
        Hello React Native
      </Text> */}
      {/* Toucalbe Chapter
      ---------------------------------------------------------------------------------------------------- */}
      {/* <TouchableNativeFeedback onPress={() => handleClick("Image Clicked")}>
        <View
          style={{ width: 100, height: 100, backgroundColor: "dodgerblue" }}
        />
        <Image
          fadeDuration={2000}
          blurRadius={0}
          source={{
            width: 200,
            height: 200,
            uri: "https://picsum.photos/200",
          }}
        />
      </TouchableNativeFeedback>
      <Button
        color={"orange"}
        title='Click Me'
        onPress={() => handleClick("Button Clicked")}
      /> */}
      {/* Dimensions Chapter
      ---------------------------------------------------------------------------------------------------- */}
      {/* <View
        style={{
          width: "100%",
          height: landscape ? "100%" : "50%",
          backgroundColor: "red",
        }}
      ></View> */}
      {/* Flex Chapter
      ---------------------------------------------------------------------------------------------------- */}
      {/* <View
        style={{
          backgroundColor: "white",
          flex: 1,
          flexDirection: "row", //* Used to set the direction of the layout or for the main axis
          justifyContent: "center", // * Justify property is used for Main or Primary axis
          alignItems: "center", //* Align property is used for secondary or Cross axis
          //* When we use flexWrap , alignItems is work differently, it will align the items on each line
          flexWrap: "wrap",
          //*To overcome from the problem of the alignItems , we will use the alignContent property, which is used for align content on entire screen
          alignContent: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "green",
            // flexBasis: 100, //* flexBasis is used to set the width or height of the item
            // flexGrow: 1, //* flexGrow is same as flex, it fills the available space
            width: 100,
            height: 100,
            alignSelf: "center",
            //* Flex Shrink property is used to shrink the view when the space is not enough
            //! Flex is shorthand of flexShrink, and flexGrow
            // flexShrink: 1,
            //! Or
            // flex: -1,
          }}
        />
        <View
          style={{
            backgroundColor: "gold",
            width: 100,
            height: 100,
            //* Positioning
            //! By default, the position is relative to the parent
            position: "absolute",
            //* When we use relative position, the other items will not affected
            //* When we use absolute position, the other items will be affected
            //! To set the position of the view to the top left corner of the parent
            top: 100,
            bottom: 100,
          }}
        />
        <View
          style={{
            backgroundColor: "tomato",
            width: 100,
            height: 100,
          }}
        />
        <View
          style={{
            backgroundColor: "tomato",
            width: 100,
            height: 100,
          }}
        />
      </View> */}
      {/* Switch */}
      {/* <Switch
        value={isEnabled}
        onValueChange={() => setIsEnabled((previousState) => !previousState)}
      /> */}

      {/* Custome Picker */}
      {/* <L
        selectedItem={category}
        onSelectItem={(item) => setCategory(item)}
        items={categories}
        icon={"apps"}
        placeholder={"Select your favorite"}
      /> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
