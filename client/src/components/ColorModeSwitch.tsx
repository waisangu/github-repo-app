import React from 'react';
import { useColorMode, Switch } from '@chakra-ui/react';

const ColorModeSwitch = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Switch
            onChange={toggleColorMode}
            colorScheme="blue"
        />

    )
}

export default ColorModeSwitch;