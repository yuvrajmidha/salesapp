import * as React from "react"
import {
  chakra,
  ImageProps,
  forwardRef,
  useColorMode,
} from "@chakra-ui/react"


export const Logo = forwardRef<ImageProps, "img">((props, ref) => {
  
    const {colorMode} = useColorMode()

    return <chakra.img src={'https://bepoz.com.au/logo.png'} filter={colorMode === 'dark' ? "invert(1)" : ""} ref={ref} {...props} />
})
