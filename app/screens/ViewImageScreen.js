import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../config/colors";

function ViewImageScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.closeIcon}>
        <MaterialCommunityIcons name='close' size={35} color={colors.white} />
      </View>
      <View style={styles.deleteIcon}>
        <MaterialCommunityIcons
          name='trash-can-outline'
          size={35}
          color={colors.white}
        />
      </View>

      <Image
        resizeMode='contain'
        style={styles.image}
        source={require("../assets/chair.jpg")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    flex: 1,
  },
  closeIcon: {
    position: "absolute",
    left: 30,
    top: 40,
  },
  deleteIcon: {
    position: "absolute",
    right: 30,
    top: 40,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default ViewImageScreen;
