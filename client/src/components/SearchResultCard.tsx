import React, { useState } from "react";
import { Avatar, Stack, Card, Heading, Text, Button, Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { StarIcon } from '@chakra-ui/icons';
import { SearchResultProps } from "../types/types";

const SearchResultCard = ({ result }: SearchResultProps) => {
    const [clicked, setClicked] = useState<boolean>(false);

    return (
        <Card direction={{base: 'row'}} overflow='hidden' variant='outline' margin='1em' padding='1em'>
            <Stack direction='column' flex='1'>
                <Stack direction='row'>
                    <Avatar src={result.owner.avatar_url} marginRight='0.5em'/>
                    <Link href={result.html_url} isExternal>
                        <Heading size='md' marginTop='0.5em' color='blue.500'>{result.name}<ExternalLinkIcon mx='2px' /></Heading>
                    </Link>
                </Stack>
                <Text>{result.description}</Text>
                <Stack direction='row'>
                    <StarIcon />
                    <Text>{result.stargazers_count}</Text>
                </Stack>
            </Stack>
            <Button colorScheme='blue' leftIcon={<StarIcon/>} onClick={() => setClicked(!clicked)}>{!clicked ? "Star": "Unstar"}</Button>
        </Card>

    )
}

export default SearchResultCard;