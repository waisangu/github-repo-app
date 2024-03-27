import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider, ColorModeScript, Container } from '@chakra-ui/react';
import NavBar from './components/NavBar';
import theme from './theme';
import { Provider } from 'react-redux';
import { store } from './stores/store';
import HeroSection from './components/HeroSection';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Root from './components/Root';
import ErrorPage from './components/ErrorPage';
import FavoritesPage from './components/FavoritesPage';
import { fetchServer } from './utils/fetchServer';

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
    },
    {
      path: "favorites",
      element: <FavoritesPage />,
      errorElement: <ErrorPage />,
      loader: async () => {
          const data = await fetchServer();
          return data;
      }
    }
]);

const container = document.querySelector('#root');
const root = createRoot(container!);
root.render(
    <React.StrictMode>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Provider store={store}>
          <ChakraProvider theme={theme}>
            <Container maxW="2xl">
              <RouterProvider router={router} />

            </Container>
          </ChakraProvider>
        </Provider>
    </React.StrictMode>
);

