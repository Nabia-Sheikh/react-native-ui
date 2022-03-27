import { Image, StyleSheet, View, TouchableOpacity } from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import AppText from "./AppText";
import colors from "../config/colors";
import Icon from "./Icon";

const ListItem = ({ title, subTitle, image, ImageContainer, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        {ImageContainer}
        {(!image && !ImageContainer) && (
          <Icon
            name='circle'
            backgroundColor='yellowgreen'
            size={50}
            color='white'
          />
        )}
        {image && <Image source={image} style={styles.image} />}
        <View style={styles.descriptionContainer}>
          <AppText style={styles.title}>{title}</AppText>
          {subTitle && <AppText style={styles.subTitle}>{subTitle}</AppText>}
        </View>
        <MaterialCommunityIcons
          name='chevron-right'
          size={20}
          color={colors.medium}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    padding: 8,
  },
  descriptionContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginVertical: 5,
  },
  subTitle: {
    fontSize: 14,
    color: colors.medium,
  },
});
