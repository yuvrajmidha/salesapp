import { Button, IconButton } from '@chakra-ui/button'
import { useColorModeValue as mode} from '@chakra-ui/color-mode'
import FocusLock from '@chakra-ui/focus-lock/dist/focus-lock'
import { useDisclosure } from '@chakra-ui/hooks'
import { Input } from '@chakra-ui/input'
import { Box, Center, Divider, Heading, HStack, Stack, Text } from '@chakra-ui/layout'
import { Popover, PopoverArrow, PopoverContent, PopoverTrigger } from '@chakra-ui/popover'
import { Select } from '@chakra-ui/select'
import React from 'react'
import { BiPlusCircle } from 'react-icons/bi'
import { BsArrowReturnRight } from 'react-icons/bs'
import { DateRange } from './DateRange'
import { NumberFilter } from './Number'
import { RadioFilter } from './RadioFilter'
import { RefFilter } from './RefFilter'
import { TextFilter } from './TextFilter'

const Dialog = ({name, value="", children}:any) => {
    const { onOpen, onClose, isOpen } = useDisclosure()
    return <Popover
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            placement='bottom'
        >
        <PopoverTrigger>
            <Button variant={"filter"}>
                <BiPlusCircle/>
                {name} 
                {value && <>
                    <Box height={"13px"} mx={1} width="1px" bg="gray.400"/>
                    <Text as="span" color="primary.500">Value</Text>
                </>}
            </Button>
        </PopoverTrigger>
        <PopoverContent bg={mode("white", "black")} shadow={"lg"} p={2} maxW="3xs">
            <PopoverArrow bg={mode("white", "black")} />
            {children}
        </PopoverContent>
    </Popover>
}


 // Ensure you set `closeOnBlur` prop to false so it doesn't close on outside click
 export const Horizontal = () => {
    
    const firstFieldRef = React.useRef(null)
  
    return (
        <HStack minW="fit-content" px={4} spacing={1}>
            <Dialog name="Date">
                <DateRange/>
            </Dialog>
            <Dialog name="Amount">
                <NumberFilter/>
            </Dialog>
            <Dialog name="Title">
                <TextFilter/>
            </Dialog>
            <Dialog name="Friends">
                <RefFilter/>
            </Dialog>
            <Dialog name="Status">
                <RadioFilter/>
            </Dialog>
        </HStack>
    )
  }