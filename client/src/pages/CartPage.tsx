import { Box, Divider, Flex, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { CartTotal } from "../components";
import { useCart } from "../hooks";
import CartProduct from "../components/cart/Product";

function CartPage() {
  const products = useCart().getProducts();

  if (products.length)
    return (
      <Box mt={"90px"} ml={"20px"} mr={{base: "20px"}}>
        <Flex justify={"center"} align={"center"} direction={{base: 'column-reverse', md: 'row'}}>
          <Flex
            bg="gray.200"
            border="2px"
            borderColor="gray.300"
            flexDirection={"column"}
            borderRadius="10px">
            {products.map((product) => (
              <>
                <CartProduct product={product} key={product._id} />              
                <Divider w={"100%"} />
              </>
            ))}
          </Flex>
          <CartTotal/>
        </Flex>       
      </Box>
    );

  return (
    <Box mt={"90px"} justifyContent={"center"}>
      <Flex
        justify={"center"}
        align={"center"}
        maxW={"auto"}
        mx={10}
        flexDir={"column"}
        textColor={"gray.400"}
        h={"300px"}
        bg={"gray.50"}
        border={"2px"}
        borderColor={"gray.100"}
        borderRadius={"10px"}
      >
        <Heading>Add items to the cart!!!</Heading>
        <Link to={"/"}>
          <Heading
            fontSize={30}
            p={1}
            _hover={{
              backgroundColor: "gray.200",
              textColor: "white",
              borderRadius: "10px",
              textDecoration: "underline",
            }}
          >
            Continue shopping!!
          </Heading>
        </Link>
      </Flex>
    </Box>
  );
}

export default CartPage;
