import { Switch } from "@chakra-ui/react";

import { useAppColorMode } from "../../hooks";

const ColorModeSwitch = () => {
  const { isDarkMode, toggleColorMode } = useAppColorMode();

  return (
    <Switch
      colorScheme="teal"
      isChecked={isDarkMode}
      onChange={toggleColorMode}
    />
  );
};

export default ColorModeSwitch;
