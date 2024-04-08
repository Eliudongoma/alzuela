import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { Button } from "../components/cart";
import { useProducts } from "../hooks";

function ProductPage() {
  const { productId } = useParams();
  const helper = useProducts();

  const product = helper.findProduct(productId);

  if (!product) return null;

  return (
    <Box mt={"90px"}>
      <Flex
        justify={"center"}
        maxW={"700px"}
        mx={"auto"}
        p={2}
        boxShadow={"lg"}
        borderColor="gray.300"
        borderRadius="10px"
      >
        <Flex h={"400px"} w={"300px"}>
          <Image src={product.image} alt="Item" objectFit={"contain"} />
        </Flex>
        <Flex p={2} px={5} justify={"center"} flexDir={"column"}>
          <Heading>{product.name}</Heading>
          <Text>{product.description}</Text>
          <Heading mt={"40px"} fontSize={"25px"} mb={5}>
            KSH {product?.price}
          </Heading>
          <Button productId={product._id} />
        </Flex>
      </Flex>
    </Box>
  );
}

export default ProductPage;
