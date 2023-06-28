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
} from '@chakra-ui/react'
import * as React from 'react'
import { BiMenu } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import HTMLCard from '../components/HTMLCard'
import useCard from '../@codbrix/hooks/useCard'
import { Logo } from './Logo'
import { MobileMenu } from './MobileMenu'
import { SearchField } from './SearchField'
import { Sidebar } from './Sidebar'
import { useMobileMenuState } from './useMobileMenuState'

export const Header = (props:any) => {
  
  const { isOpen, onClose, onOpen } = useMobileMenuState()
  
  return (
    <Flex
      align="center"
      justify="space-between"
      borderBottomWidth="1px"
      {...props}
    >
          <HStack  w={{base:"16", lg: "64"}} spacing={0} py={1} px={1} justify={"start"}>
            <Link to="/">
              <Button display={{base: "none", lg: "flex"}} variant={"ghost"} px={2} mx={2} py={1} rounded="lg">
                <Logo h="100%" />
              </Button>
            </Link>
            <MobileMenu/>
          </HStack>
          <Box w={{base: "md", lg: "2xl"}}>
            <SearchField />
          </Box>
          <HStack w={{base:"16", lg: "64"}} spacing={0} px={2} justify={"end"}>
            {props.children}
          </HStack>
    </Flex>
  )
}
