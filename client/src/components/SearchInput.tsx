import React, { KeyboardEvent, useState } from 'react';
import { InputGroup, Input, InputLeftElement, InputRightAddon, Button } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

const SearchInput = () => {
    const [value, setValue] = useState('');
    const handleClick = () => {
        console.log(value)
    }
    const handleKeyDown = (e: KeyboardEvent) => {
        if ((e as KeyboardEvent).key === 'Enter') {
            console.log(value)
        }
    }

    return (
        <InputGroup>
            <InputLeftElement pointerEvents='none'> 
                <SearchIcon color='gray.300'/>
            </InputLeftElement>
            <Input 
                type='text'
                placeholder='Search for GitHub Repository'
                onChange={(e) => setValue((e.target as HTMLInputElement).value)}
                onKeyDown={handleKeyDown}
            />
            <InputRightAddon p={0}>
                <Button borderLeftRadius={0} onClick={handleClick}>
                    Search
                </Button>
            </InputRightAddon>
        </InputGroup>
    )
}

export default SearchInput;