import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import NavBar from './components/NavBar';
import theme from './theme';
import { Provider } from 'react-redux';
import { store } from './stores/store';

import HeroSection from './components/HeroSection';

const App = () => {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
          <NavBar />
          <HeroSection />
      </ChakraProvider>
    </Provider>
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