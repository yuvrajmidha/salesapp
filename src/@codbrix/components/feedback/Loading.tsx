import { Center, Spinner } from '@chakra-ui/react'
import React from 'react'

export default function Loading() {
  return (
    <Center flex={1} minH="48"><Spinner/></Center>
  )
}
