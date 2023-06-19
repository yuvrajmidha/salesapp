import { useColorMode } from '@chakra-ui/color-mode'
import { Container, Divider, HStack } from '@chakra-ui/layout'
import React from 'react'
import { ColorModeSwitcher } from '../ColorModeSwitcher'
import { Logo } from '../Logo'

export default function Header() {

    

    return (
        <>
            <Container maxW="5xl">
                <HStack justify={"space-between"} p={2}>
                    <Logo h="8"/>
                    <ColorModeSwitcher justifySelf="flex-end" />
                </HStack>
            </Container>
            <Divider/>
        </>
    )
}
