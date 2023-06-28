import {
  Box,
  Center,
  Input,
  InputGroup,
  InputGroupProps,
  InputLeftElement,
  InputRightElement,
  Spinner,
  useColorModeValue as mode,
} from '@chakra-ui/react'
import { BsSearch } from 'react-icons/bs'
import * as React from 'react'
import { useSearchParams } from 'react-router-dom'
import useSearching from '../@codbrix/hooks/useSearching'

export const SearchField = (props: InputGroupProps) => {

  const [params, setParams] = useSearchParams();

  const [search, setSearch] = React.useState<string>('')

  const {setSearching, searching} = useSearching()

  React.useEffect(() => {

    // if(search !== ''){
    //   setSearching(true)
    // }

    const delayDebounceFn = setTimeout(() => {
      
      if(search) setParams({'_search': search})
      if(search === ''){
        setParams({})
      }

    }, 1000);

    return () => clearTimeout(delayDebounceFn);

  }, [search])
  
  return (
    <InputGroup size="sm" >
      <InputLeftElement h="100%" pointerEvents="none">
        <BsSearch opacity={0.5} />
      </InputLeftElement>
      <InputRightElement  h="100%" pointerEvents="none">
        {/* <Center
          rounded="base"
          fontSize="xs"
          borderWidth="1px"
          w="5"
          h="5"
          bg={mode('gray.100', 'gray.800')}
          color="gray.500"
        >
          /
        </Center> */}
        {searching && <Spinner size="xs" color="gray.400"/>}
      </InputRightElement>
      <Input
        {...props}
        rounded="md"
        placeholder="Search"
        bg={mode('white', 'gray.900')}
        value={search}
        onChange={(e) => {setSearch(e.target.value)}}
        _placeholder={{
          opacity: 1,
          color: mode('gray.400', 'gray.500'),
        }}
      />
    </InputGroup>
  )
}
