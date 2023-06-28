import React, { useContext } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

import { CBXContext } from "../provider";

export default function Logout({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {project} = useContext(CBXContext)
  return (
    <>
      <Box onClick={onOpen}>{children}</Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Log Out</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box w="100%">
              <Box>Are you sure you want to logout?</Box>
            </Box>
          </ModalBody>

          <ModalFooter>
            <ButtonGroup
              w="100%"
              justifyContent={"start"}
              flexDirection={"row"}
            >
              <Button
                onClick={() => {
                  localStorage.removeItem(project.name + "_auth_token_");
                  window.location.reload()
                }}
                colorScheme={"red"}
              >
                Log Out
              </Button>
              <Button
                onClick={() => {
                  onClose();
                }}
                variant={"outline"}
                mr={3}
              >
                Cancel
              </Button>
            </ButtonGroup>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
