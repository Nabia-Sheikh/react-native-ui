import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import ListItemSeparator from "../components/ItemSeparator";
import Icon from "../components/Icon";
import BookingItem from "../components/BookingItem";
import Packages from "../api/Packages";
import AuthContext from "../auth/context";
import ActivityIndicator from "../components/ActivityIndicator";
import AppText from "../components/AppText";

const initialMessages = [
  {
    id: 1,
    carName: "Honda",
    carPrice: 50000,
    packageName: "Basic",
    packagePrice: 8000,
    packageCategory: "Coupe",
  },
];

const TotalBookings = () => {
  const [bookings, setBookings] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [noBookings, setNoBookings] = useState(false);
  const { user } = useContext(AuthContext);

  const getMyBookings = async () => {
    setIsLoading(true);
    try {
      const response = await Packages.getMyTransactions(user.email);
      setBookings(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      alert("Error");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMyBookings();
  }, []);

  setTimeout(() => {
    if (!bookings) {
      setNoBookings(true);
    } else {
      setNoBookings(false);
    }
  }, 10000);

  return (
    <>
      {noBookings && (
        <View style={styles.noBookingsContainer}>
          <AppText style={styles.noBookings}>No Bookings found!</AppText>
        </View>
      )}
      {isLoading && <ActivityIndicator visible={isLoading} />}
      <View>
        {!isLoading && (
          <FlatList
            data={bookings}
            keyExtractor={(booking) => booking._id.toString()}
            renderItem={({ item }) => (
              <BookingItem
                title={item.packageName}
                subTitle={item.packagePrice}
                carName={item.carName}
                ImageContainer={
                  <Icon
                    name='car'
                    backgroundColor='red'
                    size={50}
                    color='white'
                  />
                }
              />
            )}
            ItemSeparatorComponent={ListItemSeparator}
          />
        )}
      </View>
    </>
  );
};

export default TotalBookings;

const styles = StyleSheet.create({
  text: {
    flex: 1,
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
  },
  noBookingsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  noBookings: {
    fontSize: 20,
    justifyContent: "center",
    textAlign: "center",
    marginTop: 20,
    color: "red",
  },
});
