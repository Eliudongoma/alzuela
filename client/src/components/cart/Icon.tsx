import { Box, Icon, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

import { useCart } from "../../hooks";

const ShoppingCartIcon = () => {
  const cart = useCart();
  const navigate = useNavigate();

  if (!cart.count) return null;

  return (
    <Box cursor="pointer" onClick={() => navigate("/cart")}>
      <Icon
        as={FaShoppingCart}
        boxSize={10}
        color="white"
        h="auto"
        px={2}
        w="auto"
      />
      <Text
        bg={"blue.300"}
        color={"white"}
        w={6}
        h={6}
        align={"center"}
        fontSize="small"
        border={14}
        borderRadius={18}
        position={"fixed"}
        mt={"-10"}
        ml={"6"}
      >
        {cart.count}
      </Text>
    </Box>
  );
};

export default ShoppingCartIcon;
