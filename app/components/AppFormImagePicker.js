import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ImageInputList from "./ImageInputList";
import { useFormikContext } from "formik";
import ErrorMessage from "./ErrorMessage";

const AppFormImagePicker = ({ name }) => {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  const imageUris = values[name];

  const handleAdd = (uri) => {
    setFieldValue(name, [...imageUris, uri]);
  };

  const handleRemove = (uri) => {
    setFieldValue(
      name,
      imageUris.filter((imageUri) => imageUri !== uri)
    );
  };

  return (
    <>
      <ImageInputList
        imageUris={imageUris}
        onAddImage={handleAdd}
        onRemoveImage={handleRemove}
      />
      <ErrorMessage visible={touched[name]} error={errors[name]} />
    </>
  );
};

export default AppFormImagePicker;
