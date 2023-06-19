import * as React from "react"
import {
  ChakraProvider, theme,
} from "@chakra-ui/react"
import Header from "./components/Header"
import Form from "./components/Form"

export const App = () => (
  <ChakraProvider theme={theme}>
     <>
      <Header/>
      <Form/>
     </>
  </ChakraProvider>
)
