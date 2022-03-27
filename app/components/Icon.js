import React from "react";
import { View } from "react-native";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

function Icon({
  name,
  size = 40,
  backgroundColor = "#000",
  iconColor = "#fff",
  ant,
}) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor,
        justifyContent: "center",
        alignItems: "center",
        margin: 2,
      }}
    >
      {ant ? (
        <AntDesign name='user' size={24} color='white' />
      ) : (
        <MaterialCommunityIcons
          name={name}
          color={iconColor}
          size={size * 0.5}
        />
      )}
    </View>
  );
}

export default Icon;
