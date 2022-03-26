import {
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import React, { useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import colors from "../config/colors";

const ImageInput = ({ imageUri, onChangeImage }) => {
  useEffect(() => {
    requestPermssion();
  }, []);

  const requestPermssion = async () => {
    const request = await ImagePicker.requestCameraPermissionsAsync();
    if (!request.granted) {
      return Alert.alert(
        "Permission",
        "You need to enable permissions to use this app."
      );
    }
  };

  const handlePress = () => {
    if (!imageUri) {
      pickAnImage();
    } else {
      Alert.alert(
        "Remove Image",
        "Are you sure you want to remove the image?",
        [
          { text: "Yes", onPress: () => onChangeImage(null) },
          { text: "No", style: "cancel" },
        ]
      );
    }
  };

  const pickAnImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!result.cancelled) {
        onChangeImage(result.uri);
      }
    } catch (error) {
      console.log("Image failed to upload", error);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        {!imageUri && (
          <MaterialCommunityIcons
            name='camera'
            size={40}
            color={colors.medium}
          />
        )}
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ImageInput;

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    backgroundColor: colors.light,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  cancel: {
    color: "red",
  },
});
