import { ReactNode } from "react";
import { Box } from "@chakra-ui/react";
import { Formik, FormikHelpers, FormikValues } from "formik";

interface Props<FormValues extends FormikValues> {
  children: ReactNode;
  onSubmit: (
    values: FormValues,
    formikHelpers: FormikHelpers<FormValues>
  ) => void;
  validationSchema: object;
  initialValues: FormValues;
}

const Form = <FormValues extends FormikValues>({
  children,
  validationSchema,
  ...otherProps
}: Props<FormValues>) => (
  <Formik<FormValues> {...otherProps} validationSchema={validationSchema}>
    {() => <Box >{children}</Box>}
  </Formik>
);

export default Form;
