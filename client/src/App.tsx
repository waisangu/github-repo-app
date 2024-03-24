import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import ColorModeSwitch from './components/ColorModeSwitch';
import theme from './theme';

const App = () => {
  return (
    <ChakraProvider>
        <h1>Github Repo App</h1>
        <ColorModeSwitch />
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