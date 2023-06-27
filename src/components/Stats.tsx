import { Box, Divider, Flex, Heading, HStack, Text, VStack } from '@chakra-ui/layout'
import {
    Button,
    Card,
    Collapse,
  } from "@chakra-ui/react"
import React, { useEffect, useState } from 'react'

import calculator from '../lib/formula'

function numberWithCommas(x:any) {
    x = x?.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x?.replace(pattern, "$1,$2");
    return x;
}

const Stats = ({values}:any) =>  {

    const [stats, setStats]:any = useState({});

    const [view, setView]:any = useState(false);

    const [preferred, setPreffered] = useState<number>(0.05);
    const [minimum, setMinimum] = useState<number>(0.05);

    useEffect(() => {
        const params = Object.fromEntries(Object.entries(values).map(item => [item[0], Number(item[1])]))
        setStats(calculator({
            sell_rate: params['sell_rate'], 
            ttv: params['ttv'], 
            atv: params['atv'], 
            terminal_no: params['terminal_no'], 
            terminal_quantity:params['terminal_quantity'], 
            free_pos: params['free_pos'], 
            free_ba: params['free_ba'], 
            free_myplace: params['free_myplace'], 
            amex_percent: params['amex_percent']
        }))


        for (let index = 1; index < 100; index++) {
            
            if(calculator({...params, sell_rate: index * (3/100)}).deal_or_no_deal === "YELLOW"){
                setMinimum(index)
                break;
            }
        }

        for (let index = 1; index < 100; index++) {
            if(calculator({...params, sell_rate: index * (3/100)}).deal_or_no_deal === "GREEN"){
                setPreffered(index)
                break;
            }

        }

    },[values])

    return <>
    <Card rounded={view ? "0px" : "0.5rem 0.5rem 0 0"} zIndex={400} maxH="100vh" overflowY={"auto"} display={{md: "none", base: "block"}} w="100%" shadow={"0 -1px 5px 2px #00000011"} p={2} pos={"fixed"} bottom={0} right={0} left={0}>
            <HStack align={"center"} justify={"space-between"} px={2} height="3.5rem" w="100%">
                <Box>
                    {!view ? <>
                        <Flex gap={2} align="center">
                            {/* <Heading size="sm">GP: </Heading>  */}
                            <Heading color={`${stats['deal_or_no_deal']?.toLowerCase() ?? 'red'}.500`} size="md">{Number(stats['gp']).toFixed(2) ?? '00'}%</Heading>
                        </Flex>
                        <Text color={`${stats['deal_or_no_deal']?.toLowerCase() ?? 'red'}.700`} fontWeight={"700"} fontSize="14px">{stats['deal_or_no_deal'] === "GREEN" ? "It's a deal" : "Sorry! No Deal"}</Text>
                    </> : <Heading size="md">Stats</Heading>}
                </Box>
                <Button onClick={() => {setView(!view)}} variant={view ? "ghost" : "outline"} colorScheme="blue" size="sm">
                    {view ? "Close"  :"View Stats"}
                </Button>
            </HStack>
            <Collapse in={view} animateOpacity>
                <Box pos="relative" overflowY={"auto"} minH="calc(100vh - 4.5rem)" py={6}>
                <Heading size="md" py={4} color={values['venue_name'] ? 'black' : "gray.400"} textAlign="center">{values['venue_name'] ?? 'Unknown Venue'}</Heading>
        <Box px={6} mx={2} py={8} bg={`${stats['deal_or_no_deal']?.toLowerCase() ?? 'red'}.50`} textAlign="center" rounded="lg">
            <Heading color={`${stats['deal_or_no_deal']?.toLowerCase() ?? 'red'}.500`}>
                {Number(stats['gp']).toFixed(2) ?? '00'}%
            </Heading>
            <Text fontWeight={"700"} fontSize="20px">{stats['deal_or_no_deal'] === "GREEN" ? "It's a deal" : "Sorry! No Deal"}</Text>
        </Box>
    <VStack py={6} px={6}>
    <Flex w="100%" overflow={"hidden"} h={4} rounded="full" justify={"space-between"}>
        {[0,1,2,3].map(percent => <Text fontSize={"10px"} fontWeight="bold">{percent}%</Text>)}
    </Flex> 
    <Flex mt={2} w="100%" overflow={"hidden"} h={2} rounded="full" bg="yellow.400" justify={"space-between"}>
        <Box w={`${minimum}%`} bg="red.400" h={5}></Box>
        <Box w={`${100 - preferred}%`} bg="green.400" h={5}></Box>
    </Flex>
    <Flex mt="-1.4rem" w="100%">
        <Box ml={`${(Number(values['sell_rate']) * 100 / 3).toFixed(2)}%`} w={"3px"} h={5} bg="black"></Box>
    </Flex> 
    </VStack>
    <Box px={3}>
        <Flex rounded={"xl"} bg="gray.50" py={4} px={2} gap={1} w="100%" justify={"space-between"}>
            <VStack spacing={1} textAlign={"center"} w="100%">
                <Heading fontSize={"0.8rem"} textTransform={"uppercase"} color="gray.400">Current</Heading>
                <Heading color="gray.700" size="md">{Number(values['sell_rate']).toFixed(2)}%</Heading>
            </VStack>
            <VStack spacing={1} textAlign={"center"} w="100%">
                <Heading fontSize={"0.8rem"} textTransform={"uppercase"} color="gray.400">Minimum</Heading>
                <Heading color="gray.700" size="md">{Number(minimum * 3/100).toFixed(2)}%</Heading>
            </VStack>
            <VStack spacing={1} textAlign={"center"} w="100%">
                <Heading fontSize={"0.8rem"} textTransform={"uppercase"} color="gray.400">Preffered</Heading>
                <Heading color="gray.700" size="md">{Number(preferred * 3/100).toFixed(2)}%</Heading>
            </VStack>
        </Flex>
    </Box>
    <VStack py={6} px={6}>
    <Divider/>
            <HStack w="100%" justify={"space-between"}>
                <Text>TTV:</Text>
                <Text fontWeight={"700"}>${numberWithCommas(values['ttv'])}</Text>
            </HStack>
            <Divider/>
            <HStack w="100%" justify={"space-between"}>
                <Text>ATV:</Text>
                <Text fontWeight={"700"}>${numberWithCommas(stats['atv'])}</Text>
            </HStack>
            <Divider/>
            <HStack w="100%" justify={"space-between"}>
                <Text>Total TX:</Text>
                <Text fontWeight={"700"}>{numberWithCommas(stats['nTx'])} Txns</Text>
            </HStack>
            <Divider/>
            <HStack w="100%" justify={"space-between"}>
                <Text>MSF Revenue:</Text>
                <Text fontWeight={"700"}>${numberWithCommas(stats['msf'])}</Text>
            </HStack>
            <Divider/>
            <HStack w="100%" justify={"space-between"}>
                <Text>Gross Profit Before Comms:</Text>
                <Text fontWeight={"700"}>${numberWithCommas(stats['grossProfitBeforeComms'])}</Text>
            </HStack>
            <Divider/>
            <HStack w="100%" justify={"space-between"}>
                <Text>BDM Comms:</Text>
                <Text fontWeight={"700"}>${numberWithCommas(stats['bdm'])}</Text>
            </HStack>
            <Divider/>
            <HStack w="100%" align={"center"} justify={"space-between"}>
                <Text>Annual GP: <small>(After Comm)</small></Text>
                <Text fontWeight={"700"}>${numberWithCommas(stats['annualgp'])}</Text>
            </HStack>
            <Divider/>
            <Box mt={4} w="100%">
                <Button size="lg" bg="black" _hover={{bg: "blackAlpha.800"}} color="white" w="100%">Share</Button>
            </Box>
        </VStack>
            </Box>
        </Collapse>
        </Card>
 

</>
}

export default Stats;