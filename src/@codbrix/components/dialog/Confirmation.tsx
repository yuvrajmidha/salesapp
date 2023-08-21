import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useImperativeHandle, useState } from 'react'

const Confirmation = React.forwardRef(({children, discardText="Discard", title="Confirmation", text="Are you sure?", colorScheme="primary", confirmText="Confirm", onConfirm=(callback:any) => {callback()}, onDiscard=() => {}, ...props}:any, ref) => {
    
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [loading, setLoading]:any = useState(false)

    useEffect(() => {

      setLoading(false)

    }, [isOpen])

    useImperativeHandle(ref, () => ({
      open: () => {
        onOpen()
      }
    }))

    return (
      <>
        <Box {...props} onClick={onOpen}>
            {children}
        </Box>
        <Modal isCentered size="lg" isOpen={isOpen} onClose={() => {
          onDiscard()
          onClose()
        }}>
          <ModalOverlay />
          <ModalContent mx={2}>
            {title && <ModalHeader pb={2}>{title}</ModalHeader>}
            <ModalBody px={6} pt={2} pb={4}>
                <div dangerouslySetInnerHTML={{__html: text}}/>
            </ModalBody>
            <ModalFooter justifyContent={"start"} px={6} pb={4} pt={2} gap={2}>
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
                }}>{discardText}</Button>
                
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
})

export default Confirmation;