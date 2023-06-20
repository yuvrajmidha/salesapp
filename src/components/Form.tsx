import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Box, Center, Container, Divider, Flex, Grid, Heading, HStack, Text, VStack } from '@chakra-ui/layout'
import {
    Button,
    Card,
    chakra, CloseButton, Collapse, Input, Select,
  } from "@chakra-ui/react"
import { NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from '@chakra-ui/number-input'
import React, { useEffect, useRef, useState } from 'react'

import form_fields from '../constants/form.json';
import calculator from '../lib/formula'

const fields:any = form_fields;

function numberWithCommas(x:any) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}

export default function Form() {

    const [values, setValues]:any = useState(Object.fromEntries(fields.map((field:any) => [field.name, field.default])))

    const [stats, setStats]:any = useState({});

    const [view, setView]:any = useState(false);

    const [preferred, setPreffered] = useState<number>(0.05);
    const [minimum, setMinimum] = useState<number>(0.05);

    function handleChange(event:any) {
            const target = event.target;
            const value = target.type === 'checkbox' ? target.checked : target.value;
            const name = target.name;
        
            setValues({...values, [name]: value})
    }

    const handleValues = (values:any) => {
        
        setValues(Object.fromEntries(Object.entries(values).map(item => item[1] ? item : [item[0], ''])))

    }

    function setFieldValue(key:string, value:any){
        handleValues({...values, [key]: value})
    }   

    useEffect(() => {
        const params = Object.fromEntries(Object.entries(values).map(item => [item[0], Number(item[1])]))
        setStats(calculator(params))


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


    const Stats = () =>  <>
        <Heading size="md" py={4} color={values['venue_name'] ? 'black' : "gray.400"} textAlign="center">{values['venue_name'] ?? 'Unknown Venue'}</Heading>
        <Box px={6} mx={2} py={8} bg={`${stats['deal_or_no_deal']?.toLowerCase() ?? 'red'}.50`} textAlign="center" rounded="lg">
            <Heading color={`${stats['deal_or_no_deal']?.toLowerCase() ?? 'red'}.500`}>
                {Number(stats['gp']).toFixed(2) ?? '00'}%
            </Heading>
            <Text fontWeight={"700"} fontSize="20px">{stats['deal_or_no_deal'] === "GREEN" ? "It's a deal" : "Sorry! No Deal"}</Text>
        </Box>
    <VStack py={6} px={6}>
        {/* <Heading textAlign={"center"} mb={4} size="sm">Summary</Heading> */}
        {/* <Divider/> */}
        {/* <Box>{minimum} {preferred}</Box> */}
        {/* <HStack w="100%" justify={"space-between"}>
            <Text>Minium Sell Rate Required:</Text>
            <Text fontWeight={"700"}>{preferred.toFixed(2)}%</Text>
        </HStack> */}
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
    
    </>


  return (
   <Container maxW="5xl">
        <Grid gap={8} templateColumns={{base: "1fr", md: "1fr 400px"}}>
            <VStack spacing={4} py={8}>
                <Box px={3}>
                    <Heading mb={2} size="md">GP Calculator</Heading>
                    <Text>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur aliquid dolor illum soluta consequatur velit ad ullam amet sapiente, esse eius vitae. At hic aperiam nobis architecto magnam consectetur neque?</Text>
                </Box>
            <chakra.form w="100%" id="myForm" display={"flex"} flexWrap="wrap">
                <FormControl p={2} width={"100%"} py={3}>
                    <FormLabel>Venue Name</FormLabel>
                    <Input size="sm" name="venue_name" value={values['venue_name']} onChange={handleChange}></Input>
                </FormControl>
                {fields.map((field:any) => <FormControl p={2} width={field?.width ?? "100%"} py={3} key={field.name}>
                    <FormLabel>{field?.label}</FormLabel>
                    {!field?.dropdown ? <NumberInput
                        px={2}
                        rounded="md"
                        size="sm"
                        pos={"relative"}
                        name={field.name} 
                        precision={field.precision ?? 0} 
                        value={`${values[field.name]}`} 
                        onChange={(str, num) => {setFieldValue(field.name, str)}} 
                        max={field.max} 
                        min={field.min}
                        step={field.step ?? 1}
                        display="flex"
                        alignItems={"center"}
                        borderWidth={1}
                    >
                        {field.prefix && <Center fontSize={"1rem"} fontWeight="900" color="gray.400" h="100%" px={2}>
                            {field.prefix}
                        </Center>}
                        <NumberInputField px={1} border={0} _focus={{shadow:"none"}} />
                       {field.suffix && <Center fontSize={"1rem"} fontWeight="900" color="gray.400" h="100%" px={2}>
                            {field.suffix}
                        </Center>}
                        <NumberInputStepper pos="relative" flexDirection={"row"} width="4rem">
                            <NumberIncrementStepper borderWidth={0} py={2} rounded="md" px={2}/>
                            <NumberDecrementStepper borderWidth={0} py={2} px={2} rounded="md" _last={{borderWidth: 0}}/>
                        </NumberInputStepper>
                    </NumberInput> : <Select
                            size="sm"
                            name={field.name}
                            value={`${values[field.name]}`} 
                            onChange={handleChange}
                        >
                            {Array.from({
                                length: Math.floor((field?.max - field?.min)/field?.step)
                                }, (v, k) => (field.min + (k * field.step))).map(option => <option key={option} value={option}>
                                    {field?.prefix} {option} {field.suffix}
                            </option>)}
                        </Select>}
                </FormControl>)}
            </chakra.form>
            <Box h={20}/>
        </VStack>
        <Box display={{base: "none", md: "block"}} py={8}>
            <Box p={6} borderWidth={1} rounded="lg">
                <Stats/>
            </Box>
        </Box>
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
                    <Stats/>
                </Box>
            </Collapse>
        </Card>
        </Grid>
   </Container>
  )
}
