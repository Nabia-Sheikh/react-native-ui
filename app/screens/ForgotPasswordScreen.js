import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import AppForm from "../components/AppForm";
import * as Yup from "yup";
import AppFormField from "../components/AppFormField";
import SubmitButton from "../components/SubmitButton";
import TransactionDone from "./TransactionDone";
import AuthApi from "../api/Auth";
import ErrorMessage from "../components/ErrorMessage";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
});

const ForgotPasswordScreen = ({ navigation }) => {
  const [show, setShow] = React.useState(false);
  const [notFound, setNotFound] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await AuthApi.requestResetPassword(values.email);
      console.log(response.data);
      setNotFound(false);
      setShow(true);
      setLoading(false);
      navigation.navigate({
        name: "ResetCode",
        params: { _id: response.data._id },
      });
    } catch (error) {
      if (error.response.status === 404) {
        setNotFound(true);
      } else {
        alert("Something went wrong");
      }
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logo-red.png")} />
      <AppForm
        initialValues={{ email: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <View style={styles.formContainer}>
          {notFound && (
            <ErrorMessage visible={notFound} error={"User not found!"} />
          )}
          <AppFormField
            name='email'
            autoCapitalize='none'
            autoCorrect={false}
            keyboardType='email-address'
            icon={"email"}
            placeholder='Email'
          />
          <SubmitButton
            disabled={loading}
            title={loading ? "Sending..." : "Submit"}
          />
        </View>
      </AppForm>
      {show && (
        <TransactionDone
          message={"Password reset email sent."}
          onDone={() => setShow(false)}
          visible={show}
        />
      )}
    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  formContainer: {
    width: "100%",
    padding: 20,
    marginTop: 20,
    borderRadius: 10,
  },
  logo: {
    width: 180,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
});
