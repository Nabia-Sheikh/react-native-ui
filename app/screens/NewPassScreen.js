import { StyleSheet, Text, View } from "react-native";
import React from "react";
import * as Yup from "yup";
import AppForm from "../components/AppForm";
import AppFormField from "../components/AppFormField";
import SubmitButton from "../components/SubmitButton";
import AppText from "../components/AppText";
import AuthApi from "../api/Auth";
import TransactionDone from "./TransactionDone";
import ErrorMessage from "../components/ErrorMessage";

const validationSchema = Yup.object({
  password: Yup.string().required("Password is required").min(6),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .min(6, "Password must be at least 6 characters"),
});

const NewPassScreen = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleSubmit = async (values) => {
    setError(null);
    if (values.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    setIsLoading(true);
    try {
      await AuthApi.newPassword(route.params._id, values.password);
      setShow(true);
    } catch (error) {
      console.log(error);
      console.log(error.response);
    }
    setIsLoading(false);
  };

  const handleDone = () => {
    setTimeout(() => {
      navigation.navigate("Login");
      setShow(false);
    }, 2000);
  };

  const { _id } = route.params;
  console.log(_id);
  return (
    <View>
      <AppText style={styles.text}>New Password.</AppText>
      <AppForm
        initialValues={{ password: "", passwordConfirmation: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <View style={styles.container}>
          <ErrorMessage visible={show} error={error} />
          <AppFormField
            name='password'
            autoCapitalize='none'
            autoCorrect={false}
            secureTextEntry
            textContentType='password'
            icon={"lock"}
            placeholder='Password'
          />
          <AppFormField
            name='passwordConfirmation'
            autoCapitalize='none'
            autoCorrect={false}
            secureTextEntry
            textContentType='password'
            icon={"lock"}
            placeholder='Confirm Password'
          />
          <SubmitButton
            disabled={isLoading}
            title={isLoading ? "Loading..." : "Submit"}
            onPress={handleSubmit}
          />
        </View>
      </AppForm>
      {show && (
        <TransactionDone
          message={"Password Change Succefully!"}
          onDone={handleDone}
          visible={show}
        />
      )}
    </View>
  );
};

export default NewPassScreen;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  text: {
    justifyContent: "center",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
    textAlign: "center",
  },
});
