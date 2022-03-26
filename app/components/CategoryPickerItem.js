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
          size={80}
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
    paddingVertical: 15,
    alignItems: "center",
    width: "33%",
  },
  text: {
    marginTop: 5,
    textAlign: "center",
  },
});
