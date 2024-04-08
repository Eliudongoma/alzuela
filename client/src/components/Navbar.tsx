import { Badge, Box, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { categories } from "../data/categories";

function NavBar() {
  const navigate = useNavigate();

  return (
    <Box bg="gray.300" mt="70px" h="50px" pt={3} maxW={"100%"}
       alignItems="center" overflowX={'auto'}>
      <Flex ml="50px" w="100%" justify={'center'}>
        {categories.map((item, index) => (
          <Badge
            key={index} 
            cursor="pointer"
            variant="subtle"
            border={1}
            mr={2}
            p={1}
            borderRadius={8}
            colorScheme="gray"
            fontSize={16}
            onClick={() => navigate(item.route)}
            letterSpacing={0.1}
          >
            {item.label}
          </Badge>
        ))}
      </Flex>
    </Box>
  );
}

export default NavBar;
