import { useColorMode } from "@chakra-ui/react";

const useAppColorMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const isDarkMode = colorMode === "dark";
  const accentColor = "gray.300";

  return {
    accentColor,
    color: isDarkMode ? "gray.800" : accentColor,
    concAccentColor: "gray.400",
    isDarkMode,
    toggleColorMode,
  };
};

export default useAppColorMode;