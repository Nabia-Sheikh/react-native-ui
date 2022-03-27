import { FlatList, StyleSheet, View } from "react-native";
import React from "react";

import listingsAPI from "../api/listing";

import Card from "../components/Card";
import routes from "../navigation/routes";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import ActivityIndicator from "../components/ActivityIndicator";
import useApi from "../hooks/useApi";
import CategoryPickerItem from "../components/CategoryPickerItem";

const ListingScreen = ({ navigation }) => {
  const {
    data: listings,
    error,
    setData,
    allData,
    isLoading: loading,
    request: loadListings,
  } = useApi(listingsAPI.getListings);
  const [carsData, setCarsData] = React.useState([]);

  const handleCategory = (category) => {
    if (category === "All") {
      setData(allData);
    } else {
      setData(allData.filter((listing) => listing.category === category));
    }
  };
  React.useEffect(() => {
    loadListings();
    setCarsData(listings);
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
    { !loading && <View style={styles.categories}>
        <CategoryPickerItem
          item={{
            backgroundColor: "green",
            icon: "arrow-expand-all",
            label: "All Cars",
            value: 1,
          }}
          onPress={() => handleCategory("All")}
        />
        <CategoryPickerItem
          item={{
            backgroundColor: "blue",
            icon: "car-convertible",
            label: "SUV",
            value: 1,
          }}
          onPress={() => handleCategory("SUV")}
        />
        <CategoryPickerItem
          item={{
            backgroundColor: "brown",
            icon: "car-sports",
            label: "Coupe",
            value: 1,
          }}
          onPress={() => handleCategory("Coupe")}
        />
      </View>}
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

const styles = StyleSheet.create({
  categories: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 15,
  },
});
