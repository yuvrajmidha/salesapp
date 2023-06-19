import { useColorModeValue as mode } from '@chakra-ui/color-mode'
import { Container, Divider, HStack } from '@chakra-ui/layout'
import React from 'react'
import { ColorModeSwitcher } from '../ColorModeSwitcher'
import { Logo } from '../Logo'

export default function Header() {

    

    return (
        <>
            <Container pos={"sticky"} bg={mode("white", "gray.900")} top={0} zIndex={300} maxW="5xl">
                <HStack justify={"space-between"} p={2}>
                    <Logo h="8"/>
                    <ColorModeSwitcher justifySelf="flex-end" />
                </HStack>
            </Container>
            <Divider/>
        </>
    )
}
