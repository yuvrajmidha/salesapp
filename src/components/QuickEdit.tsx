import { Box, Button, Card, CloseButton, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Heading } from '@chakra-ui/react'
import React, { useContext, useEffect, useImperativeHandle, useState } from 'react'
import { FaChevronRight } from 'react-icons/fa'
import { useLocation } from 'react-router-dom'
import { CBXContext } from '../@codbrix/components/provider'
import useCBXNavigation from '../@codbrix/hooks/useNavigation'
import DynamicImport from './Route'

export const QuickEdit = React.forwardRef((props:any, ref:any) => {
    
  const [open, setOpen] = useState(-1)

  const {action, callOperation} = useContext(CBXContext)

  const [page, setPage] = useState('')
  const [id, setId] = useState('')

  const {getRoutes} = useCBXNavigation()
  
  const routes = getRoutes(page, "OPERATION").filter(route => route?.org?.location === 3)
  const prompts = getRoutes(page, "PROMPT").filter(route => route?.org?.location === 2)

  useImperativeHandle(ref, () => ({
    openSidebar: (page:string, id: string) => {
      setPage(page)
      setId(id)
      setOpen(0)
    },
  }))
  
  const location = useLocation()

  useEffect(() => {
    
    if(open > -1){
      callOperation(routes[open]?.name, id)
    }
    
  }, [open])

  useEffect(() => {
    setOpen(-1)
  }, [location])

return <>
      <Box transition={"0.3s"} opacity={(open > -1) ? 1 : 0} onClick={() => {setOpen(-1)}} pointerEvents={(open > -1) ? "auto" : "none"} w="100vw" h={"100vh"} pos={"fixed"} top={0} left={0} bg="blackAlpha.500" zIndex={900} />
      <Card pos={"fixed"} transition={"0.3s"} bg="gray.100" transform={(open > -1) ? "" : "translateX(100%)"} maxW="28rem" w="100%" bottom={0} top={0} right={0} h="100vh" rounded={"none"} zIndex={1000}>
        <Flex align={"center"} px={3} bg="white" display={"flex"} justify={"space-between"} shadow={"none"} rounded={"none"}>
          <Heading fontSize={"md"} py={3}>Settings</Heading>
          <CloseButton onClick={() => {setOpen(-1)}} />
        </Flex>
        {(page !== '' && id !== '') && <Box  py={2} px={0}>
          {/* <Divider w="100%"/> */}
           {routes.map(((route:any, index:number) => <div className='bg-white mt-2' key={index}>
            <Button display={(open !== index) ? "flex": "none"} onClick={() => {setOpen(index)}} height={"auto"} py={3} px={4} rounded="none" className={`cbx-route-${route.name.replace(/\//g, '-')}`} w="100%" justifyContent={"space-between"} size="sm" _hover={{bg: "gray.50"}} variant="ghost" rightIcon={<FaChevronRight size="14px"/>} key={route.name}>{route?.title || ''}</Button>
            <Box display={(open === index) ? "block": "none"}>
              <DynamicImport {...route} _id={id}/>  
            </Box>
            </div>
          ))}
         {(routes?.length > 0 && prompts.length > 0) && <Box color="gray.400" px={4} pt={6} pb={2}>
            <h6>More Options</h6>
          </Box>}
          {prompts.map(((route:any, index:number) => <div className='bg-white mb-1' key={index}>
            <Button key={index} height={"auto"} py={3} px={4} rounded="none" w="100%" justifyContent={"space-between"} className={`cbx-route-${route.name.replace(/\//g, '-')}`} size="sm" _hover={{bg: "gray.50"}} variant="ghost" onClick={() => {
                const _action:any = action?.current
                _action.openPrompt(route.name, id)
              }}>{route?.title || ''}</Button>
              </div>
          ))}
        </Box>}
      </Card>
  </> 
} )