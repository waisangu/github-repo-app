import React from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider, ColorModeScript, Container } from "@chakra-ui/react";
import theme from "./theme";
import { Provider } from "react-redux";
import { store } from "./stores/store";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./components/Root";
import ErrorPage from "./components/ErrorPage";
import FavoritesPage from "./components/FavoritesPage";
import { fetchServerGet } from "./utils/fetchServerGet";
import { IServerResponseItem } from "./types/types";

// Part of react router to handle routing,
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
    /* Function is required to have the favorited 
    repos show on load, else no repos are shown */
    loader: async (): Promise<IServerResponseItem | void> => {
      const data = await fetchServerGet();
      return data;
    },
  },
]);

const container = document.querySelector("#root");
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
