import React, { useState } from "react";
import { Avatar, Stack, Card, Heading, Text, Button, Link, Flex } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { StarIcon } from '@chakra-ui/icons';
import { ServerResponseProps } from "../types/types";
import { useDispatch } from "react-redux";
import { decrement } from "../features/favCounter/favCounterSlice";

const FavoriteRepoCard = ({ result }: ServerResponseProps) => {

    const dispatch = useDispatch();

    const handleOnClick = async () => {
        dispatch(decrement());

        try {
            const response = await fetch(`http://localhost:8000/favorites/:${result.id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })

            if (!response.ok) {
                throw new Error(`Error: Status Code ${response.status}. Failed to delete repository.`)
            }
        
        } catch (error) {
            console.error(error);
            return;
        }
    }

    return (
        <Card direction={{base: 'row'}}
            maxW="100%"
            overflow='hidden'
            variant='outline' 
            margin="1em" 
            padding='1em'
        >
            <Stack 
                direction='column'
                flex='1'
            >
                <Stack direction='row'>
                    <Avatar 
                        src={result.owner_avatar_url}
                        marginRight='0.5em'
                    />
                    <Link 
                        href={result.html_url}
                        isExternal
                    >
                        <Heading 
                            size='md'
                            marginTop='0.5em'
                            color='blue.500'
                        >
                            {result.name}
                            <ExternalLinkIcon mx='2px'/>
                        </Heading>
                    </Link>
                </Stack>
                <Text>{result.description}</Text>
                <Stack direction='row'>
                    <StarIcon />
                    <Text>{result.stargazers_count}</Text>
                </Stack>
            </Stack>
            <Button
                colorScheme='blue' 
                leftIcon={<StarIcon/>} 
                onClick={handleOnClick}
            >
                Unstar
            </Button>
        </Card>

    )
}

export default FavoriteRepoCard;