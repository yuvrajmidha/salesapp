import {
  Box,
  Button,
  Divider,
  Flex,
  FlexProps,
  Spacer,
  Stack,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import * as React from 'react'

import { useParams } from 'react-router'
import { CBXContext } from '../@codbrix/components/provider'
import useCBXNavigation from '../@codbrix/hooks/useNavigation'
import { Logo } from './Logo'
import { NavLink } from './NavLink'

export const Sidebar = (props: FlexProps) => {

  const {pages} = useCBXNavigation()

  const {project} = React.useContext(CBXContext);

  const params = useParams()

  return (
    <>
    <Box display={{base: "none", xl: "block"}} minW="72"></Box>
    <Flex
      pos={"fixed"}
      color="black"
      left={0}
      height="100vh"
      direction="column"
      borderRightWidth="1px"
      minW="72"
      {...props}
    >
      <Flex direction="column" flex="1" pb="4" overflowY="auto">
        <Box display={{base: "block", xl: "none"}} py={4} px={4}>
            {/* <Button w="100%" justifyContent={"start"} py={2} variant={"ghost"} _hover={{bg: "#88888833"}} size="lg" rounded="lg"> */}
                <Logo h="10" />
            {/* </Button> */}
        </Box>
        

        <Stack as="nav" py={2} aria-label="Sidebar Navigation">
          {pages.length > 0 ? <Stack spacing="1">
            {pages.filter((page:any) => page?.views > 0).map((page:any, index: number) => <Box px={2} key={index}>
                <NavLink href={page.views ? `/cms/${page.name}` : '/404'} label={page.title} icon={<i className={'text-xl ' + page.icon}></i>} isActive={page.name === params.page} />
            </Box>)}
          </Stack> : <></>}

          {/* {project.pages.length >0 && <Divider />} */}

          {/* <Stack spacing="1">
            <NavLink href='/notifications' label="Notifications" icon={<FaRegBell/>} />
            <NavLink href='/help' label="Help Center" icon={<FaRegQuestionCircle/>} />
          </Stack> */}
        </Stack>
        <Spacer />
      
      </Flex>
    

    </Flex>
    </>
  )
}
