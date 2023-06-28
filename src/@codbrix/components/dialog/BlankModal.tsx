import { Box, Button, ButtonProps, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import React, { useContext, useEffect, useImperativeHandle, useState } from 'react'

type ActionModalProps = {
  children: React.ReactNode,
  button: JSX.Element,
  title: string,
  size?: string,
  hideClose?: boolean
}

const BlankModal =  React.forwardRef(({hideClose=true, title='', size="3xl"}:any, ref:any) => {
  
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [html, setHtml] = useState('');
    const [msize, setSize] = useState(size);

    useImperativeHandle(ref, () => ({
      open: (html:string, size:string) => {
        setHtml(html);
        setSize(size);
        onOpen()
      }
    }))

    return (
      <>
        <Modal isCentered size={msize} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            {title && <ModalHeader>{title}</ModalHeader>}
            {!hideClose && <ModalCloseButton />}
            <ModalBody onClick={onClose} px={3}>
                <div dangerouslySetInnerHTML={{__html: html}}/>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    )
})

export default BlankModal;
