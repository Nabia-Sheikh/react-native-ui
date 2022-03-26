import React from "react";
import { Image, StyleSheet, View, TouchableOpacity } from "react-native";
import AppText from "./AppText";
import colors from "../config/colors";

const Card = ({ title, price, imageURL, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <Image
          style={styles.image}
          source={{
            uri: imageURL,
          }}
        />
        <View style={styles.detailsContainer}>
          <AppText style={styles.title}>{title}</AppText>
          <AppText style={styles.price}>Rs. {price}/=</AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: 15,
    margin: 20,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 200,
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  price: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.secondary,
    marginVertical: 10,
  },
});

export default Card;
