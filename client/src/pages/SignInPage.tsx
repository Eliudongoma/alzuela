import { useState } from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";
import { toast } from "react-toastify";
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

const validationSchema = Yup.object().shape({
  username: Yup.string().min(4).max(50).required().label("username"),
  password: Yup.string().min(6).required().label("password"),
});

export type LoginDetails = Yup.InferType<typeof validationSchema>;

function SignInPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (info: LoginDetails) => {
    setError("");
    setLoading(true);
    const res = await authApi.login(info);
    setLoading(false);

    if (!res.ok) return setError(res.problem || "Login failed");

    toast.success("You're signed in");
    window.location.href = "/";
  };

  return (
    <Flex justify={"center"} align={"center"} mt={"160px"}>
      <Box
        borderRadius={"10px"}
        borderColor={"gray.200"}
        w={"400px"}
        padding={6}
        boxShadow={"lg"}
        bg={"gray.600"}
        h={"auto"}
      >
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
