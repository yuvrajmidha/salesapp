import { Button, IconButton } from '@chakra-ui/button'
import { useColorModeValue as mode} from '@chakra-ui/color-mode'
import FocusLock from '@chakra-ui/focus-lock/dist/focus-lock'
import { useDisclosure } from '@chakra-ui/hooks'
import { Input } from '@chakra-ui/input'
import { Box, Center, Heading, HStack, Stack } from '@chakra-ui/layout'
import { Popover, PopoverArrow, PopoverContent, PopoverTrigger } from '@chakra-ui/popover'
import { Select } from '@chakra-ui/select'
import React from 'react'
import { BiPlusCircle } from 'react-icons/bi'
import { BsArrowReturnRight } from 'react-icons/bs'

  // 2. Create the form
  export const TextFilter = ({ firstFieldRef, onCancel }:any) => {
    return (
      <Stack spacing={4} py={2}>
          <Heading px={2} size="xs">
            Filter
          </Heading>
          <Box>
            <Select size="sm" rounded={"md"}>
                <option value="equalto">is exactly</option>
                <option value="between">contains</option>
            </Select>
            <HStack mt={1} mx="-0.25rem" spacing={0}>
                <Box px={2} w="32px" color={mode("primary.500", "white")}>
                  <BsArrowReturnRight/>
                </Box>
                <Box px={1} w="100%">
                  <Input type="text" defaultValue={""} placeholder='Search' size="sm" rounded={"md"} />
                </Box>
            </HStack>
          </Box>
          <Button size="sm" variant='solid' colorScheme="primary" onClick={onCancel}>
            Apply
          </Button>
      </Stack>
    )
  }
  
  // 3. Create the Popover
 