import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Box, Center, Container, Divider, Grid, Heading, HStack, Text, VStack } from '@chakra-ui/layout'
import {
    Button,
    Card,
    chakra, CloseButton, Collapse, Select,
  } from "@chakra-ui/react"
import { NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from '@chakra-ui/number-input'
import React, { useEffect, useRef, useState } from 'react'

import form_fields from '../constants/form.json';
import calculator from '../lib/formula'

const fields:any = form_fields;

export default function Form() {

    const [values, setValues]:any = useState(Object.fromEntries(fields.map((field:any) => [field.name, field.default])))

    const [stats, setStats]:any = useState({});

    const [view, setView]:any = useState(false);

    const [preferred, setPreffered] = useState<number>(0.05);

    function handleChange(event:any) {
            const target = event.target;
            const value = target.type === 'checkbox' ? target.checked : target.value;
            const name = target.name;
        
            handleValues({...values, [name]: value})
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


        for (let index = 1; index < 200; index++) {
            
            if(calculator({...params, sell_rate: index * 0.05}).deal_or_no_deal === "GREEN"){
                setPreffered(index * 0.05)
                break;
            }

        }

    },[values])


  return (
   <Container maxW="5xl">
        <Grid gap={8} templateColumns={{base: "1fr", md: "1fr 400px"}}>
            <VStack spacing={4} py={8}>
                <Box px={3}>
                    <Heading mb={2} size="md">GP Calculator</Heading>
                    <Text>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur aliquid dolor illum soluta consequatur velit ad ullam amet sapiente, esse eius vitae. At hic aperiam nobis architecto magnam consectetur neque?</Text>
                </Box>
            <chakra.form w="100%" id="myForm" display={"flex"} flexWrap="wrap">
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
                <Heading>
                    {stats['deal_or_no_deal'] ?? 'RED'}
                </Heading>
                <Text>{Number(stats['gp']).toFixed(2) ?? '00'}%</Text>
                <Text>Preffered: {preferred.toFixed(2)}%</Text>
            </Box>
        </Box>
        <Card rounded={view ? "0px" : "0.5rem 0.5rem 0"} maxH="100vh" overflowY={"auto"} display={{md: "none", base: "block"}} w="100%" shadow={"0 -1px 5px 2px #00000011"} p={2} pos={"fixed"} bottom={0} right={0} left={0}>
            <HStack align={"center"} justify={"space-between"} px={2} height="3.5rem" w="100%">
                <Box>
                    {!view ? <>
                        <Text fontSize={"12px"}>Gross Percentage</Text>
                        <Heading color={`${stats['deal_or_no_deal']?.toLowerCase() ?? 'red'}.500`} size="md">{Number(stats['gp']).toFixed(2) ?? '00'}%</Heading>
                    </> : <Heading size="md">Stats</Heading>}
                </Box>
                <Button onClick={() => {setView(!view)}} variant={view ? "ghost" : "outline"} colorScheme="blue" size="sm">
                    {view ? <CloseButton/>  :"View Stats"}
                </Button>
            </HStack>
            <Collapse in={view} animateOpacity>
                <Box overflowY={"auto"} minH="calc(100vh - 4.5rem)" py={6}>
                    <Box px={6} mx={2} py={12} bg={`${stats['deal_or_no_deal']?.toLowerCase() ?? 'red'}.50`} textAlign="center" rounded="lg">
                        <Heading color={`${stats['deal_or_no_deal']?.toLowerCase() ?? 'red'}.500`}>
                            {Number(stats['gp']).toFixed(2) ?? '00'}%
                        </Heading>
                        <Text fontWeight={"700"} fontSize="20px">{stats['deal_or_no_deal'] === "GREEN" ? "It's a deal" : "Sorry! No Deal"}</Text>
                    </Box>
                    {/* <Box py={6}>
                        <Text>Preffered: {preferred.toFixed(2)}%</Text>
                    </Box> */}
                    <VStack py={6} px={6}>
                        <Heading textAlign={"center"} mb={4} size="sm">Summary</Heading>
                        <Divider/>
                        <HStack w="100%" justify={"space-between"}>
                            <Text>Minium Sell Rate Required:</Text>
                            <Text fontWeight={"700"}>{preferred.toFixed(2)}%</Text>
                        </HStack>
                        <Divider/>
                        <HStack w="100%" justify={"space-between"}>
                            <Text>TTV:</Text>
                            <Text fontWeight={"700"}>${values['ttv']}</Text>
                        </HStack>
                        <Divider/>
                        <HStack w="100%" justify={"space-between"}>
                            <Text>ATV:</Text>
                            <Text fontWeight={"700"}>${stats['atv']}</Text>
                        </HStack>
                        <Divider/>
                        <HStack w="100%" justify={"space-between"}>
                            <Text>Total TX:</Text>
                            <Text fontWeight={"700"}>{stats['nTx']} Txns</Text>
                        </HStack>
                        <Divider/>
                        <HStack w="100%" justify={"space-between"}>
                            <Text>MSF Revenue:</Text>
                            <Text fontWeight={"700"}>${stats['msf']}</Text>
                        </HStack>
                        <Divider/>
                        <HStack w="100%" justify={"space-between"}>
                            <Text>Gross Profit Before Comms:</Text>
                            <Text fontWeight={"700"}>${stats['grossProfitBeforeComms']}</Text>
                        </HStack>
                        <Divider/>
                    </VStack>
                </Box>
            </Collapse>
        </Card>
        </Grid>
   </Container>
  )
}
