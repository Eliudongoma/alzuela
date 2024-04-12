import { useState } from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { toast } from "react-toastify";
import * as Yup from "yup";

import { UserSignUp } from "../components/interfaces/UserSignUp";
import {
  ErrorMessage,
  Form,
  FormField,
  SubmitButton,
} from "../components/forms";
import { authApi, usersApi } from "../services";
import { authTokenKey, DataError, Headers } from "../services/client";

const initialValues: UserSignUp = {
  username: "",
  password: "",
  name: "",
  email: "",
};

const validationSchema = Yup.object().shape({
  username: Yup.string().min(4).max(50).required().label("username"),
  password: Yup.string().min(8).max(15).required().label("password"),
  name: Yup.string().min(2).max(30).required().label("lastname"),
  email: Yup.string().min(2).max(30).required().label("email"),
});

export type SignUpInfo = Yup.InferType<typeof validationSchema>;

function SignUp() {
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const registerUser = async (info: SignUpInfo) => {
    setLoading(true);
    const response = await usersApi.register(info);
    setLoading(false);

    return response;
  };

  const loginWithJwt = (headers: Headers | undefined) => {
    const jwt = headers?.[authTokenKey];

    if (jwt) authApi.loginWithJwt(jwt);
  };

  const handleSubmit = async (info: SignUpInfo) => {
    setError("");
    const { ok, data, problem, headers } = await registerUser(info);

    if (!ok) return setError((data as DataError)?.error || problem);

    toast("You're now a member!");
    loginWithJwt(headers);
    window.location.href = "/";
  };

  return (
    <Flex justify={"center"} align={"center"} mt={"90px"}>
      <Box
        borderRadius={"10px"}
        borderColor={"gray.100"}
        w={"500px"}
        padding={6}
        boxShadow={"lg"}
        bg={"gray.500"}
        h={"auto"}
      >
        <Heading mb={2}>Sign Up</Heading>
        <Form
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}>
          <ErrorMessage error={error} />
          <FormField name="name" />
          <FormField name="email" type="email" />
          <FormField name="username" />
          <FormField name="password" type="password" />
          <SubmitButton title="Create Account" isLoading={isLoading} />
        </Form>
      </Box>
    </Flex>
  );
}

export default SignUp;
