import { useColorMode } from "@chakra-ui/react";

const useAppColorMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return { isDarkMode: colorMode === "dark", toggleColorMode };
};

export default useAppColorMode;
