import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppTextInput from "../components/AppTextInput";

const Form = () => {
  return (
    <View>
      <AppTextInput icon='email' placeholder='Email' />
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({});
