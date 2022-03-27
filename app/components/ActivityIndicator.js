import React from "react";
import LottieView from "lottie-react-native";
import { View, StyleSheet } from "react-native";

const ActivityIndicator = ({ visible = true }) => {
  console.log(visible);
  if (!visible) return null;
  return (
    <View style={styles.container}>
      <LottieView
        style={{
          width: "100%",
          height: "100%",
        }}
        source={require("./../assets/animations/loader.json")}
        autoPlay={true}
        loop={true}
      />
    </View>
  );
};

export default ActivityIndicator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
