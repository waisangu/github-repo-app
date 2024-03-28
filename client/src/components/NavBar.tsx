import React from "react";
import ColorModeToggle from "./ColorModeToggle";
import { Heading, Icon, Link, Stack } from "@chakra-ui/react";
import { DiGithubBadge } from "react-icons/di";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import SideDrawer from "./SideDrawer";

// NavBar containing links to repo of this project and root directory
const NavBar = ({}) => {
  return (
    <Stack direction="row" alignItems="center" paddingY="0.5em">
      <Stack direction="row" alignItems="center">
        <Link href="https://github.com/waisangu/github-repo-app" isExternal>
          <Icon as={DiGithubBadge} boxSize={12} />
        </Link>
        <Link href="/">
          <Heading as="ins" size="md">
            Github Repo App
          </Heading>
        </Link>
      </Stack>
      <Stack direction="row" alignItems="center" marginLeft="auto">
        <SunIcon boxSize={4} />
        <ColorModeToggle />
        <MoonIcon boxSize={4} marginRight="1em" />
        <SideDrawer />
      </Stack>
    </Stack>
  );
};

export default NavBar;
