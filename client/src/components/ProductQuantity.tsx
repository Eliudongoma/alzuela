import { Button, Flex, FormControl, FormLabel, Input, useDisclosure   } from "@chakra-ui/react";
import { useCart } from "../hooks";
import Delete from "./cart/Delete";

interface ProductId {
  productId: string;
}

function ProductQuantity({ productId }:ProductId) {
  const cart = useCart();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
    <FormControl>
      <Flex mt={2} align="center">
        <FormLabel>Quantity:</FormLabel>
        <Flex align={"center"}>
          <Button onClick={ (cart.getProductQuantity(productId) <= 1) ?  onOpen : () => cart.decQuantity(productId)}>-</Button>
          <Input
            type="number"
            value={cart.getProductQuantity(productId)}
            readOnly
            w={"40px"}
            h={"30px"}
            fontWeight={"bold"}
            textAlign={"center"}
            p={1}
          />
          <Button onClick={() => cart.incQuantity(productId)}>+</Button>       
        </Flex>
      </Flex>
    </FormControl>
    <Delete productId={productId} isOpen={isOpen} onClose={onClose}/>    
   </>
  );
}

export default ProductQuantity;
