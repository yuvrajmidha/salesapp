import React, { useContext, useEffect, useRef, useState } from 'react'
import { Box, Card, Center, Flex, HStack, Heading, IconButton, Input, InputGroup, InputLeftElement, Text, VStack } from '@chakra-ui/react'
import Route from '../components/Route'
import { MdAdd, MdSearch } from 'react-icons/md'
import { BiSearch } from 'react-icons/bi'
import { FaPlus } from 'react-icons/fa'
import OperationModal from '../components/OperationModal'
import { CBXContext } from '../@codbrix/components/provider'
import { QuickEdit } from '../components/QuickEdit'
import Form from '../components/Form'
import useUser from '../@codbrix/hooks/useUser'
import { useLocation, useSearchParams } from 'react-router-dom'
import { SearchField } from '../layout/SearchField'
import cbx from '../@codbrix/cbx'
import useAlert from '../@codbrix/hooks/useAlert'

function numberWithCommas(x:any) {
    x = x?.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x?.replace(pattern, "$1,$2");
    return x;
}


function useLongPress(callback = () => {}, ms = 2000) {
    const [startLongPress, setStartLongPress] = useState(false);
  
    useEffect(() => {
      var timerId:any;
      if (startLongPress) {
        timerId = setTimeout(callback, ms);
      } else {
        clearTimeout(timerId);
      }
  
      return () => {
        clearTimeout(timerId);
      };
    }, [callback, ms, startLongPress]);
  
    return {
      onMouseDown: () => setStartLongPress(true),
      onMouseUp: () => setStartLongPress(false),
      onMouseLeave: () => setStartLongPress(false),
      onTouchStart: () => setStartLongPress(true),
      onTouchEnd: () => setStartLongPress(false),
    };
  }

// import {CBXDemo} from '@codbrix/demo'

export default function Test() {

    const {action, quick_edit}:any = useContext(CBXContext);
    const form:any = useRef();

    const user = useUser()

    const location = useLocation()

    useEffect(() => {
        localStorage.setItem('cbx_last', location.pathname + document.location.search)
    }, [location])
    
    const {showError, showSuccess} = useAlert()

    const [params, setParams] = useSearchParams()

    const DeleteFn = (id:any) => useLongPress(() => {

        action.current.openPrompt('gplist/delete', id)

    }, 1000)

    return (
        <>
        <OperationModal ref={action}/>
        <QuickEdit ref={quick_edit}/>
        <Form ref={form} onSave={(values:any, callback:any) => {
            console.log(values)
            cbx.submit('gplist/add', {}, values).then((res:any) => {
                showSuccess(res?.message)
                setParams({_updated: "true"})
                callback()
            }).catch(err => {
                showError(err?.message)
            })
        }}/>
        <VStack bg="#f2f3f7" p={2} minH="100vh" w="100%">
           
            <HStack justify={"space-between"} align="center" w="100%" py={4} px={2}>
                <Box>
                    <Text fontSize={"0.8rem"}>OOLIO Group</Text>
                    <Heading size="md">GP Calculator</Heading>
                </Box>
                <Center onClick={() => {
                    quick_edit.current.openSidebar('user', user?._id)
                }} rounded={"full"} letterSpacing={"0.8"} fontWeight={"600"} color="white" bgGradient={"linear(to-tr, blue, red)"} boxSize={"2.5rem"}>
                    {user?.name?.split(' ')[0][0]}{user?.name?.split(' ')[1][0]}
                </Center>
            </HStack>

            <HStack py={2} justify={"space-between"} w="100%" px={1}>
                {/* <InputGroup>
                    <InputLeftElement pointerEvents='none'>
                    <BiSearch color='gray.300' />
                    </InputLeftElement>
                    <Input
                        value={params.get('_search') ?? ''}
                        onChange={(e) => {setParams({
                            _search: e.target.value
                        })}} bg="white" placeholder='Search' />
                </InputGroup> */}
                <SearchField py={3} h={"2.5rem"}/>
            </HStack>
            <HStack justify={"space-between"} w="100%" px={4}>
                <Heading size="sm">All Quotes</Heading>
            </HStack>
            <Route name={user.role === 'sales_user' ? 'gplist/my_quotations' : 'gplist/all'} view="list" render={(row: any, index: number) => <Box userSelect={"none"} {...DeleteFn(row._id)} key={index} w="100%" py={"0.15rem"} px={1}>
                <Card onClick={() => {form?.current?.openForm(row, row?.venue_name, true)}} _hover={{bg: "gray.50"}} shadow={"none"}>
                    <Flex w="100%">
                        {/* <Center className='cbx-drag' px={2}>
                            <i className='bx bx-grid-vertical' ></i>
                        </Center> */}
                        <Box py={2} px={3} w="100%">
                            <HStack justify={"space-between"} align={"start"}>
                                <Heading fontSize={"1rem"}>{row.venue_name}</Heading>
                                <Text px={2} fontSize={"0.8rem"}>{row['date']}</Text>
                            </HStack>
                            <Flex gap={2} py={1} align={"center"} fontSize={"0.8rem"}>
                                <Flex gap={1} align={"center"}>
                                    <i className='bx bxs-offer text-green-600'></i>
                                    <Text as="b">{row['sell_rate']}%</Text>
                                </Flex>
                                <Flex gap={1} align={"center"}>
                                    <i className='bx bxs-dollar-circle text-yellow-500'></i>
                                    <Text>${numberWithCommas(row['monthly_ttv'])}</Text>
                                </Flex>
                            </Flex>
                        </Box>
                    </Flex>
                </Card>
            </Box>}/>
            <Box py={6} color="gray.50">
                End of List
            </Box>
            <IconButton onClick={() => {form?.current?.openForm({}, "", false)}} size="lg" rounded={"full"} position={"fixed"} right={4} bottom={4} aria-label='add' colorScheme='blackAlpha' bg="black">
                <MdAdd/>
            </IconButton>
        </VStack>
        </>
    )

}
