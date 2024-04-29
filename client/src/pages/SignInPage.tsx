import { useState } from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";
// import { toast } from "react-toastify";
import * as Yup from "yup";

import {
  ErrorMessage,
  Form,
  FormField,
  FormLink,
  OAuth,
  SubmitButton,
} from "../components/forms";
import { authApi } from "../services";
import { useNavigate } from "react-router-dom";
// import useUsers from "../hooks/useUsers";
import { DataError, Headers, authTokenKey } from "../services/client";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  username: Yup.string().min(4).max(50).required().label("username"),
  password: Yup.string().min(6).required().label("password"),
});

export type LoginDetails = Yup.InferType<typeof validationSchema>;

function SignInPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null >(null);
  // const { error } = useUsers();
  const navigate = useNavigate();

  const loginUser = async (info: LoginDetails) => {
    setLoading(true);
    const response = await authApi.login(info);
    setLoading(false);

    return response;
  };

  const loginWithJwt = (headers: Headers | undefined) => {
    const jwt = headers?.[authTokenKey];
    if (jwt) authApi.loginWithJwt(jwt);
  };

  const handleSubmit = async (info: LoginDetails) => {
    setError("");
    const { ok, data, problem, headers } = await loginUser(info);
    
    if (!ok) return setError((data as DataError)?.error || problem);

    toast("You're now a member!");
    loginWithJwt(headers);
    navigate("/");
  };

  // const handleSubmit = async (info: LoginDetails) => {
  //   try{
  //     setLoading(true);
  //     await login(info);
  //     setLoading(false);
  //   }catch (error){
  //     console.log(error)
  //   }
  // };

  return (
    <Flex justify={"center"} align={"center"} mt={"160px"}>
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
          initialValues={{ username: "", password: "" }}
          validationSchema={validationSchema}
        >
          <ErrorMessage error={error} />
          <FormField name="username" />
          <FormField name="password" type="password" />
          <SubmitButton
            bg="blue.100"
            mb={3}
            title="Sign in"
            isLoading={loading}
          />
          <OAuth bg="blue.100" mb={3} title="Sign in with Google" />
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
