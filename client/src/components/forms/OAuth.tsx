import { Button, ButtonProps, Flex, Icon } from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from "../../Firebase";
import { useDispatch } from "react-redux";
import { signInFailure, signInSuccess } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../services";
import { toast } from "react-toastify";

interface Props extends ButtonProps {
  title: string;  
}

interface LoginResponse {
  success: boolean,
  message: string,  
}
const OAuth = ({ title, ...otherProps }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const  handleGoogleClick  = async () => {
    const auth = getAuth(app)
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({prompt: 'select_account'})

    try{
      const googleResults = await signInWithPopup(auth, provider);  
      const response = await authApi.googleLogin(googleResults.user); 

      const data = await response.data as LoginResponse;
      if(data && data.success === false){
        dispatch(signInFailure(data.message))
      }  
      if(response.ok){
        dispatch(signInSuccess(response.data)); 
        toast("Login Successful");
        navigate("/");
      }
    }catch (error){
      dispatch(signInFailure(error))
    }        
  }
  return (
    <Button onClick={() => handleGoogleClick()} w="100%" mb={2} {...otherProps} bg={"gray.300"} type="button">
      <Flex my='auto'>
        <Icon boxSize={7}><FaGoogle/></Icon>
        {title}
      </Flex>
      
    </Button>
  );
};

export default OAuth;
