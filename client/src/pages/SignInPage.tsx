import { Box, Flex, Heading } from "@chakra-ui/react";
import * as Yup from "yup";

import { 
  ErrorMessage, 
  Form, 
  FormField, 
  FormLink, 
  SubmitButton,
  OAuth } from "../components/forms";
  import  { signInSuccess, signInFailure, signInStart } from "../redux/user/userSlice";
import { authApi } from "../services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../redux/store";

interface LoginResponse {
  success: boolean,
  message: string,  
}
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
  const { loading, error } = useSelector((state: IRootState) => (state.user))
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (info: LoginDetails) => {    
    dispatch(signInStart());
    const response = await authApi.login(info); 
    const data = await response.data as LoginResponse;
    if(data && data.success === false){
      dispatch(signInFailure(data.message))
    }  
    if(response.ok){
      dispatch(signInSuccess(response.data));
      toast("Login Successful");
      navigate("/");
    }  
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
          <OAuth bg="blue.100" mb={3} title="Sign in with Google"  isLoading = {loading}/>
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
