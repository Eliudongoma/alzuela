import { Box, Flex, Heading } from "@chakra-ui/react";
import * as Yup from "yup";
import { UserSignUp } from "../components/interfaces/UserSignUp";
import { Form, FormField, SubmitButton } from "../components/forms";
import { toast } from "react-toastify";
import { useState } from "react";

const initialValues: UserSignUp = {
  username: "",
  password: "",
  address: "",
  phone: "",
  firstname: "",
  lastname: "",
  email: "",
};

const validationSchema = Yup.object().shape({
  username: Yup.string().min(4).max(50).required().label("username"),
  password: Yup.string().min(8).max(15).required().label("password"),
  address: Yup.string().min(2).max(30).required().label("address"),
  phone: Yup.string().min(10).max(10).required().label("phone"),
  firstname: Yup.string().min(2).max(30).required().label("firstname"),
  lastname: Yup.string().min(2).max(30).required().label("lastname"),
  email: Yup.string().min(2).max(30).required().label("email"),
});

type Credentials = Yup.InferType<typeof validationSchema>;

function SignUp() {
  const handleSubmit = (info: Credentials) => {
    console.log(info);
    toast.info("Successfull signup!");
  };
  const [formData, setFormData] = useState<UserSignUp>({
    username: "",
    password: "",
    address: "",
    phone: "",
    firstname: "",
    lastname: "",
    email: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({...formData, [e.target.value]: e.target.value});
    console.log(formData)
  }

  return (
    <>
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
            validationSchema={validationSchema}
          >
            <Flex>
              <FormField name="firstname" onChange={handleChange} value={formData.firstname}/>
              <FormField name="lastname" onChange={handleChange} value={formData.lastname}/>
            </Flex>
            <FormField name="email" type="email" onChange={handleChange} value={formData.email}/>
            <Flex>
              <FormField name="username" onChange={handleChange} value={formData.username}/>
              <FormField name="password" type="password" onChange={handleChange} value={formData.password}/>
            </Flex>
            <Flex>
              <FormField name="phone" type="number" onChange={handleChange} value={formData.phone}/>
              <FormField name="address" onChange={handleChange} value={formData.address}/>
            </Flex>
            <SubmitButton title="Create Account" />
          </Form>
        </Box>
      </Flex>
    </>
  );
}

export default SignUp;
