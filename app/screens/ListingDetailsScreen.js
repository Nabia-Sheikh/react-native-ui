import React from "react";
import { StyleSheet, ScrollView, View, Image } from "react-native";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import colors from "../config/colors";

import PackagesCard from "../components/PackagesCard";
import AuthContext from "../auth/context";
const ListingDetailsScreen = ({ route, navigation }) => {
  const listing = route.params;
  const { selectedPkg } = React.useContext(AuthContext);
  const handleBooking = () => {
    if (selectedPkg) {
      navigation.navigate("Payment", {
        listing,
      });
    } else {
      alert("Please select package");
    }
  };

  return (
    <ScrollView>
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
      <View>
        <PackagesCard category={listing.category} />
      </View>
      <AppText style={styles.descriptionHeading}>Description</AppText>
      <AppText style={styles.description}>{listing.description}</AppText>
      <AppButton
        style={{ marginBottom: 30 }}
        text='Book Now'
        color='primary'
        onPress={handleBooking}
      />
    </ScrollView>
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
