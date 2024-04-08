import { Button, Text, Flex, Badge } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";

import { useCart } from "../../hooks";

function CartButton({ productId }: { productId: string }) {
  const cart = useCart();

  if (cart.hasProduct(productId))
    return (
      <Flex
        align="center"
        color="green.400"
        cursor="pointer"
        justify="center"
        onClick={() => cart.remove(productId)}
      >
        <CheckCircleIcon />
        <Text mx={1}>Remove from Cart</Text>
        <Badge borderRadius="full" bg="green">
          {cart.getProductQuantity(productId)}
        </Badge>
      </Flex>
    );

  return (
    <Button
      bg={"blue.400"}
      color={"white"}
      h={7}
      mx={"auto"}
      w={"80%"}
      fontSize={20}
      onClick={() => cart.add(productId)}
    >
      <Text>Add To Cart</Text>
    </Button>
  );
}

export default CartButton;
