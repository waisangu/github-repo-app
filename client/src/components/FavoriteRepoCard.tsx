import React from "react";
import {
  Avatar,
  Stack,
  Card,
  Heading,
  Text,
  Button,
  Link,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { StarIcon } from "@chakra-ui/icons";
import { ServerResponseProps } from "../types/types";
import { useDispatch } from "react-redux";
import { decrement } from "../features/favCounter/favCounterSlice";
import { fetchServerDelete } from "../utils/fetchServerDelete";

// Created separate from SearchResultCard since it handles different logic
const FavoriteRepoCard = ({ result }: ServerResponseProps) => {
  // From RTK to change favCounterSlice
  const dispatch = useDispatch();

  // Fetches data from server to delete repo and then decrement global count
  const handleOnClick = async ():Promise<void> => {
    fetchServerDelete(result);
    dispatch(decrement());
  };

  return (
    <Card
      direction={{ base: "row" }}
      maxW="100%"
      overflow="hidden"
      variant="outline"
      margin="1em"
      padding="1em"
    >
      <Stack direction="column" flex="5">
        <Stack direction="row">
          <Avatar src={result.owner_avatar_url} marginRight="0.5em" />
          <Link href={result.html_url} isExternal>
            <Heading size="md" marginTop="0.5em" color="blue.500">
              {result.name}
              <ExternalLinkIcon mx="2px" />
            </Heading>
          </Link>
        </Stack>
        <Text>{result.description}</Text>
        <Stack direction="row">
          <StarIcon />
          <Text>{result.stargazers_count}</Text>
        </Stack>
      </Stack>
      <Button
        flex="1"
        colorScheme="blue"
        leftIcon={<StarIcon />}
        onClick={handleOnClick}
      >
        Unstar
      </Button>
    </Card>
  );
};

export default FavoriteRepoCard;
