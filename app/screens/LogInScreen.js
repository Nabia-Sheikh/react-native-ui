import {
  StyleSheet,
  Image,
  View,
  ScrollView,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import * as Yup from "yup";
import ErrorMessage from "../components/ErrorMessage";
import AppFormField from "../components/AppFormField";
import SubmitButton from "../components/SubmitButton";
import AppForm from "../components/AppForm";
import AuthApi from "../api/Auth";
import AuthContext from "../auth/context";
import AuthStorage from "../auth/storage";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

const LogInScreen = ({ navigation }) => {
  const [loginFailed, setLoginFailed] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const authContext = useContext(AuthContext);

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const result = await AuthApi.login(values.email, values.password);
      if (!result.data.user) return setLoginFailed(true);
      await AuthStorage.storeUser(result.data.user);
      authContext.setUser(result.data.user);
      setIsLoading(false);
    } catch (error) {
      setLoginFailed(true);
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <Image style={styles.logo} source={require("../assets/logo-red.png")} />
      <AppForm
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <View style={styles.container}>
          <ErrorMessage
            error={"Invalid Email and/or Password."}
            visible={loginFailed}
          />
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
          <SubmitButton
            disabled={isLoading}
            title={isLoading ? "Loading..." : "Log In"}
            onPress={handleSubmit}
          />
        </View>
      </AppForm>
      {/* <AppButton
        disabled={!request}
        text='Login'
        onPress={() => {
          promptAsync();
        }}
      /> */}
      <AppButton text='Sign In With Google' onPress={googleSignin} />
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <AppText style={styles.text}>
          Don't have an account? <AppText style={styles.link}>Sign Up</AppText>
        </AppText>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.link}
        onPress={() => navigation.navigate("Forgot-password")}
      >
        <AppText style={styles.text}>
          Forgot your password?{" "}
          <AppText style={styles.link}>Reset Password</AppText>
        </AppText>
      </TouchableOpacity>
    </ScrollView>
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
  text: {
    marginTop: 20,
    alignSelf: "center",
  },
  link: {
    color: "blue",
    fontSize: 18,
    fontWeight: "600",
  },
});
