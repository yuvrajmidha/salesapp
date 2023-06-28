import { HStack, Icon, Link, LinkProps, useColorModeValue as mode, Text } from '@chakra-ui/react'
import * as React from 'react'
import { Link as Hyperlink } from "react-router-dom";

interface NavLinkProps extends LinkProps {
  isActive?: boolean
  label: string
  icon: JSX.Element,
  href: string
}



export const NavLink = (props: NavLinkProps) => {
  const { icon, isActive, label,href, ...rest } = props
  return (
   <Hyperlink to={href}>
     <Link
      display="block"
      py="1"
      px="3"
      as="span"
      borderRadius="md"
      transition="all 0.3s"
      fontWeight="medium"
      fontSize="sm"
      cursor={"pointer"}
      color="gray.800"
      userSelect="none"
      aria-current={isActive ? 'page' : undefined}
      _hover={{
        bg: "gray.100"
      }}
      _activeLink={{
        bg: "gray.200",
      }}
      {...rest}
    >
      <HStack spacing="4">
        {icon}
        <Text textTransform={"capitalize"} fontWeight="700" as="span">{label}</Text>
      </HStack>
    </Link>
   </Hyperlink>
  )
}
