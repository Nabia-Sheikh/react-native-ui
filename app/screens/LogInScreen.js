import { StyleSheet, Image, View } from "react-native";
import React, {useContext} from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import jwtDecode from "jwt-decode";
import AppTextInput from "../components/AppTextInput";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import ErrorMessage from "../components/ErrorMessage";
import AppFormField from "../components/AppFormField";
import SubmitButton from "../components/SubmitButton";
import AppForm from "../components/AppForm";
import AuthApi from "../api/Auth";
import AuthContext from "../auth/context";
import AuthStorage from "../auth/storage";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

const LogInScreen = () => {
  const [loginFailed, setLoginFailed] = React.useState();
 const authContext =  useContext(AuthContext)

  const handleSubmit = async (values) => {
    try {
      const result = await AuthApi.login(values.email, values.password);
      if(!result.data.user) return setLoginFailed(true)
      await AuthStorage.storeUser(result.data.user);
      authContext.setUser(result.data.user);
    } catch (error) {
      setLoginFailed(true);
      console.log(error)
    }
  }

  return (
    <View>
      <Image style={styles.logo} source={require("../assets/logo-red.png")} />
      <AppForm
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <View style={styles.container}>
          <ErrorMessage error={"Invalid Email and/or Password."} visible={loginFailed} />
          <AppFormField
            name='email'
            autoCapitalize='none'
            autoCorrect={false}
            keyboardType='email-address'
            icon={"email"}
            placeholder='Email'
          />
          <AppFormField
            name='password'
            autoCapitalize='none'
            autoCorrect={false}
            secureTextEntry
            textContentType='password'
            icon={"lock"}
            placeholder='Password'
          />
          <SubmitButton title={"Log Inn"} onPress={handleSubmit} />
        </View>
      </AppForm>
    </View>
  );
};

export default LogInScreen;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  logo: {
    width: 180,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
});
