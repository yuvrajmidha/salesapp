import { Box, Button, ButtonProps, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import React, { useContext, useEffect } from 'react'

type ActionModalProps = {
  children: React.ReactNode,
  button: JSX.Element,
  title: string,
  size?: string,
  hideClose?: boolean
}

export default function BasicModal({children,hideClose=false, title, size="3xl", button}:ActionModalProps) {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
      <>
        <Box onClick={onOpen}>
            {button}
        </Box>
        <Modal isCentered size={size} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            {title && <ModalHeader>{title}</ModalHeader>}
            {!hideClose && <ModalCloseButton />}
            <ModalBody onClick={onClose} px={3}>
                {children}
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    )
}
