import { Box, Flex, Heading } from "@chakra-ui/react";
import * as Yup from "yup";

import { 
  ErrorMessage, 
  Form, 
  FormField, 
  FormLink, 
  SubmitButton } from "../components/forms";

import { useState } from "react";
import { authApi } from "../services";
import { DataError } from "../services/client";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const validationSchema = Yup.object().shape({
  username: Yup.string().min(4).max(50).required().label("username"),
  password: Yup.string().min(6).required().label("password"),
});
export type UserInfo = Yup.InferType<typeof validationSchema>;

const initialValues: UserInfo = {
  username : "",
  password: ""
}

function SignInPage() {
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate()

  const loginUser = async (info: UserInfo) => {
    setLoading(true);
    const response = await authApi.login(info);
    setLoading(false);
    return response;
  };

  const handleSubmit = async (info: UserInfo) => {    
    setError("");    
   const { data, ok, problem } = await loginUser(info);
    if (!ok){
      return setError((data as DataError)?.error || problem || "");      
    }
    toast("Login Successful");
    navigate("/");
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
          <SubmitButton bg="blue.100" mb={3} title="Login"  isLoading = {isLoading}/>
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
