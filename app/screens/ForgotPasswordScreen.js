import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import AppForm from "../components/AppForm";
import * as Yup from "yup";
import AppFormField from "../components/AppFormField";
import SubmitButton from "../components/SubmitButton";
import TransactionDone from "./TransactionDone";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
});

const ForgotPasswordScreen = ({navigation}) => {
  const [show, setShow] = React.useState(false);
  const handleSubmit = () => {
      setShow(true);
      navigation.navigate("Login");
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
          <AppFormField
            name='email'
            autoCapitalize='none'
            autoCorrect={false}
            keyboardType='email-address'
            icon={"email"}
            placeholder='Email'
          />
          <SubmitButton title='Submit' />
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
