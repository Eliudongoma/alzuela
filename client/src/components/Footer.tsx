import { Box } from "@chakra-ui/react";

function Footer() {
  const currentYear: number = new Date().getFullYear();
  return (
    <Box as={'footer'} w={'100%'} bg={'blue.200'} color={'blue.60'} h={'6vh'}
      textAlign={'center'} fontSize={16} mt={'auto'}>

      &copy; { currentYear } Alzuela Inc. All rights reserved.
      
    </Box>
  )
}

export default Footer
