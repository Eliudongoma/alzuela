import { Box, FormLabel, InputProps } from "@chakra-ui/react";
import { useFormikContext } from "formik";

import { ErrorMessage, FormInput } from ".";
import { capitalizeFirstLetter, getBoolean } from "../../utils/funcs";

interface FieldValue {
  [key: string]: string;
}

interface Props extends InputProps {
  name: string;
  width?: string;
}

const FormField = ({
  name,
  width = "100%",
  placeholder,
  ...inputProps
}: Props) => {
  const { setFieldTouched, setFieldValue, errors, touched, values } = useFormikContext<FieldValue>();

  const capitalizedName = capitalizeFirstLetter(name);

  return (
    <Box mb={2}>
      <FormLabel fontSize={22}>{capitalizedName}</FormLabel>
      <FormInput
        onBlur={() => setFieldTouched(name)}
        value={values[name]}
        onChangeText={(text) => setFieldValue(name, text)}
        placeholder={placeholder || capitalizedName}
        width={width}
        {...inputProps}
      />
      <ErrorMessage error={errors[name]} visible={getBoolean(touched[name])} />
    </Box>
  );
};

export default FormField;
