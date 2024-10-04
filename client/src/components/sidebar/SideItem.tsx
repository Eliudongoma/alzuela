import { Box, Flex, Text } from "@chakra-ui/react"
import { useAppColorMode } from "../../hooks"
import { fontFamily } from "../../data/Fonts";

interface Props {
  Icon: JSX.Element;
  label: string;
  onClick: () => void;
  selected?: boolean;
}

const SideItem = ({Icon, label, selected, ...rest}: Props) => {
  const { isDarkMode, accentColor, concAccentColor } = useAppColorMode();
  const selectedColor = selected ? "white" : "whiteAlpha.700";
  const color = isDarkMode ? selectedColor : "gray.500";
  const selectedBgColor = selected ? concAccentColor : "gray.700";


  return (
    <Flex
      {...rest}
      _hover={{bg: isDarkMode ? selectedBgColor : accentColor}}
      align= "center"
      border = "0.1px solid gray"
      borderColor={selected ? accentColor : "gray.300"}
      borderRadius={15}
      bg={selected ? accentColor : "inherit"}
      cursor= "pointer"
      w="100%">
        <Box color={color} mx={2.5}>
          {Icon}
        </Box>        
        <Text color={color} fontFamily={fontFamily}>{label}</Text>
    </Flex>
  )
}

export default SideItem
