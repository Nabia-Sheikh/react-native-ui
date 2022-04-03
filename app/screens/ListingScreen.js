import { FlatList, StyleSheet, View } from "react-native";
import React from "react";

import listingsAPI from "../api/listing";
import AppFormPicker from "../components/AppFormPicker";
import Card from "../components/Card";
import routes from "../navigation/routes";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import ActivityIndicator from "../components/ActivityIndicator";
import useApi from "../hooks/useApi";
import CategoryPickerItem from "../components/CategoryPickerItem";
import ModalSelector from "react-native-modal-selector";
import colors from "../config/colors";

let index = 0;
const data = [
  { key: index++, label: "All Cars" },
  { key: index++, label: "SUV" },
  { key: index++, label: "Coupe" },
];

const ListingScreen = ({ navigation }) => {
  const {
    data: listings,
    error,
    setData,
    allData,
    isLoading: loading,
    request: loadListings,
  } = useApi(listingsAPI.getListings);
  const [secondModal, setSecondModal] = React.useState(false);
  const [subCategory, setSubCategory] = React.useState([]);

  const handleCategory = (category) => {
    if (category === "All") {
      setData(allData);
    } else {
      setData(
        allData.filter((listing) => listing.subCategory === category.label)
      );
    }
  };

  React.useEffect(() => {
    loadListings();
  }, []);

  const categorySelector = (data) => {
    if (data.label === "All Cars") {
      setSecondModal(false);
      setData(allData);
      return;
    }
    if (data.label === "SUV") {
      setSecondModal(true);
      setSubCategory([
        { key: index++, section: true, label: "Select Sub category" },
        { key: index++, label: "NISAN" },
        { key: index++, label: "BMW" },
        { key: index++, label: "CHEV" },
        { key: index++, label: "AUDI" },
        { key: index++, label: "MERCEDES" },
        { key: index++, label: "COMPACT" },
        { key: index++, label: "FORD" },
      ]);
    } else {
      setSecondModal(true);
      setSubCategory([
        { key: index++, section: true, label: "Select Sub category" },
        { key: index++, label: "TOYOTA" },
        { key: index++, label: "HONDA" },
      ]);
    }

    setSecondModal(true);
  };

  return (
    <>
      {error && (
        <>
          <AppText>Couldn't retrive the listings</AppText>
          <AppButton text='Retry' onPress={loadListings} />
        </>
      )}
      {loading && <ActivityIndicator visible={true} />}

      {!loading && (
        <ModalSelector
          onModalOpen={() => setSecondModal(false)}
          style={styles.modal}
          touchableStyle={styles.touchable}
          selectTextStyle={styles.selectText}
          initValueTextStyle={styles.textStyle}
          cancelTextStyle={styles.cancelText}
          data={data}
          animationType='fade'
          initValue='Select Category!'
          onChange={(option) => {
            categorySelector(option);
          }}
        />
      )}

      {secondModal && (
        <ModalSelector
          style={styles.modal}
          touchableStyle={styles.touchable}
          selectTextStyle={styles.selectText}
          initValueTextStyle={styles.textStyle}
          cancelTextStyle={styles.cancelText}
          data={subCategory}
          visible={secondModal}
          initValue='Select Sub Category!'
          onChange={(option) => {
            handleCategory(option);
          }}
        />
      )}

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
  modal: {
    marginTop: 5,
    padding: 10,
    color: "white",
    borderColor: "black",
  },
  picker: {
    // hidden
    display: "none",
  },
  touchable: {
    backgroundColor: colors.primary,
    fontWeight: "bold",
    borderRadius: 5,
    color: colors.primary,
  },
  selectText: {
    color: colors.white,
    fontWeight: "bold",
  },
  textStyle: {
    color: colors.white,
    fontWeight: "bold",
  },
  cancelText: {
    color: colors.primary,
    textTransform: "uppercase",
  },
});
