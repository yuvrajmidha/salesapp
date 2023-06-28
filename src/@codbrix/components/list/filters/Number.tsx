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
  export const NumberFilter = ({ firstFieldRef, onCancel }:any) => {
    return (
      <Stack spacing={4} py={2}>
          <Heading px={2} size="xs">
            Filter
          </Heading>
          <Box>
            <Select size="sm" rounded={"md"}>
                <option value="equalto">is equal to</option>
                <option value="between">is between</option>
                <option value="between">is less than</option>
                <option value="between">is greater than</option>
            </Select>
            <HStack mt={1} mx="-0.25rem" spacing={0}>
                <Box px={2} w="32px" color={mode("primary.500", "white")}>
                  <BsArrowReturnRight/>
                </Box>
                {/* <Box px={1} w="auto">
                  <Input type="number" defaultValue={""} size="sm" rounded={"md"} />
                </Box>
                <Box px={1} minW="50%">
                  <Select size="sm" rounded={"md"}>
                      <option value="last">days</option>
                  </Select>
                </Box> */}
                <Box px={1} w="100%">
                  <Input type="number" defaultValue={0} size="sm" rounded={"md"} />
                </Box>
            </HStack>
            <HStack mt={1} mx="-0.25rem" spacing={0}>
                <Box px={1} w="45%">
                  <Input type="number" defaultValue={0} size="sm" rounded={"md"} />
                </Box>
                <Center fontSize={"13px"} px={1} w="10%" color={mode("primary.500", "white")}>
                    and
                </Center>
                <Box px={1} w="45%">
                  <Input type="number" defaultValue={0} size="sm" rounded={"md"} />
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
 