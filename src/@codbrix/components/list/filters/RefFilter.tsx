import { Button, IconButton } from '@chakra-ui/button'
import { useColorModeValue as mode} from '@chakra-ui/color-mode'
import FocusLock from '@chakra-ui/focus-lock/dist/focus-lock'
import { useDisclosure } from '@chakra-ui/hooks'
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input'
import { Box, Center, Heading, HStack, Stack } from '@chakra-ui/layout'
import { Popover, PopoverArrow, PopoverContent, PopoverTrigger } from '@chakra-ui/popover'
import { Select } from '@chakra-ui/select'
import React from 'react'
import { BiPlusCircle, BiSearch } from 'react-icons/bi'
import { BsArrowReturnRight } from 'react-icons/bs'

  const user_card = `<div class='px-2 py-2 min-w-[250px] gap-3 flex items-center cbx-wrapper rounded-lg text-sm border'>
      <img src='https://bit.ly/dan-abramov' class='h-6 w-6 rounded-full'/>
      <div>
          <b class='text-sm'>Yuvraj Midha</b><br/>
      </div>
  </div>`
  // 2. Create the form
  export const RefFilter = ({ firstFieldRef, onCancel }:any) => {
    return (
      <Stack spacing={2} py={2}>
          <Heading px={2} size="xs">
            Filter
          </Heading>

          <Box px={2}>
            <InputGroup size="sm">
              <InputLeftElement
                pointerEvents='none'
                children={<BiSearch color='gray.300' />}
              />
              <Input type='search' rounded={"lg"} placeholder='Search' />
            </InputGroup>
          </Box>

          <Stack spacing={0} px={2}>
              {Array.from({length: 5}).map((item:any, index:number) => <Box 
                key={index} 
                cursor="pointer" 
                className='ref-card filter-card'
                py={1} 
                dangerouslySetInnerHTML={{__html: user_card}} 
              />)}
          </Stack>

          <Box px={2}>
            <Button w="100%" size="sm" variant='solid' colorScheme="primary" onClick={onCancel}>
              Apply
            </Button>
          </Box>

      </Stack>
    )
  }
  
  // 3. Create the Popover
 