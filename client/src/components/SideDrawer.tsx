import { Button } from "@chakra-ui/react";
import React from "react";
import { useDisclosure } from "@chakra-ui/react";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
  } from '@chakra-ui/react';
import { HamburgerIcon } from "@chakra-ui/icons";

const SideDrawer = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();

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
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    Consequat nisl vel pretium lectus quam id. Semper quis lectus
                    nulla at volutpat diam ut venenatis. Dolor morbi non arcu risus
                    quis varius quam quisque. Massa ultricies mi quis hendrerit dolor
                    magna eget est lorem. Erat imperdiet sed euismod nisi porta.
                    Lectus vestibulum mattis ullamcorper velit.
                    </p>
                </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default SideDrawer;