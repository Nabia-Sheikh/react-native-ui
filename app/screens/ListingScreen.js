import { FlatList, StyleSheet, View } from "react-native";
import React from "react";

import listingsAPI from "../api/listing";

import Card from "../components/Card";
import routes from "../navigation/routes";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import ActivityIndicator from "../components/ActivityIndicator";
import useApi from "../hooks/useApi";

const ListingScreen = ({ navigation }) => {
  const {
    data: listings,
    error,
    isLoading: loading,
    request: loadListings,
  } = useApi(listingsAPI.getListings);

  React.useEffect(() => {
    loadListings();
    console.log(listings);
  }, []);

  return (
    <>
      {error && (
        <>
          <AppText>Couldn't retrive the listings</AppText>
          <AppButton text='Retry' onPress={loadListings} />
        </>
      )}

      {loading && <ActivityIndicator visible={true} />}

      <FlatList
        data={listings}
        keyExtractor={(listing) => listing._id.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.name}
            price={item.price}
            imageURL={item.image}  
            onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
          />
        )}
      />
    </>
  );
};

export default ListingScreen;

const styles = StyleSheet.create({});
