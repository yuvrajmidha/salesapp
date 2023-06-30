import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    useDisclosure,
    Box,
    CloseButton,
  } from '@chakra-ui/react'

export default function MyAlert() {
    const {
      isOpen: isVisible,
      onClose,
      onOpen,
    } = useDisclosure({ defaultIsOpen: true })
  
    return isVisible ? (
      <Alert w="100%" py={2} pos="relative" bg="gray.200" status='info'>
        <AlertIcon color={"gray.400"} />
        <Box>
          <AlertDescription>
            All values are excluding GST.
          </AlertDescription>
        </Box>
        <CloseButton
          alignSelf='flex-end'
          position='absolute'
          right={1}
          top={1}
          onClick={onClose}
        />
      </Alert>
    ) : (
      <></>
    )
  }