import { Image, StyleSheet, View, TouchableOpacity } from "react-native";
import React from "react";

import AppText from "./AppText";
import colors from "../config/colors";
import Icon from "./Icon";

const BookingItem = ({
  title,
  subTitle,
  carName,
  image,
  ImageContainer,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        {ImageContainer}
        {!image && !ImageContainer && (
          // <AntDesign name="user" size={24} color="black" />
          <Icon
            ant={true}
            name='user-outline'
            backgroundColor='brown'
            size={50}
            color='white'
          />
        )}
        {image && <Image source={image} style={styles.image} />}
        <View style={styles.descriptionContainer}>
          <AppText style={styles.title}>{title}</AppText>
          {subTitle && <AppText style={styles.subTitle}>{subTitle}</AppText>}
        </View>
        <View style={styles.verticalLine} />
        <View style={styles.descriptionContainer}>
          <AppText style={styles.title}>{carName}</AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BookingItem;

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
  verticalLine: {
    alignSelf: "center",

    height: 50,
    borderLeftWidth: 1,
    borderLeftColor: "red",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
  },
});
