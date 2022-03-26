import React, { useState, useContext } from "react";
import { StyleSheet, View } from "react-native";
import * as Yup from "yup";
import ActivityIndicator from "../components/ActivityIndicator";
import useApi from "../hooks/useApi";
import AuthApi from "../api/Auth";
import ErrorMessage from "../components/ErrorMessage";
import AppFormField from "../components/AppFormField";
import AppForm from "../components/AppForm";
import SubmitButton from "../components/SubmitButton";
import AuthContext from "../auth/context";
import storage from "../auth/storage";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  pass: Yup.string().required().min(4).label("Password"),
});

function RegisterScreen() {
  const registerApi = useApi(AuthApi.register);
  const loginApi = useApi(AuthApi.login);
    const [error, setError] = useState();
    const authContext = useContext(AuthContext)

    const handleSubmit = async (user) => {
        try {
            const result = await AuthApi.register(
              user.email,
              user.pass,
              user.name
            );
            setError(null);
            authContext.setUser(result.data.user);
            await storage.storeUser(result.data.user);
            
        } catch (error) {
            console.log(error)
            setError(error.message);
        }
  };

  return (
    <>
      <ActivityIndicator visible={registerApi.isLoading || loginApi.isLoading} />
      <View style={styles.container}>
        <AppForm
          initialValues={{ name: "", email: "", pass: "" }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <ErrorMessage error={error} visible={error} />
          <AppFormField
            autoCorrect={false}
            icon='account'
            name='name'
            placeholder='Name'
          />
          <AppFormField
            autoCapitalize='none'
            autoCorrect={false}
            icon='email'
            keyboardType='email-address'
            name='email'
            placeholder='Email'
            textContentType='emailAddress'
          />
          <AppFormField
            autoCapitalize='none'
            autoCorrect={false}
            icon='lock'
            name='pass'
            placeholder='Password'
            secureTextEntry
            textContentType='password'
          />
          <SubmitButton title='Register' onPress= {handleSubmit} />
        </AppForm>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    padding: 10,
  },
});

export default RegisterScreen;
