import React from "react";
import { StyleSheet, View, Image } from "react-native";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import Card from "../components/Card";
import ListItem from "../components/ListItem";
import colors from "../config/colors";

const ListingDetailsScreen = ({ route, navigation }) => {
  const listing = route.params;

  const handleBooking = () => {
    navigation.navigate("Payment", {
      listing,
    });
  };

  return (
    <View>
      <Image
        style={styles.image}
        source={{
          uri: listing.image,
        }}
      />
      <View style={styles.detailsContainer}>
        <AppText style={styles.title}>{listing.name}</AppText>
        <AppText style={styles.price}>Rs. {listing.price}/=</AppText>
      </View>
      <AppText style={styles.descriptionHeading} >Description</AppText>
      <AppText style={styles.description}>
        {listing.description}
      </AppText>
     <AppButton text="Book Now" color="primary" onPress={handleBooking} />
    </View>
  );
};

const styles = StyleSheet.create({
  userContainer: {
    marginVertical: 10,
  },
  image: {
    width: "100%",
    height: 200,
  },
  detailsContainer: {
    padding: 10,
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
  descriptionHeading: {
    paddingHorizontal: 20,
    color: colors.primary,
    fontSize: 20,
    fontWeight: "500",
    marginVertical: 10,
  },
  description: {
    color: colors.medium,
    padding: 20,
    alignSelf: "center",
    textAlign: "justify",
    fontSize: 16,
    lineHeight: 24,
  },
});

export default ListingDetailsScreen;
