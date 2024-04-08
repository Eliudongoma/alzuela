import {
  Card,
  CardBody,
  CardHeader,
  Image,
  Stack,
  Heading,
  Flex,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import { Product } from "./interfaces/Product";
import CartButton from "./cart/Button";

const ProductCard = ({ _id, name, image, price }: Product) => {
  return (
    <Card cursor={"pointer"} datatype="Card" pos="relative" overflow="hidden">
      <CardHeader h="60%" width="100%" p={0}>
        <Flex align="center" justify="center" h="250px">
          <Link to={`/product/${_id}`}>
            <Image
              src={image}
              alt="Loading"
              border={1}
              borderRadius={18}
              w="100%"
              objectFit="contain"
              _hover={{
                transform: "scale(1.1)",
                transformOrigin: "bottom-right",
              }}
              transition={"transform 0.5s"}
            />
          </Link>
        </Flex>
      </CardHeader>
      <CardBody
        bg="gray.200"
        pos="absolute"
        opacity={0.8}
        bottom={0}
        textAlign={"center"}
        p={1}
        w={"100%"}
        h={"100px"}
      >
        <Stack>
          <Heading fontSize={20}>{name}</Heading>
          <Heading fontSize={16}>Ksh {price}</Heading>
          <CartButton productId={_id} />
        </Stack>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
