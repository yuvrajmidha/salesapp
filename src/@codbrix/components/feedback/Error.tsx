import { Box, Button, ButtonGroup, Center, Heading, Link, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { BiErrorCircle, BiRefresh } from 'react-icons/bi'
import { FaCaretLeft } from 'react-icons/fa'

export default function ShowError({code=404, message='We are unable to find what you are looking for!'}:any) {
  return (
    <Center flex={1}>
        <Box>
          <Center bg="red.50" rounded={"xl"} py={6} px={8} gap={8}>
            <Center color={"red.800"} bg="red.100" rounded="full" boxSize={"64px"}>
              <BiErrorCircle size="32px"/>
            </Center>
            <Box textAlign={"left"}>
              <Heading userSelect={"none"} size="md" fontWeight={"800"} color="red.800">{code}</Heading>
              <Text fontWeight={"400"} fontSize="sm">{message}</Text>
            </Box>
          </Center>
          <ButtonGroup mt={6} variant={"ghost"} size="sm" w="100%" justifyContent={"center"}>
              <Button as={"a"} href="/" leftIcon={<FaCaretLeft/>}>Go Back</Button>
              <Button onClick={() => {window.location.reload()}} leftIcon={<BiRefresh/>}>Try Again</Button>
          </ButtonGroup>
        </Box>
    </Center>
  )
}
