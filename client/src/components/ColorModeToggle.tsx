import React from "react";
import { useColorMode, Switch } from "@chakra-ui/react";

// Component for NavBar to flip between light and dark mode
const ColorModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Switch
      defaultChecked={colorMode === "dark"}
      onChange={toggleColorMode}
      colorScheme="blue"
    />
  );
};

export default ColorModeToggle;
