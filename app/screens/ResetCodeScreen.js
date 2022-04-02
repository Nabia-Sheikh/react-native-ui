import React, { useState } from "react";
import { SafeAreaView, Text, View, StyleSheet, Image } from "react-native";

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import AppButton from "../components/AppButton";
import colors from "../config/colors";
import AuthApi from "../api/Auth";
import ErrorMessage from "../components/ErrorMessage";
import TransactionDone from "./TransactionDone";

const CELL_COUNT = 4;

const ResetCode = ({ route, navigation }) => {
  const { _id } = route.params;
  console.log("Data", _id);

  const [value, setValue] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const handleCodeSubmit = async () => {
    if (value.length < CELL_COUNT) {
      setError("Please enter a valid code");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      await AuthApi.verifyCode(_id, value);
      setShow(true);
      setError(null);
      setLoading(false);
      navigation.navigate({
        name: "NewPass",
        params: {
          _id,
        },
      });
    } catch (error) {
      console.log(error.response);
      setError(error.response.data.error);
      setLoading(false);
    }
  };

  const source = {
    uri: "https://user-images.githubusercontent.com/4661784/56352614-4631a680-61d8-11e9-880d-86ecb053413d.png",
  };

  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.title}>Verification</Text>
      <Image style={styles.icon} source={source} />
      <Text style={styles.subTitle}>
        Please enter the verification code{"\n"}
        we send to your email address
      </Text>
      {error && (
        <ErrorMessage style={styles.error} error={error} visible={error} />
      )}
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFiledRoot}
        keyboardType='number-pad'
        textContentType='oneTimeCode'
        renderCell={({ index, symbol, isFocused }) => (
          <View
            // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
            onLayout={getCellOnLayoutHandler(index)}
            key={index}
            style={[styles.cellRoot, isFocused && styles.focusCell]}
          >
            <Text style={styles.cellText}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />
      <AppButton
        style={styles.button}
        disabled={loading}
        text={loading ? "Verifying..." : "Submit"}
        onPress={handleCodeSubmit}
      />
      {show && (
        <TransactionDone
          message={"Verified!"}
          onDone={() => setShow(false)}
          visible={show}
        />
      )}
    </SafeAreaView>
  );
};

export default ResetCode;

const styles = StyleSheet.create({
  root: { padding: 20, minHeight: 300 },
  title: { textAlign: "center", fontSize: 30 },
  codeFiledRoot: {
    marginTop: 20,
    width: 280,
    marginLeft: "auto",
    marginRight: "auto",
  },
  error: {
    marginTop: 30,
    textAlign: "center",
  },
  subTitle: {
    paddingTop: 30,
    color: "#000",
    textAlign: "center",
  },
  cellRoot: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  icon: {
    width: 217 / 2.4,
    height: 158 / 2.4,
    marginLeft: "auto",
    marginRight: "auto",
  },
  cellText: {
    color: colors.primary,
    fontSize: 36,
    textAlign: "center",
  },
  focusCell: {
    borderBottomColor: colors.secondary,
    borderBottomWidth: 2,
  },
  button: {
    marginTop: 20,
    marginBottom: 20,
  },
});
