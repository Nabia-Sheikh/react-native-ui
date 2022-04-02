import { StyleSheet } from "react-native";
import React from "react";
import AppText from "./AppText";

const ErrorMessage = ({ style, visible, error }) => {
  if (!visible || !error) return null;
  return <AppText style={[styles.error, style]}>{error}</AppText>;
};

export default ErrorMessage;

const styles = StyleSheet.create({
  error: {
    color: "#b00020",
  },
});
