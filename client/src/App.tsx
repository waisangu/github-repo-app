import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import ColorModeToggle from './components/ColorModeToggle';
import theme from './theme';

import HeroSection from './components/HeroSection';

const App = () => {
  return (
    <ChakraProvider>
        <ColorModeToggle />
        <HeroSection />
    </ChakraProvider>
  );
}

const container = document.querySelector('#root');
const root = createRoot(container!);
root.render(
    <StrictMode>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
    </StrictMode>
);