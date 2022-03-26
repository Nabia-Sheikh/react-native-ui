import { FlatList, StyleSheet, Text, View } from "react-native";
import React, {useContext} from "react";
import ListItem from "../components/ListItem";
import ListItemSeparator from "../components/ItemSeparator";
import Icon from "../components/Icon";
import colors from "../config/colors";
import AuthContext from "../auth/context";
import authStorage from "../auth/storage";

const menuItems = [
  {
    id: 1,
    title: "My Listings",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.primary,
    },
  },
  {
    id: 2,
    title: "My Messages",
    icon: {
      name: "email",
      backgroundColor: colors.secondary,
    },
    targetScreen: "Messages",
  },
];

const AccountScreen = ({ navigation }) => {
  const { user, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    setUser(null);
    authStorage.removeUser();
  }
  return (
    <View>
      <View style={styles.container}>
        <ListItem
          title={user.name}
          subTitle={user.email}
          image={require("../assets/mosh.jpg")}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              ImageContainer={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                  size={50}
                  color='white'
                />
              }
              onPress={() =>
                item.targetScreen && navigation.navigate(item.targetScreen)
              }
            />
          )}
          ItemSeparatorComponent={ListItemSeparator}
        />
      </View>
      <View style={styles.container}>
        <ListItem
          title='Log Out'
          ImageContainer={
            <Icon
              name='logout'
              backgroundColor='#ffe66d'
              size={50}
              color='white'
            />
          }
          onPress={handleLogout}
        />
      </View>
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
});
