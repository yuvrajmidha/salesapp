import { chakra, HTMLChakraProps, Image, ImageProps, useToken, useColorModeValue as mode, Heading } from '@chakra-ui/react'
import * as React from 'react'
import { CBXContext } from '../@codbrix/components/provider'


export const Logo = (props: ImageProps) => {

  const {project} = React.useContext(CBXContext)

  React.useEffect(() => {
    // console.log(project)
  }, [])

  return (
    <Image {...props} alt="" objectFit={"contain"} src={process.env.PUBLIC_URL + project.logo}/>
    // <Heading fontWeight="800" textAlign={"center"} size="md">OOLIO Quote</Heading>
  )
}
