import {
  Box,
  Button,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  useColorMode,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react";
import { BiMenu } from "react-icons/bi";
import { RiMoonFill, RiSunCloudyFill, RiSunFill } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CBXContext } from "../@codbrix/components/provider";
import { Logo } from "./Logo";
import { SearchField } from "./SearchField";
import { Sidebar } from "./Sidebar";
import { useMobileMenuState } from "./useMobileMenuState";

export const MobileMenu = () => {
  const { isOpen, onClose, onOpen } = useMobileMenuState();

  const location = useLocation()

  React.useEffect(() => {
    onClose()
  }, [location])

  return (
    <>
      <Button
        onClick={onOpen}
        boxSize="40px"
        display={{ base: "flex", xl: "none" }}
        variant={"ghost"}
        px={2}
        py={2}
        rounded="full"
      >
        <BiMenu size="24px" />
      </Button>
      <Drawer
        size="full"
        placement="left"
        isOpen={isOpen}
        blockScrollOnMount={false}
        onClose={onClose}
      >
        <DrawerOverlay backdropFilter={"blur(3px)"} />
        <DrawerContent
          bg={mode("white", "black")}
          shadow="none"
          borderRightWidth={1}
          position="relative"
          maxW="64"
        >
          <Sidebar width="full" height="full" bg="inherit" border="0" />
          {/* <DrawerCloseButton
            bg="blue.500"
            _hover={{ bg: 'blue.600' }}
            _active={{ bg: 'blue.700' }}
            rounded="0"
            position="absolute"
            color="white"
            right="-8"
            top="0"
          /> */}
        </DrawerContent>
      </Drawer>
    </>
  );
};
