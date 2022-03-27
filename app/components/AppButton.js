import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import colors from "../config/colors";

const AppButton = ({ style, text, onPress, color = "primary", disabled }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        style,
        { backgroundColor: colors[color] },
        disabled && { backgroundColor: colors.medium },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    marginVertical: 10,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  invalid: {
    backgroundColor: colors.light,
  },
});

export default AppButton;
