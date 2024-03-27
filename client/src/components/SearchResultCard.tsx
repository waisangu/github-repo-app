import React, { useState } from "react";
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
import { ApiResponseProps, IServerRequestItem } from "../types/types";
import { useDispatch } from "react-redux";
import { decrement, increment } from "../features/favCounter/favCounterSlice";
import { fetchServerDelete } from "../utils/fetchServerDelete";
import { fetchServerPost } from "../utils/fetchServerPost";

const SearchResultCard = ({ result }: ApiResponseProps) => {
  // State to decide what text to show for button and handle logic of saving and unsaving
  const [clicked, setClicked] = useState<boolean>(false);

  // RTK hook to update state of global favorite count
  const dispatch = useDispatch();

  const handleOnClick = async (): Promise<void> => {
    // Find the exact button being clicked
    const btn: HTMLElement | null = document.querySelector(`#btn-${result.id}`);

    // Use the text of the button for the logic later in the function
    const btnText: string | null | undefined = btn?.textContent;

    // Format object to be passed into our fetch requests
    const requestData: IServerRequestItem = {
      id: result.id,
      owner_avatar_url: result.owner.avatar_url,
      html_url: result.html_url,
      name: result.name,
      description: result.description,
      stargazers_count: result.stargazers_count,
    };

    // Checks to see if the button is starred or unstarred, if saved add to the database, if not delete from the database
    if (btnText === "Star") {
      fetchServerPost(requestData);
      dispatch(increment());
    } else if (btnText === "Unstar") {
      fetchServerDelete(requestData);
      dispatch(decrement());
    }

    // Finally change text of button
    setClicked(!clicked);
  };

  return (
    <Card
      direction={{ base: "row" }}
      overflow="hidden"
      variant="outline"
      margin="1em"
      padding="1em"
    >
      <Stack direction="column" flex="5">
        <Stack direction="row">
          <Avatar src={result.owner.avatar_url} marginRight="0.5em" />
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
        id={`btn-${result.id}`}
        colorScheme="blue"
        leftIcon={<StarIcon />}
        onClick={handleOnClick}
      >
        {!clicked ? "Star" : "Unstar"}
      </Button>
    </Card>
  );
};

export default SearchResultCard;
