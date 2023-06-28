import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useImperativeHandle, useState } from 'react'

const Confirmation = React.forwardRef(({children, title="Confirmation", text="Are you sure?", colorScheme="primary", confirmText="Confirm", onConfirm=(callback:any) => {callback()}, onDiscard=() => {}}:any, ref) => {
    
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [loading, setLoading]:any = useState(false)


    useImperativeHandle(ref, () => ({
      open: () => {
        onOpen()
      }
    }))

    return (
      <>
        <Box onClick={onOpen}>
            {children}
        </Box>
        <Modal isCentered size="lg" isOpen={isOpen} onClose={() => {
          onDiscard()
          onClose()
        }}>
          <ModalOverlay />
          <ModalContent>
            {title && <ModalHeader>{title}</ModalHeader>}
            <ModalBody px={4} pt={4} pb={2}>
                <div dangerouslySetInnerHTML={{__html: text}}/>
            </ModalBody>
            <ModalFooter justifyContent={"start"} px={4} pb={4} pt={2} gap={2}>
                <Button size="sm" onClick={() => {
                  setLoading(true); 
                  onConfirm(() => {
                    setLoading(false)
                    onClose()
                  })
                }} isLoading={loading} colorScheme={colorScheme}>{confirmText}</Button>
                <Button size="sm" onClick={() => {
                  onDiscard()
                  onClose()
                }}>Discard</Button>
                
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
})

export default Confirmation;