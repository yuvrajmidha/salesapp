import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Box, Center, Container, Divider, Flex, Grid, AspectRatio, Heading, HStack, Text, VStack } from '@chakra-ui/layout'
import {
    Button,
    Card,
    chakra, Collapse, Input, Select, Slider, SliderFilledTrack, SliderThumb, SliderTrack,
  } from "@chakra-ui/react"
import { NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from '@chakra-ui/number-input'
import React, { useEffect, useState } from 'react'

import form_fields from '../constants/form.json';
import { FaMinus, FaPlus } from 'react-icons/fa'
import Stats from './Stats'

const fields:any = form_fields;

export default function Form() {

    const [values, setValues]:any = useState(Object.fromEntries(fields.map((field:any) => [field.name, field.default])))

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

    const [stats, setStats] = useState<any>({})

  return (
    <Box pos={"fixed"} h="100vh" top={0} right={0}  width={"100vw"} overflowY={"auto"}>
        <Stats values={values} onChange={setStats}/>
    {/* <Box bg="gray.900" borderRadius={"0 0 1rem 1rem"}> */}
       
    {/* </Box> */}
    <Box zIndex={300} bg="white" p={3} borderRadius={"0"} dropShadow={"none"} >
        <chakra.form w="100%" id="myForm" display={"flex"} flexWrap="wrap">
        {/* <FormControl p={2} width={"100%"} py={3}>
            <FormLabel>Venue Name</FormLabel>
            <Input size="sm" name="venue_name" value={values['venue_name']} onChange={handleChange}></Input>
        </FormControl> */}
        {fields.map((field:any) => <FormControl px={2} py={2} w={field?.width ?? "100%"} display={"flex"} gap={2} flexDirection={field?.flow ?? "column"} justifyContent={"space-between"} alignItems={"center"} key={field.name}>
            <FormLabel w="100%" textAlign={field.flow === "row" ? "left" : "center"}  m={0}>{field?.label}</FormLabel>
            
            {field.type === 'slider' && <Slider
                aria-label='slider'
                min={0}
                step={0.05}
                max={3}
                value={Number(values['sell_rate'])}
                onChange={(val) => setFieldValue(field.name, val)}
                >
                <SliderTrack bgGradient={`linear(to-r, red.500 0%, red.500 ${stats['minimum']}%, yellow.500 ${stats['minimum']}%, yellow.500 ${stats['preferred']}%, green.500 ${stats['preferred']}%)`}>
                    <SliderFilledTrack bg="transparent" />
                </SliderTrack>
                <SliderThumb/>
            </Slider>}

            {field.type === "number" && <NumberInput
                gap={2}
                w="100%"
                size="lg"
                pos={"relative"}
                rounded="full"
                name={field.name} 
                precision={field.precision ?? 0} 
                value={`${values[field.name]}`} 
                onChange={(str, num) => {setFieldValue(field.name, str)}} 
                max={field.max} 
                min={field.min}
                step={field.step ?? 1}
                borderWidth={1}
                display="flex"
                alignItems={"center"}
                justifyContent={"space-between"}
            >
                
                <NumberDecrementStepper _disabled={{borderColor: "gray.300", color: "gray.300"}} borderWidth={0} py={"0.3rem"} borderColor={"gray.400"} color="gray.600" px={"1rem"} borderRadius={"4px !important"}>
                        <FaMinus size="10px"/>
                </NumberDecrementStepper>
               
                <Flex gap={1} fontWeight={"600"} rounded={"lg"} py={1} justify={"center"} w="100%" align={"center"}>
                    <Text as="span">
                      {field.prefix}
                    </Text>
                    <Text as="span">
                      {values[field.name]}
                    </Text>
                    <Text as="span">
                      {field.suffix}
                    </Text>
                </Flex>
                
                {/* <NumberInputField px={1} border={0} w="fit-content !important" _focus={{shadow:"none"}} /> */}
                <NumberIncrementStepper _disabled={{borderColor: "gray.300", color: "gray.300"}} borderWidth={0} borderTop={"none"} py={"0.4rem"} borderColor={"gray.400"} color="gray.600" px={"1rem"} borderRadius={"4px !important"}>
                        <FaPlus size={"10px"}/>
                </NumberIncrementStepper>
            
            </NumberInput>}
            {field.type === "spacer" && <Center w="100%" h={field.value}>
                {field?.divider && <Divider w="100%"/>}
            </Center>}
             {field.type === "dropdown" && <Flex overflowX={"auto"} w="100%">
                    <Flex gap={2}  py={6} w="fit-content">
                    {Array.from({
                        length: Math.floor((field?.max - field?.min)/field?.step)
                        }, (v, k) => (field.min + (k * field.step))).map(option => <VStack 
                            key={option}
                            minW={"96px"}
                            spacing={0}
                            rounded={"lg"}
                            onClick={() => {Number(values[field.name]) === option ?  setFieldValue(field.name, '') : setFieldValue(field.name, option)}}
                            shadow={Number(values[field.name]) === option ? "lg" : 'none'}
                            bg={Number(values[field.name]) === option ? "black" : 'gray.100'}
                            color={Number(values[field.name]) !== option ? "black" : 'gray.100'}
                            _selected={{shadow: "lg"}}
                            px={2}
                            py={2}
                        >
                            <Text fontWeight={"600"}>{field?.prefix}</Text>
                            <Text fontSize={"2xl"} fontWeight={"800"}>{option}</Text> 
                            <Text>{field?.suffix}</Text>
                    </VStack>)}
                </Flex>
                </Flex>}
        </FormControl>)}
        </chakra.form>
        <Box h={20}/>
        </Box>
    </Box>
    
            
  )
}
