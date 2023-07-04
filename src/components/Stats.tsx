import { Box, Divider, Flex, Heading, HStack, Text, VStack } from '@chakra-ui/layout'
import {
    Button,
    Card,
    Center,
    Collapse,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    IconButton,
  } from "@chakra-ui/react"
import React, { useEffect, useState } from 'react'

import calculator from '../lib/formula'
import { FaCaretUp } from 'react-icons/fa';
import useUser from '../@codbrix/hooks/useUser';
import { TbDashboard } from 'react-icons/tb';

function numberWithCommas(x:any) {
    x = x?.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x?.replace(pattern, "$1,$2");
    return x;
}


const Stats = ({values, props={}, view=false, onChange=() => {}}:any) =>  {

    const [stats, setStats]:any = useState({});


    const [preferred, setPreffered] = useState<number>(0.05);
    const [minimum, setMinimum] = useState<number>(0.05);

    const user:any = useUser()


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
  

    useEffect(() => {
        
        // const payload = {
        //     sell_rate: values['sell_rate'], 
        //     ttv: values['monthly_ttv'], 
        //     atv: values['atv'], 
        //     terminal_no: values['terminal_number'], 
        //     terminal_quantity:values['terminal_quanity'], 
        //     free_pos: values['free_pos'], 
        //     free_ba: values['free_baplus'], 
        //     free_myplace: values['free_myplace'], 
        //     amex_percent: values['amex']
        // }

        const payload = values;
        setStats(calculator(payload))


        for (let index = 1; index < 100; index++) {
            
            if(calculator({...payload, sell_rate: index * (3/100)}).deal_or_no_deal === "YELLOW"){
                setMinimum(index)
                break;
            }
        }

        for (let index = 1; index < 100; index++) {
            if(calculator({...payload, sell_rate: index * (3/100)}).deal_or_no_deal === "GREEN"){
                setPreffered(index)
                break;
            }

        }

    },[values])

    const admin = user.role === "admin";

    const [viewBDM, setBDM]:any = useState(false);
    
    useEffect(() => {
        onChange({...stats, minimum, preferred})
    }, [stats, minimum, preferred, onChange])

    useEffect(() => {
        setBDM(admin)
    }, [])

    const DrawerCont = () =>    <>
        <Box pos="relative">
            <Box px={6} mx={2} py={8} textAlign="center" rounded="lg">
            <Heading pt={3} pb={2} color={`${stats['deal_or_no_deal']?.toLowerCase() ?? 'red'}.500`} size="xl">
                {stats['deal_or_no_deal'] === "GREEN" && "Send to Sales Admin"}
                {stats['deal_or_no_deal'] === "RED" && <>No Deal</>}
                {stats['deal_or_no_deal'] === "YELLOW" && <>Pre-approval </>}
            </Heading>
            <Heading pb={3} color={`${stats['deal_or_no_deal']?.toLowerCase() ?? 'red'}.600`} size="sm">
                {stats['deal_or_no_deal'] === "GREEN" && ""}
                {stats['deal_or_no_deal'] === "RED" && <>Send to Sales Director</>}
                {stats['deal_or_no_deal'] === "YELLOW" && <>Subject to Review </>}
            </Heading>
            {/* {stats['deal_or_no_deal'] === "GREEN" && <Text fontWeight={"700"} mt={0}  fontSize="sm">
                @ {values['sell_rate']}% Sell Rate
            </Text>} */}
            </Box>
                <VStack py={3} px={6}>
                    <Flex w="100%" overflow={"hidden"} h={4} rounded="full" justify={"space-between"}>
                    {   [0,1,2,3].map(percent => <Text key={percent} fontSize={"10px"} fontWeight="bold">{percent}%</Text>)}
                    </Flex> 
                    <Flex mt={2} w="100%" overflow={"hidden"} h={2} rounded="full">
                        <Box justifySelf={"start"} minW={`${minimum}%`} bg="red.400" h={5}></Box>
                        <Box w={`${preferred - minimum}%`} h={5} bg="yellow.400"></Box>
                        <Box justifySelf={"end"} minW={`${100 - preferred}%`} bg="green.400" h={5}></Box>
                    </Flex>
                    <Flex w="100%">
                        <Box ml={`${(Number(values['sell_rate']) * 100 / 3)?.toFixed(2)}%`}>
                            <Box transform={"translateX(-50%) translateY(-50%)"}>
                                <FaCaretUp size="20px"/>
                            </Box>
                        </Box>
                    </Flex>
                </VStack>
                <Box px={3}>
                <Flex rounded={"xl"} bg="gray.50" py={3} px={2} gap={1} w="100%" justify={"space-between"}>
                    <VStack spacing={1} textAlign={"center"} w="100%">
                        <Heading fontSize={"0.7rem"} textTransform={"uppercase"} color="gray.400">Current</Heading>
                        <Heading color="gray.700" size="sm">{Number(values['sell_rate']).toFixed(2)}%</Heading>
                    </VStack>
                    <VStack spacing={1} textAlign={"center"} w="100%">
                        <Heading fontSize={"0.7rem"} textTransform={"uppercase"} color="gray.400">Minimum</Heading>
                        <Heading color="gray.700" size="sm">{Number(minimum * 3/100)?.toFixed(2)}%</Heading>
                    </VStack>
                    <VStack spacing={1} textAlign={"center"} w="100%">
                        <Heading fontSize={"0.7rem"} textTransform={"uppercase"} color="gray.400">Preferred</Heading>
                        <Heading color="gray.700" size="sm">{Number(preferred * 3/100)?.toFixed(2)}%</Heading>
                    </VStack>
                </Flex>
            </Box>
            <VStack {...useLongPress(() => {
                setBDM(true)
            }, 2500)} py={10} px={6}>
                <Divider/>
                <HStack fontSize={"0.90rem"} w="100%" justify={"space-between"}>
                    <Text>Monthly TTV:</Text>
                    <Text fontWeight={"700"}>${numberWithCommas(values['monthly_ttv'])}</Text>
                </HStack>
                <Divider/>
                <HStack fontSize={"0.90rem"} w="100%" justify={"space-between"}>
                    <Text>ATV:</Text>
                    <Text fontWeight={"700"}>${numberWithCommas(stats['atv'])}</Text>
                </HStack>
                <Divider/>
                <HStack fontSize={"0.90rem"} w="100%" justify={"space-between"}>
                    <Text>Total Transactions:</Text>
                    <Text fontWeight={"700"}>{numberWithCommas(stats['nTx'])}</Text>
                </HStack>
                <Divider/>
                    <HStack fontSize={"0.90rem"} w="100%" justify={"space-between"}>
                        <Text>MSF Revenue:</Text>
                        <Text fontWeight={"700"}>${numberWithCommas(stats['msf'])}</Text>
                    </HStack>
                    <Divider/>
                    <HStack fontSize={"0.90rem"} w="100%" justify={"space-between"}>
                        <Text>MSF Rate:</Text>
                        <Text fontWeight={"700"}>{(values['sell_rate'])?.toFixed(2)}%</Text>
                    </HStack>
                    <Divider/>
                    <HStack fontSize={"0.90rem"} w="100%" justify={"space-between"}>
                        <Text>COGS:</Text>
                        <Text fontWeight={"700"}>${numberWithCommas(stats['cost'])}</Text>
                    </HStack>
                    <Divider/>
                    {/* <HStack fontSize={"0.90rem"} w="100%" justify={"space-between"}>
                        <Text>Gross Profit Before Comms:</Text>
                        <Text fontWeight={"700"}>${numberWithCommas(stats['grossProfitBeforeComms'])}</Text>
                    </HStack>
                    <Divider/>
                    <HStack fontSize={"0.90rem"} w="100%" justify={"space-between"}>
                        <Text>Gross Percentage:</Text>
                        <Text fontWeight={"700"}>{numberWithCommas(stats['gp']?.toFixed(2))}%</Text>
                    </HStack>
                    <Divider/> */}
                <Box h={4}></Box>
                <Divider/>
                <HStack fontSize={"0.90rem"} w="100%" justify={"space-between"}>
                        <Text>Signup Comms:</Text>
                        <Text fontWeight={"700"}>${numberWithCommas(stats['signup']?.toFixed())}</Text>
                    </HStack>
                    <Divider/>
                    <HStack fontSize={"0.90rem"} w="100%" justify={"space-between"}>
                        <Text>Recurring Comms:</Text>
                        <Text fontWeight={"700"}>${numberWithCommas(stats['trail']?.toFixed())}</Text>
                    </HStack>
                    <Divider/>
                 {/*{viewBDM && <>
                    <Divider/>
                    <HStack fontSize={"0.90rem"} w="100%" justify={"space-between"}>
                        <Text>BDM Comms:</Text>
                        <Text fontWeight={"700"}>${numberWithCommas(stats['bdm'])}</Text>
                    </HStack>
                    <Divider/>
                </>}
                {admin && <>
                    <HStack fontSize={"0.90rem"} w="100%" justify={"space-between"}>
                    <Text>Annual GP: <small>(After Comm)</small></Text>
                    <Text fontWeight={"700"}>${numberWithCommas(stats['annualgp'])}</Text>
                </HStack>
                <Divider/>
                </>} */}
                {/* <Box mt={4} w="100%">
                    <Button size="lg" bg="black" _hover={{bg: "blackAlpha.800"}} color="white" w="100%">Share</Button>
                </Box> */}
            </VStack>
        </Box>
    </>

   

    return <>
          
    
  

        <Collapse in={view}>
            <Box p={1} mb={4} bg="white" borderRadius={"0 0 0.5rem 0.5rem"}>
                <DrawerCont/>
            </Box>
       </Collapse>

       {/* <Drawer
        isOpen={view}
        placement={'right'}
        size={["full", "md"]}
        onClose={() => {setView(false)}}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Stats</DrawerHeader>

          <DrawerBody px={[2, 3, 4, 6]}>
                <DrawerCont/>
          </DrawerBody>

          <DrawerFooter>
          </DrawerFooter>
        </DrawerContent>
      </Drawer> */}
    </>
}

export default Stats;