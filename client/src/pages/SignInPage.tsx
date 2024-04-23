import { Box, Flex, Heading } from "@chakra-ui/react";
import * as Yup from "yup";
import { 
  ErrorMessage, 
  Form, 
  FormField, 
  FormLink, 
  OAuth, 
  SubmitButton,
   } from "../components/forms";
import useUsers from "../hooks/useUsers";
import { useState } from "react";

const validationSchema = Yup.object().shape({
  username: Yup.string().min(4).max(50).required().label("username"),
  password: Yup.string().min(6).required().label("password"),
});
export type LoginDetails = Yup.InferType<typeof validationSchema>;

const initialValues: LoginDetails = {
  username : "",
  password: ""
}

function SignInPage() {
  const [loading, setLoading] = useState<boolean>(false)

  const {error, login} = useUsers()
  const handleSubmit = async (info: LoginDetails) => { 
    setLoading(true);
    await login(info);
    setLoading(false);
  }

  return (
    <Flex 
      justify={"center"} 
      align={"center"} 
      mt={"160px"}>
      <Box
        borderRadius={"10px"}
        borderColor={"gray.200"}
        w={"400px"}        
        padding={6}
        boxShadow={"lg"}
        bg={"gray.600"}
        h={"auto"}>
        <Heading mb={2}>Login</Heading>
        <Form
          onSubmit={handleSubmit}
          initialValues={initialValues}         
          validationSchema={validationSchema}>
          <ErrorMessage error={error}/>
          <FormField name="username" />
          <FormField name="password" type="password" />
          <SubmitButton bg="blue.100" mb={3} title="Sign in"  isLoading = {loading}/>
          <OAuth bg="blue.100" mb={3} title="Sign in with Google"/>
          <Flex justify="space-between">
            <FormLink label="Forgot Password?" route="/forgotPassword" />
            <FormLink label="Create an account!" route="/signup" />
          </Flex>
        </Form>
      </Box>
    </Flex>
  );
}

export default SignInPage;
