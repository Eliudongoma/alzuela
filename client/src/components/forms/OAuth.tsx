import { Button, ButtonProps, Flex, Icon } from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from "../../Firebase";
import useUsers from "../../hooks/useUsers";
import { useState } from "react";

interface Props extends ButtonProps {
  title: string;  
}

const OAuth = ({ title, ...otherProps }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { googleLogin } = useUsers();

  const  handleGoogleClick  = async () => {
    const auth = getAuth(app)
    
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({prompt: 'select_account'})

    try{
      const googleResults = await signInWithPopup(auth, provider);  
      setLoading(true)
      await googleLogin(googleResults.user);
      setLoading(false)
    }catch (error){
      console.log(error);
      return;
    }        
  }
  return (
    <Button 
      onClick={() => handleGoogleClick()}
      w="100%" mb={2} isLoading = {loading} {...otherProps} bg={"gray.300"} type="button">
      <Flex my='auto'>
        <Icon boxSize={7}><FaGoogle/></Icon>
        {title}
      </Flex>      
    </Button>
  );
};

export default OAuth;
