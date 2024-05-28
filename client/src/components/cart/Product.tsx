import {
  Flex,
  Heading,
  Image,
  Text,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { Product } from "../interfaces/Product";
import ProductQuantity from "../ProductQuantity";
import { CloseIcon } from "@chakra-ui/icons";
import { useCart } from "../../hooks";
import Delete from "./Delete";

interface Props { 
  product: Product;
}

const CartProduct = ({ product }: Props) => { 
  const cart = useCart()
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex p={2} position={"relative"} >  
        <IconButton
          _hover={{ bg: "gray.600" }}
          aria-label="Close"
          bg="gray.500"
          icon={<CloseIcon />}
          onClick={ (cart.getProductQuantity(product._id) <= 1) ?  onOpen : () =>  cart.remove(product._id)}
          position="absolute"
          right={2}
          top={2}/>     
        <Flex w="150px">          
          <Image
            src={product.image}
            alt="Product"
            objectFit={"contain"}
            borderRadius={7}/>
        </Flex>
        <Flex
          flexDirection={"column"}
          ml={2}
          textColor={"gray.500"}>
          <Heading fontSize={"30px"}>{product.name}</Heading>
          <Text>{product.description}</Text>
          <Heading fontSize={"20px"}>Ksh {product.price}</Heading>
          <ProductQuantity productId={product._id} />
        </Flex>
      </Flex>
      <Delete productId={product._id} isOpen={isOpen} onClose={onClose}/>     
    </>
  );
};

export default CartProduct;
