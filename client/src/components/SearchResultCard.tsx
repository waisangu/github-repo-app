import React, { useState } from "react";
import { Avatar, Stack, Card, Heading, Text, Button, Link } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { StarIcon } from '@chakra-ui/icons';
import { ApiResponseProps } from "../types/types";
import { useDispatch } from "react-redux";
import { increment } from "../features/favCounter/favCounterSlice";

const SearchResultCard = ({ result }: ApiResponseProps) => {
    const [clicked, setClicked] = useState<boolean>(false);
    const dispatch = useDispatch();

    const handleOnClick = async () => {
        setClicked(!clicked);
        dispatch(increment());
        const requestData = {
            id: result.id,
            owner_avatar_url: result.owner.avatar_url,
            html_url: result.html_url,
            name: result.name,
            description: result.description,
            stargazers_count: result.stargazers_count
        }

        try {
            const response = await fetch('http://localhost:8000/favorites', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            })
            if (!response.ok) {
                throw new Error(`Error: Status Code ${response.status}. Failed to favorite repository.`)
            }
        } catch (error) {
            console.error(error);
            return;
        }


    }

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
            <Button colorScheme='blue' leftIcon={<StarIcon/>} onClick={handleOnClick}>{!clicked ? "Star": "Unstar"}</Button>
        </Card>
    )
}

export default SearchResultCard;