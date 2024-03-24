import React from 'react';
import { useColorMode, Switch } from '@chakra-ui/react';

const ColorModeToggle= () => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Switch
            defaultChecked={colorMode === 'dark'}
            onChange={toggleColorMode}
            colorScheme="blue"
        />

    )
}

export default ColorModeToggle;