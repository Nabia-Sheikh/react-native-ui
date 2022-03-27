import { useFormikContext } from "formik";
import React from "react";
import AppButton from "./AppButton";

const SubmitButton = ({ title, disabled }) => {
  const { handleSubmit } = useFormikContext();
  return <AppButton disabled={disabled} text={title} onPress={handleSubmit} />;
};

export default SubmitButton;
