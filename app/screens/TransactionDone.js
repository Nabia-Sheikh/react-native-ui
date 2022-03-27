import React from "react";
import { View, StyleSheet, Modal } from "react-native";
import LottieView from "lottie-react-native";
import AppText from "../components/AppText";


function TransactionDone({ message, onDone, visible = false }) {
  return (
    <Modal visible={visible}>
      <View style={styles.container}>
          <LottieView
            autoPlay
            loop={false}
            onAnimationFinish={onDone}
            source={require("../assets/animations/done.json")}
            style={styles.animation}
              />
              <AppText>{message}</AppText>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  animation: {
    width: 150,
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});

export default TransactionDone;
