import { Box, Button, ButtonGroup, Divider, useColorModeValue as mode, Flex, Heading, HStack, Tab, TabList, TabPanel, TabPanels, Tabs, VStack, Text, Grid, GridItem, IconButton, Card, useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, DrawerFooter } from '@chakra-ui/react'
import React, { createRef, useContext, useEffect, useState } from 'react'
import { FaArrowLeft,FaChevronRight, FaChevronLeft, FaEllipsisV } from 'react-icons/fa'
import {IoArrowBackSharp} from 'react-icons/io5'
import { Link, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import ActionModal from '../components/OperationModal'
import BasicModal from '../@codbrix/components/dialog/BasicModal'
import DynamicImport from '../components/Route'
import SpecialContainer from '../@codbrix/components/list/SpecialContainer'
import { CBXContext } from '../@codbrix/components/provider'
import useCBXOperation from '../@codbrix/hooks/_useCBXOperation'
import useCBXNavigation from '../@codbrix/hooks/useNavigation'
import { QuickEdit } from '../components/QuickEdit'
import useCard from '../@codbrix/hooks/useCard'
import HTMLCard from '../components/HTMLCard'
import { BsReverseLayoutSidebarInsetReverse, BsReverseLayoutSidebarReverse } from 'react-icons/bs'
import {HiOutlineEllipsisHorizontal} from 'react-icons/hi2';

export default function Operations() {

  const {project, action,quick_edit, isLoggedIn} = useContext(CBXContext)

  const {id, page} = useParams()

  const [sidebar, openSidebar] = useState(true)

  const {tabs} = useCBXOperation(`${page}`)

  const navigate = useNavigate()

  const location = useLocation()

  const {getRoutes} = useCBXNavigation()

  const sidedrawer = [...getRoutes(page, "PROMPT").filter(route => route?.org?.location === 2), ...getRoutes(page, "OPERATION").filter(route => route?.org?.location === 3)]

  const side = getRoutes(page, "OPERATION").filter(route => route?.org?.location === 1);

  const mains = (tab:any) => tab.routes.filter((route:any) => route?.org?.location === 0);

  useEffect(() => {
      if(!isLoggedIn){
        navigate('/public/' + project.entry)
      }
  }, [isLoggedIn])

  useEffect(() => {

    localStorage.setItem('cbx_last', location.pathname + document.location.search)
    
}, [location])


  const card = useCard(`${page}`, {_id:  `${id}`}, [])

  return (
    <Flex w="100%" bg={mode("gray.50", "black")} overflowX="hidden">
      
      {/* Dialogs */}
      <ActionModal ref={action}/>
      <QuickEdit ref={quick_edit}/>
      
      {/* Chakra Tabs */}
      <Tabs children={
        <VStack spacing={0} flex={1}>
          
          {/* Header */}
          <Box bg={mode("white", "black")} w="100%" className={'cbx-header-' + page}>
            <HStack w="100%" px={[1,1,2]} py={1}  maxH={["3rem","3rem", "100%"]} spacing={[1,1, 2]} align="center">

                {getRoutes(page, "VIEW").length > 0 ? 
                  <Link to={'/cms/' +  page}><Button px={1} variant={"ghost"} children={<IoArrowBackSharp size="16px"/>}></Button></Link> :
                  <Button onClick={() => {navigate(-1)}} px={1} variant={"ghost"} children={<IoArrowBackSharp size="16px"/>}></Button>
                }

                {/* Card View */}
                <Box w="100%">
                  <HTMLCard render={card} />
                </Box>

                {/* Prompts and Quick Edit */}
                <ButtonGroup  p={1} spacing={1} isAttached variant={"outline"} alignItems="center">
                  {getRoutes(page, "PROMPT").filter(route => route?.org?.location === 1).map(((route:any, index:number) => <Button display={["none", "none", "flex"]} key={index} size="sm" className={`cbx-route-${route.name.replace(/\//g, '-')}`} onClick={() => {
                          const _action:any = action?.current
                          _action.openPrompt(route.name, id)
                        }} colorScheme={index === 0 ? "gray" : "gray"}>{route?.title || ''}</Button>
                  ))}
                  {sidedrawer.length > 0 && <Button onClick={() => {quick_edit.current.openSidebar(page, id)}} px={1} color="gray.500" size="sm"><HiOutlineEllipsisHorizontal size="24px"/></Button>}
                </ButtonGroup>

            </HStack>
          </Box>

          {tabs.length < 2 && <Divider/>}  
          {/* Tab List */}
          {tabs.length > 1 && <TabList w="100%" bg={mode("white", "black")} alignItems="center" gap={1} px={3} zIndex={10} borderBottomWidth={1}>
             {tabs.map(((tab:any) => <Tab 
                fontWeight={"semibold"}
                py={1}
                fontSize="sm"
                key={tab.name}>{tab?.title || ''}
              </Tab>))}
              {side.length > 0 && <Button display={["none", "none", "flex"]} onClick={() => {openSidebar(!sidebar)}} size="sm" _hover={{bg: "none", opacity: "50%"}}  ml="auto" variant={"ghost"}>
                  {sidebar ? <BsReverseLayoutSidebarReverse/> :
                  <BsReverseLayoutSidebarInsetReverse/>}
              </Button>}
          </TabList>}


          <Flex direction={["column", "column", "row"]} w="100%" flex={[0,0, 1]}>

            {/* Tabs Start Here */}
            <TabPanels bg={mode("white", "black")} w="100%" display={"flex"} flex={1}>
              
              {tabs.map(((tab:any) => <TabPanel display={"flex"} flex={1} flexDirection="column" h="100%" className={'cbx-tab-' + tab?.name?.toLowerCase().replace(/ /g, '-')} p={0}  w="100%" key={tab.name}>
                    {mains(tab).map((route:any) => <Box borderBottomWidth={mains(tab).length > 1 ? 1 : 0} py={2} w="100%" key={route.name}>
                        <DynamicImport {...route} _id={id}/>  
                    </Box>)}
              </TabPanel>))}

            </TabPanels>


            {/* Sidebar */}
            {side.length > 0 && <Flex pos={"relative"} w={["100%","100%", "28rem"]} mr={!sidebar ? "-28rem" : "0rem"} transition={"0.3s"} bg={mode("white", "black")}  borderLeftWidth={[0, 0, 1]} direction={"column"}>

            {(side.length > 0 && tabs.length < 2) && <Button pos="absolute" left="-0.5rem" transform={"translateX(-100%)"} my={2} variant={"ghost"} display={["none", "none", "flex"]} onClick={() => {openSidebar(!sidebar)}} size="sm">
                  {sidebar ? <BsReverseLayoutSidebarReverse/> :
                      <BsReverseLayoutSidebarInsetReverse/>}
              </Button>}

              {side.map((route:any) => <Flex borderBottomWidth={side.length > 1 ? 1 : 0} py={2} w="100%" key={route.name}>
                  <DynamicImport {...route} _id={id}/>
              </Flex>)}

            </Flex>}

          </Flex>
            
        </VStack>
      } display={"flex"} flex={1} colorScheme={"primary"} />  
    
    </Flex>
  )
}
