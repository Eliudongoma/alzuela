import {
  Flex,
  Heading,
  Image,
  Divider,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

import { Product } from "../interfaces/Product";
import { useCart } from "../../hooks";
import ProductQuantity from "../ProductQuantity";

interface Props {
  product: Product;
}

const CartProduct = ({ product }: Props) => {
  const cart = useCart();

  return (
    <>
      <Flex p={2} position="relative">
        <IconButton
          _hover={{ bg: "gray.600" }}
          aria-label="Close"
          bg="gray.500"
          icon={<CloseIcon />}
          onClick={() => cart.remove(product._id)}
          position="absolute"
          right={2}
          top={2}
        />
        <Flex flexGrow={1} w={"10%"}>
          <Image
            src={product.image}
            alt="Product"
            objectFit={"contain"}
            borderRadius={7}
          />
        </Flex>
        <Flex
          flexDirection={"column"}
          flexGrow={2}
          ml={2}
          textColor={"gray.500"}
        >
          <Heading fontSize={"30px"}>{product.name}</Heading>
          <Text>{product.description}</Text>
          <Heading fontSize={"20px"}>Ksh {product.price}</Heading>
          <ProductQuantity productId={product._id} />
        </Flex>
      </Flex>
      <Divider w={"90%"} />
    </>
  );
};

export default CartProduct;
