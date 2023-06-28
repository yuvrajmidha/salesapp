import { Box, Button, Card, Center, Flex,} from '@chakra-ui/react'
import * as React from 'react'
import { Header } from './Header'
import { Outlet, useNavigate, useParams } from 'react-router'
import { Sidebar } from './Sidebar'
import HTMLCard from '../components/HTMLCard'
import useCard from '../@codbrix/hooks/useCard'

export const Layout: any = ({children, ...props}:any) => {

  const {id} = useParams()

  const card = useCard()

  return <Flex h="100vh" flexDirection="column">
      <Header opacity={0} display={id ? ["none", "none", "flex"] : "flex"}>
          <HTMLCard render={card}/>
      </Header>
      <Header display={id ? ["none", "none", "flex"] : "flex"} position="fixed" w="100%" zIndex={800} bg="white">
          <HTMLCard render={card}/>
      </Header>
      <Flex pos={"relative"} flex="1">
        <Sidebar display={{ base: 'none', xl: 'flex' }} />
        <Flex w="100%" pos="relative">
            <Outlet/>
        </Flex>
      </Flex>
    </Flex> 
}
