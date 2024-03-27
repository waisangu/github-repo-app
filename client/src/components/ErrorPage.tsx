import { useRouteError } from "react-router-dom";
import React from "react";
import { Center, Heading, Text, Stack } from "@chakra-ui/react";

// Generic error page if routing goes wrong
export default function ErrorPage() {
  const error: any = useRouteError();
  console.error(error);

  return (
    <Center h="100vh">
      <Stack align="center" justify="center">
        <Heading size="lg" mb={4}>
          Oops!
        </Heading>
        <Text fontSize="md" mb={2}>
          Sorry, an unexpected error has occurred.
        </Text>
        <Text fontSize="sm">
          {error?.response?.statusText || error?.message}
        </Text>
      </Stack>
    </Center>
  );
}
