import React from 'react'
import { Button, IconButton } from '@chakra-ui/button'
import { useColorModeValue as mode} from '@chakra-ui/color-mode'
import { Box, Center, Heading, HStack, Stack } from '@chakra-ui/layout'
import { Checkbox, CheckboxGroup } from '@chakra-ui/checkbox'


  // 2. Create the form
  export const RadioFilter = ({ firstFieldRef, onCancel }:any) => {
    return (
      <Stack spacing={2} py={2}>
          <Heading px={2} size="xs">
            Select
          </Heading>
          <CheckboxGroup colorScheme='primary'>
            <Stack spacing={2} px={2}>
                {Array.from({length: 5}).map((item:any, index:number) => <Box key={index}>
                  <Checkbox value={index}>Item {index}</Checkbox>
                </Box>)}
            </Stack>
          </CheckboxGroup>
          <Box px={2}>
            <Button w="100%" size="sm" variant='solid' colorScheme="primary" onClick={onCancel}>
              Apply
            </Button>
          </Box>
      </Stack>
    )
  }
  
  // 3. Create the Popover
 