import { Button, Text } from "@chakra-ui/react";
import React from "react";
import { useDisclosure } from "@chakra-ui/react";
import {
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from '@chakra-ui/react';
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";

const SideDrawer = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Button colorScheme='blue' onClick={onOpen}>
                <HamburgerIcon />
            </Button>
            <Drawer onClose={onClose} isOpen={isOpen} size='xs'>
                <DrawerOverlay />
                <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Options</DrawerHeader>
                <DrawerBody>
                    <Link to='/favorites'>
                        <Text as='ins'>Favorites Page</Text>
                    </Link>
                </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default SideDrawer;