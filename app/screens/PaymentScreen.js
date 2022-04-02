import * as React from "react";
import { View } from "react-native";
import { RadioButton } from "react-native-paper";
import AppButton from "../components/AppButton";
import TransactionDone from "./TransactionDone";
import AuthContext from "../auth/context";
import TransactionApi from "../api/Auth";

const PaymentScreen = ({ route, navigation }) => {
  const [checked, setChecked] = React.useState("PayPal");
  const [show, setShow] = React.useState(false);
  const { selectedPkg, user } = React.useContext(AuthContext);
  const { listing } = route.params;

  const handlePay = async () => {
    try {
      await TransactionApi.createTransaction(
        user.email,
        listing._id,
        listing.name,
        listing.price,
        selectedPkg.category,
        selectedPkg.name,
        selectedPkg.price
      );
      setShow(true);
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  const handleDone = () => {
    setTimeout(() => {
      navigation.navigate("Listings");
      setShow(false);
    }, 2000);
  };

  return (
    <View>
      <RadioButton.Group
        onValueChange={(value) => setChecked(value)}
        value={checked}
      >
        <RadioButton.Item label='Paypal' value='PayPal' />
        <RadioButton.Item label='JazzCash' value='JazzCash' />
        <RadioButton.Item label='COD' value='COD' />
      </RadioButton.Group>
      <AppButton text='Pay Now' color='primary' onPress={handlePay} />
      {show && (
        <TransactionDone
          message={"Succesfully Done"}
          onDone={handleDone}
          visible={show}
        />
      )}
    </View>
  );
};

export default PaymentScreen;
