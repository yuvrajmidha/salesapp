import {
  Box,
  Button,
  ButtonGroup,
  Heading,
  HStack,
} from '@chakra-ui/react'
import * as React from 'react'
import { Horizontal } from './filters/Horizontal'

export const TableFilters = ({data=[]}:any) => {

  return data?.length > 0 ?  (
    <Box overflowX={"scroll"} py={3}>
        <Horizontal/>
    </Box>
  ) : <></>
}
