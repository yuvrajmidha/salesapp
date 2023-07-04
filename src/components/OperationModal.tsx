import { Box, Button, ButtonProps, Divider, HStack, IconButton, Modal, ModalBody, useColorModeValue as mode, ModalContent, ModalHeader, ModalOverlay, useDisclosure, Heading } from '@chakra-ui/react'
import React, { forwardRef, useContext, useEffect, useImperativeHandle, useState } from 'react'
import { RiCloseFill } from 'react-icons/ri'
import { useLocation } from 'react-router-dom'
import { CBXContext } from '../@codbrix/components/provider'
import DynamicImport from './Route'

type ActionModalProps = {
  children: React.ReactNode,
  route: any,
  page: string
}

const OperationModal = forwardRef((props, ref) => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const [route, setRoute] = useState<any>({})
    
    const [size, setSize] = useState<any>('3xl')

    const [title, setTitle] = useState<any>({})

    const location = useLocation()

    const {routes, callOperation} = useContext(CBXContext)

    const [_id, setID] = useState<any>('')

    useImperativeHandle(ref, () => ({
      openModal: (route_name:any, id:string='', title:string='', modal_size:string='') => {
        setRoute({...routes[route_name], name: route_name})
        setSize({base: "full", sm: modal_size ?? (route?.route_type === 'CREATE' ? "3xl" : "lg")})
        setTitle(title ?? routes[route_name].title)
        setID(id)
        onOpen()
      },
      openPrompt: (route_name:string, id:string) => {
        setRoute({...routes[route_name], name: route_name})
        setSize({sm: "sm"})
        setTitle(routes[route_name].title)
        setID(id)
        onOpen()
      }
    }))

    useEffect(() => {

        callOperation(route.name, _id)

    }, [_id, route])


    useEffect(() => {
      onClose()
    }, [location])

    return (
      <>
        <Modal isCentered size={size} scrollBehavior={"inside"} motionPreset={"slideInBottom"} isOpen={isOpen} onClose={() => {
            onClose()
          }}>
          <ModalOverlay backdropFilter={"blur(3px)"} />
          <ModalContent m={2} borderWidth={[0, 0, 1]} bg={mode("white", "black")}>
            <ModalHeader userSelect={"none"} borderBottomWidth={1} px={4} py={1}>
              <HStack spacing={0} justify="space-between">
                <Heading size="sm">{title}</Heading>
                <IconButton onClick={() => {onClose()}} variant={"ghost"} aria-label='back'><RiCloseFill size="20px"/></IconButton>
              </HStack>
            </ModalHeader>
            <ModalBody display={"flex"} p={0} >
              <DynamicImport {...route} _id={_id}/>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    )
})

export default OperationModal;
