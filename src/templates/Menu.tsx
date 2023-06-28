import { Box, Button, ButtonGroup, Divider, Heading, HStack, Tab, TabList, useColorModeValue as mode, TabPanel, TabPanels, Tabs, Flex, SimpleGrid, Text, IconButton } from '@chakra-ui/react'
import React, { createRef, useContext, useEffect, useState } from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import ActionModal from '../components/OperationModal'
import DynamicImport from '../components/Route'
import SpecialContainer from '../@codbrix/components/list/SpecialContainer'
import { CBXContext } from '../@codbrix/components/provider'
import useCBXPage from '../@codbrix/hooks/_useCBXPage'
import { MobileMenu } from '../layout/MobileMenu'

export default function MenuView() {

  const {routes, page, project, action} = useContext(CBXContext)

  const [index, setIndex]:any = useState(-1)

  const navigate = useNavigate()

  const location = useLocation()

  const {getRoutes} = useCBXPage()

  const getCreators = (index:number, page:any) => {

    const view = getRoutes(page.name, "VIEW")[index]

    return getRoutes(page.name, "CREATE").filter(route => {
      if(route?.org?.location === view?.org?.order) return true
    })

  }

  useEffect(() => {

    if(index < 0){
      document.title = page.title + ' | ' + project.title
      navigate('/cms/' + page.name)
    }
    else{
      const view = getRoutes(page.name, "VIEW")[index]
      document.title = view.title + ' - ' + page.title + ' | ' + project.title
      navigate('/cms/' + page.name + '?_tab=' + view.name)
    }

  }, [index])

  useEffect(() => {

    
    if(location.search === ''){
      setIndex(-1)
    }

  }, [location])

  return page && (
    <Flex flexDir='column' flex={1}>
      <Box h={[0,0,0,4,4]}/>
      <SpecialContainer elevation={3} maxW="6xl" px={[0,0,0,3]} top={0} sticky>
        <HStack h="48px" bg={mode("white", "black")} justifyContent={"space-between"} w="100%" py={2}>
          {index < 0 ? <Flex px={1} gap={1} alignItems={"center"}>
            <MobileMenu/>
            <Heading fontSize={"22px"}>{page?.title}</Heading>
          </Flex> : <HStack w="100%" justify={"space-between"}>
            <Flex px={1} gap={1} alignItems={"center"}>
                <IconButton onClick={() => {setIndex(-1)}} variant={"ghost"} aria-label='back'><FaArrowLeft/></IconButton>
                <Heading fontSize={"22px"}>{getRoutes(page.name, "VIEW")[index]?.title}</Heading>
            </Flex>  
            <ButtonGroup px={[3, 3, 0]}>
              {getCreators(index, page).map(route => <Button size="sm" onClick={() => {
                  const _action:any = action?.current
                  _action.openModal(route)
                }} key={route.name}>{route.title}</Button>)}
            </ButtonGroup>
          </HStack>}
        </HStack>
      </SpecialContainer>
      <Box h={[0,0,0,4,4]}/>
      <Divider position={"sticky"} top={"48px"} zIndex={300} borderBottomWidth={1} w="100%"/>
      {index > -1 ? <Flex flex={1}>
          {getRoutes(page.name, "VIEW")[index]?.name && <DynamicImport {...getRoutes(page.name, "VIEW")[index]}/>}
      </Flex> : <SpecialContainer py={3}>
        <SimpleGrid spacing={3} columns={[1,1,2,2,3]}>
          {getRoutes(page.name, "VIEW").map(((route:any, i:number) => <Box onClick={() => {setIndex(i)}} cursor={"pointer"} _hover={{bg: mode("gray.50", "gray.900")}} px={0} key={route.name}>
            <Box w="100%" borderWidth={1} rounded="lg" p={4}>
              <Heading size="md">{route.title}</Heading>
              <Text>{route.description}</Text>
            </Box>
          </Box> ))}
        </SimpleGrid>
      </SpecialContainer>}
    </Flex>
  )
}
