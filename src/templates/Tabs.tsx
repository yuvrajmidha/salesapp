import { Box, Button, ButtonGroup, Divider, Heading, HStack, Tab, TabList,useColorModeValue as mode, TabPanel, TabPanels, Tabs, Flex } from '@chakra-ui/react'
import React, { createRef, useContext, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import ActionModal from '../components/OperationModal'
import DynamicImport from '../components/Route'
import SpecialContainer from '../@codbrix/components/list/SpecialContainer'
import { CBXContext } from '../@codbrix/components/provider'
import useCBXPage from '../@codbrix/hooks/_useCBXPage'
import { MobileMenu } from '../layout/MobileMenu'

export default function TabView() {

  const {routes, page, project, action} = useContext(CBXContext)

  const [tabIndex, setIndex]:any = useState(0)

  const navigate = useNavigate()

  const {getRoutes} = useCBXPage()

  useEffect(() => {

    if(page?.title) document.title = page.title + ' | ' + project.title

  }, [])

  const Header = () => <HStack justifyContent={"space-between"} w="100%" px={[2,2,2,2, 4]} py={[2,2,2,2,4]}>
      <Flex px={1} gap={1} alignItems={"center"}>
        <Heading fontSize={"18px"}>{getRoutes(page.name, "VIEW")[tabIndex]?.title}</Heading>
      </Flex>
      <ButtonGroup>
      {getRoutes(page.name, "CREATE").map(((route:any, index:number) => <div key={index}>
            <Button size="sm" onClick={() => {
              const _action:any = action?.current
              _action.openModal(route.name, '', route.title, '3xl')
            }} colorScheme={index === 0 ? "primary" : "gray"} variant={index ? "outline": "solid"} key={route.name}>{route?.title || ''}</Button>
        </div>
      ))}
      </ButtonGroup>
  </HStack>

  return page && (
    <Flex flex={1} direction={"column"}>
        
        <Header/>
        
        <Flex flex={1} direction={"column"}>
          {/* {getRoutes(page.name, "VIEW").length > 1 && <Flex p={2}>
            {getRoutes(page.name, "VIEW").map(((route:any, index:number) => <Button size="sm" variant={tabIndex === index ? "solid" : "ghost"} colorScheme="primary" onClick={() => {setIndex(index)}} key={route.name}>{route?.title || ''}</Button>))}
          </Flex>} */}
          {getRoutes(page.name, "VIEW").map(((route:any, index: number) => (tabIndex === index) && <Flex flex={1} key={route.name}>
              <DynamicImport {...route}/>  
          </Flex>))}
        </Flex>
    </Flex>
  )
}
