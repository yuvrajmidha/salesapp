import { Box } from '@chakra-ui/react'
import React from 'react'

export default function SpecialContainer({maxW="80rem", children,elevation=1, sticky=false, top=0, ...props}:any) {
  return (
    <Box w="100%" px={3} top={0} zIndex={elevation * 100} position={sticky ? "sticky" : "relative"} {...props}>
        <Box width={"100%"} h="100%" maxW={maxW} className="one-side-margin cbx-wrapper">
            {children}
        </Box>
    </Box>
  )
}
