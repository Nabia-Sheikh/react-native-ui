import { useEffect, useState, useContext } from "react";
import { StyleSheet, View } from "react-native";
import React from "react";
import * as Yup from "yup";
import * as Location from "expo-location";
import FeedbackApi from "../api/Auth";
import AppForm from "../components/AppForm";
import AppFormField from "../components/AppFormField";
import SubmitButton from "../components/SubmitButton";
import AuthContext from "../auth/context";
import TransactionDone from "./TransactionDone";
import { useNavigation } from "@react-navigation/native";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(4).label("Name"),
  message: Yup.string().required().label("Message"),
});

const ListingEditScreen = () => {
  const [location, setLocation] = useState(null);
  const [show, setShow] = useState(false);
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();
  const handleSubmit = async (values) => {
    try {
      await FeedbackApi.addFeedback(values.name, user.email, values.message);
      setShow(true);
    } catch (error) {
      alert("Something went wrong");
      console.log(error);
    }
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

  const handleDone = () => {
    setTimeout(() => {
      navigation.navigate("Listings");
      setShow(false);
    }, 3000);
  };
  return (
    <>
      {show && (
        <TransactionDone
          onDone={handleDone}
          message={"Thanks for your Feeback"}
          visible={show}
        />
      )}

      <View style={styles.container}>
        <AppForm
          initialValues={{
            name: "",
            Message: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <AppFormField maxLength={255} name='name' placeholder='Name' />
          <AppFormField
            maxLength={255}
            multiline
            name='message'
            numberOfLines={3}
            placeholder='Message'
          />
          <SubmitButton title='Add Feedback' />
        </AppForm>
      </View>
    </>
  );
};

export default ListingEditScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
