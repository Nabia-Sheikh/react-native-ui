import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import AppText from "./AppText";
import Icon from "./Icon";

const CategoryPickerItem = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View>
        <Icon
          name={item.icon}
          size={70}
          backgroundColor={item.backgroundColor}
        />
        <AppText style={styles.text}>{item.label}</AppText>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryPickerItem;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingTop: 10,
    alignItems: "center",
    width: "33%",
  },
  text: {
    marginTop: 2,
    textAlign: "center",
  },
});
