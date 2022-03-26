import React from "react";
import AppPicker from "./AppPicker";
import { useFormikContext } from "formik";
import ErrorMessage from "./ErrorMessage";

const AppFormPicker = ({
  items,
  numberOfColumns,
  PickerItemComponent,
  name,
  placeholder,
  onPress,
}) => {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  return (
    <>
      <AppPicker
        onSelectItem={(item) => setFieldValue(name, item.label)}
        items={items}
        placeholder={placeholder}
        selectedItem={values[name]}
        PickerItemComponent={PickerItemComponent}
        numberOfColumns={numberOfColumns}
      />
      <ErrorMessage visible={touched[name]} error={errors[name]} />
    </>
  );
};

export default AppFormPicker;
