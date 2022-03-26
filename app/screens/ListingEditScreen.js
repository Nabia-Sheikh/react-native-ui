import { StyleSheet, Text, View } from "react-native";
import React from "react";
import * as Yup from "yup";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import listingsApi from "../api/listing";

import AppForm from "../components/AppForm";
import AppFormField from "../components/AppFormField";
import AppFormPicker from "../components/AppFormPicker";
import SubmitButton from "../components/SubmitButton";
import CategoryPickerItem from "../components/CategoryPickerItem";
import AppFormImagePicker from "../components/AppFormImagePicker";
import useApi from "../hooks/useApi";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(4).label("Title"),
  price: Yup.number().required().min(1).max(10000).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.string().required().nullable().label("Category"),
  images: Yup.array().min(1, "Please select atleast one image"),
});

const categories = [
  {
    backgroundColor: "#fc5c65",
    icon: "floor-lamp",
    label: "Furniture",
    value: 1,
  },
  {
    backgroundColor: "#fd9644",
    icon: "car",
    label: "Cars",
    value: 2,
  },
  {
    backgroundColor: "#fed330",
    icon: "camera",
    label: "Cameras",
    value: 3,
  },
  {
    backgroundColor: "#26de81",
    icon: "cards",
    label: "Games",
    value: 4,
  },
  {
    backgroundColor: "#2bcbba",
    icon: "shoe-heel",
    label: "Clothing",
    value: 5,
  },
  {
    backgroundColor: "#45aaf2",
    icon: "basketball",
    label: "Sports",
    value: 6,
  },
  {
    backgroundColor: "#4b7bec",
    icon: "headphones",
    label: "Movies & Music",
    value: 7,
  },
  {
    backgroundColor: "#a55eea",
    icon: "book-open-variant",
    label: "Books",
    value: 8,
  },
  {
    backgroundColor: "#778ca3",
    icon: "application",
    label: "Other",
    value: 9,
  },
];

const ListingEditScreen = () => {
  const [location, setLocation] = useState(null);

  const handleSubmit = async (listing) => {
    console.log(listing)
    const result = await listingsApi.addListing(listing);
    if (!result.ok) {
      console.log(result)
      return alert("Something went wrong");
    }
    console.log(result)
    alert("Listing created successfully");
  };

  const getLocation = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      return;
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getLastKnownPositionAsync();
    setLocation({ latitude, longitude });
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    console.log(location);
  }, [location]);

  return (
    <View style={styles.container}>
      <AppForm
        initialValues={{
          title: "",
          price: "",
          description: "",
          categoryId: null,
          images: [],
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <AppFormImagePicker name={"images"} />
        <AppFormField maxLength={255} name='title' placeholder='Title' />
        <AppFormField
          keyboardType='numeric'
          maxLength={8}
          name='price'
          placeholder='Price'
        />
        <AppFormPicker
          name='categoryId'
          items={categories}
          placeholder='Category'
          PickerItemComponent={CategoryPickerItem}
          numberOfColumns={3}
        />
        <AppFormField
          maxLength={255}
          multiline
          name='description'
          numberOfLines={3}
          placeholder='Description'
        />
        <SubmitButton title='Post' />
      </AppForm>
    </View>
  );
};

export default ListingEditScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
