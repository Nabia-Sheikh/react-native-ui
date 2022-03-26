import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import ListItem from "../components/ListItem";
import ListItemSeparator from "../components/ItemSeparator";
import Icon from "../components/Icon";

const initialMessages = [
  {
    id: 1,
    title: "T1",
    description: "D1",
    image: require("../assets/mosh.jpg"),
  },
  {
    id: 2,
    title: "T2",
    description: "D2",
    image: require("../assets/mosh.jpg"),
  },
];

const MessagesScreen = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [refreshing, setRefreshing] = useState(false);

  return (
    <View>
      <FlatList
        data={messages}
        keyExtractor={(message) => message.id.toString()}
        renderItem={({ item }) => (
          <ListItem
            title={item.title}
            subTitle={item.description}
            // image={item.image}
            ImageContainer={
              <Icon
                name='circle'
                backgroundColor='yellowgreen'
                size={50}
                color='white'
              />
            }
          />
        )}
        ItemSeparatorComponent={ListItemSeparator}
        refreshing={refreshing}
        onRefresh={() => {
          setMessages([
            {
              id: 2,
              title: "T2",
              description: "D2",
              image: require("../assets/mosh.jpg"),
            },
          ]);
        }}
      />
    </View>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({});
