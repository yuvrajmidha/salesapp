import { useToast } from '@chakra-ui/react'
import React from 'react'

export default function useAlert() {
  
    const toast = useToast()

    const showError = (message: string) => toast({
        description: message,
        status: "error",
        duration: 5000,
        isClosable: true,
        variant: "subtle",
        position: 'bottom',
        containerStyle: {
            marginTop: "84px"
        }
    })

    const showSuccess = (message: string) => toast({
        description: message,
        status: "success",
        duration: 5000,
        isClosable: true,
        variant: "subtle",
        position: 'bottom',
        containerStyle: {
            marginTop: "84px"
        }
    })
    
  
    return {showError, showSuccess}
}
