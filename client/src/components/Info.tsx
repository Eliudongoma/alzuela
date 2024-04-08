import { PhoneIcon, EmailIcon,  } from "@chakra-ui/icons";
import { Box, Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Info() {
  return (
    <Box bg={'blue.100'} h={'20vh'} w={'100%'} >
      <Flex justify={'center'} mx={'auto'} maxW={'70vw'} py={4}>
        <Box px={5}>
          <Heading fontSize={15}>Contact Information</Heading>
            <Box py={2}>
              <Text fontSize={16}><PhoneIcon/>+254 742-143-234</Text>
              <Text fontSize={18}><EmailIcon pr={1}/>alzuela@gmail.com</Text>
            </Box>            
        </Box>
        <Spacer/>
        <Box>
          <Heading fontSize={15}>About Alzuela</Heading>
          <Text _hover={{cursor:'pointer',textDecoration:'underline'}}>
            <Link to={'/about'} >About</Link>
          </Text>    
          <Text _hover={{cursor:'pointer',textDecoration:'underline'}}>
            <Link to={'/about'} >Blogs</Link>
          </Text> 
          <Text _hover={{cursor:'pointer',textDecoration:'underline'}}>
            <Link to={'/about'} >Reveiws</Link>
          </Text>              

        </Box>
        <Spacer/>
        <Box px={5}>
          <Heading fontSize={15}>Contact Information</Heading>
          <Link to={'/about'}>About</Link>
        </Box>
      </Flex>
    </Box>
  )
}

export default Info
