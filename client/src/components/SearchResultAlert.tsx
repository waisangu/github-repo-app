import React from "react";
import { Alert, AlertIcon, AlertTitle, AlertDescription, Flex} from '@chakra-ui/react';

const SearchResultAlert = () => {
    return (
        <Flex>
            <Alert status='error' margin='1em' padding='1em'>
                <AlertIcon />
                <AlertTitle>No repositories found!</AlertTitle>
                <AlertDescription>Please enter a different repository name.</AlertDescription>
            </Alert>
        </Flex>
    )
}

export default SearchResultAlert;