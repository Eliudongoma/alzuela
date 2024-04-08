import { Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface Props {
  route: string;
  label: string;
}

const FormLink = ({ label, route }: Props) => {
  const navigate = useNavigate();

  return (
    <Text
      _hover={{ fontWeight: "bold", textDecoration: "underline" }}
      cursor="pointer"
      fontSize="sm"
      onClick={() => navigate(route)}
    > 
      {label}
    </Text>
  );
};

export default FormLink;
