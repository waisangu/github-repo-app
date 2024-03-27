import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

// Barebones theme to configure light and dark mode capability
const config: ThemeConfig = {
  initialColorMode: "system",
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

export default theme;
