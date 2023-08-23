import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Box, Center, Divider, Flex,Heading, HStack, Text } from '@chakra-ui/layout'
import {
    Button,
    ButtonGroup,
    chakra, Collapse, IconButton, Input, Select, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack,
    VStack
  } from "@chakra-ui/react"
import { NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField } from '@chakra-ui/number-input'
import React, { useEffect, useImperativeHandle, useRef, useState } from 'react'

import form_fields from './form.json';
import { FaArrowLeft, FaMinus, FaPlus, FaTrash } from 'react-icons/fa'
import Stats from './Stats'
import { TbCross, TbDashboard } from 'react-icons/tb'
import { MdCancel, MdCheck, MdEdit, MdOutlineCancel } from 'react-icons/md'
import { BiX } from 'react-icons/bi'
import MyAlert from './Alert'
import Confirmation from '../@codbrix/components/dialog/Confirmation'

const fields:any = form_fields;

const Form = React.forwardRef(({onSave=() => {}, onEdit=()=>{}, onMailSend=()=>{}, group='oolio'}:any, ref:any) => {

    const [values, setValues]:any = useState(Object.fromEntries(fields.map((field:any) => [field.name, field?.default])))

    function handleChange(event:any) {
            const target = event.target;
            const value = target.type === 'checkbox' ? target.checked : target.value;
            const name = target.name;
        
            setValues({...values, [name]: value})
    }

    const handleValues = (values:any) => {
        
        setValues(values)

    }

    function setFieldValue(key:string, value:any){
        if(value || value === 0){
            handleValues({...values, [key]: value})
        }
    }   

    const [stats, setStats] = useState<any>({})
    
    const [view, setView] = useState<any>(0)

    const [hue, setHue]:any = useState(120);


  
    useEffect(() => {


        if(stats['deal_or_no_deal'] === 'GREEN'){
            setHue(98)
        }
        if(stats['deal_or_no_deal'] === 'YELLOW'){
            setHue(24)
        }
        if(stats['deal_or_no_deal'] === 'RED'){
            setHue(-22)
        }

    }, [stats])

    const [open, setOpen] = useState(false)
    const [venueName, setName] = useState('Unknown')

    const [edit, setEdit] = useState(false)

    const [loading, setLoading]:any = useState(false)

    const getFieldLabel = (name:any, label:any) => {
        if(name === 'free_ba'){
            return `${group === 'idealpos' ? label?.replace('BA+', 'A+') : label}`
        }
        else if(name === 'free_myplace'){
            return `${group === 'idealpos' ? label?.replace('MyPlace', 'Loyalty') : label}`
        }
        else{
            return label
        }
    }

    useImperativeHandle(ref, (() => ({
        openForm: (data={}, title="Unknown", edit=false) => {
            if(Object.entries(data).length > 0){
                setValues(data)
            }
            setName(title)
            setEdit(edit)
            setView(1)
            setOpen(true)
        }
    })))

    useEffect(() => {

        if(venueName === ''){
            if(edit){
                setName("Unknown")
            }
        }

    }, [venueName, edit])

    useEffect(() => {

        setLoading(false)
        if(!edit){
            setValues(Object.fromEntries(fields.map((field:any) => [field.name, field.default])))
        }

    }, [open])

  return (
    <Box pos={"fixed"} h="100vh" bg="white" zIndex={250} transform={!open ? "translateY(100%)" : ""} top={0} right={0}
        width={"100vw"} 
        transition={"0.4s"}
        // bg={!view ? "red.500" : "white"}
        overflowY={"auto"}
    >
        <Box zIndex={300}>
                <Box w="100%" h={1} bg={`${stats['deal_or_no_deal']?.toLowerCase()}.500`}></Box>
                <HStack bg="white" borderRadius={"0.5rem 0.5rem 0 0"} justify={"space-between"} pos="relative" transition={"0.3s"} py={1} px={1} spacing={4}>
                        {/* <Box></Box> */}
                        <Flex gap={1} align={"center"}>
                            <IconButton opacity={(view !== 0 || edit) ? 1 : 0} transition={"0.5s"} ml={(view !== 0 || edit) ? 1 : "-1.5rem"} onClick={() => {
                                if(!edit){
                                    // eslint-disable-next-line no-restricted-globals
                                    var flag:any = confirm("Your changes will be unsaved. Are you sure you want to leave?")
                                    setOpen(!flag)
                                }
                                else{
                                    setOpen(false)
                                }

                            }} variant={"ghost"} size="sm" aria-label='back'><FaArrowLeft/></IconButton>
                            <Heading py={2} size="md">{edit ? venueName : (view === 0 ? venueName : "GP Calculator")}</Heading>
                            {/* {(!edit && view !== 2) && <IconButton onClick={() => {setView(2)}} variant={"ghost"} colorScheme="blue" size="xs" rounded={"full"} aria-label='edit'>
                                <MdEdit size="1rem"/>
                            </IconButton>} */}
                        </Flex>
                        <Box>
                            {view === 0 ? <Button gap={[2, 2]} aria-label='Stats' onClick={() => {setView(1)}}  variant={"ghost"} my={1} size="sm" rounded={"full"}>
                                    <BiX size="18px"/>
                                    <Text as="span" display={["block"]}>Hide</Text>
                                </Button> : <Button gap={[0, 2]} aria-label='Stats' onClick={() => {setView(0)}}  variant={"ghost"} my={1} size="sm" rounded={"full"}>
                                <TbDashboard/>
                                <Text as="span" display={["none", "block"]}>View</Text>
                                <Text as="span" ml={2} display={["block"]}>Stats</Text>
                            </Button>}
                        </Box>
                </HStack>
        </Box>

        <Stats values={values} view={view === 0} onChange={setStats}/>

        <Collapse in={view === 1}>
            <Box zIndex={300} bg="white" borderRadius={"0"} dropShadow={"none"} >
                {open && <MyAlert/>}
                {!edit && <Box p={4} w="100%">
                    <Box w="100%" textAlign={"left"}>
                        <FormLabel w="100%"  mb={2}>Venue Name</FormLabel>
                        {/* <Text fontSize={"xs"}>Ex. GST</Text> */}
                    </Box>
                    <Input size="md" value={venueName} onChange={(e) => {setName(e.target.value)}} placeholder='Enter Venue Name'/>
                </Box>}
                <chakra.form w="100%" id="myForm" display={"flex"} flexWrap="wrap">
                {/* <FormControl p={2} width={"100%"} py={3}>
                    <FormLabel>Venue Name</FormLabel>
                    <Input size="sm" name="venue_name" value={values['venue_name']} onChange={handleChange}></Input>
                </FormControl> */}


                {fields.map((field:any, index:number) => 
                <Box w={field?.width ?? "100%"} key={index}>
                {field.type === 'slider' && <FormControl px={4}  pt={4} pb={8} display={"flex"} gap={2} flexDirection={field?.flow ?? "column"} justifyContent={"space-between"} alignItems={"center"} key={index}>
                    <Box  w="100%" m={0} mb={10} textAlign={field.flow === "row" ? "left" : "left"}>
                        <FormLabel mb={0} fontWeight={"bold"} fontSize={"md"} >{field?.label}</FormLabel>
                        <Text fontSize={"xs"}>Percent of amount deducted on each txn.</Text>
                    </Box>
                    
                     <Slider
                        aria-label='slider'
                        min={0}
                        step={0.05}
                        max={2.75}
                        value={Number(values['sell_rate'])}
                        onChange={(val) => setFieldValue(field.name, val)}
                        >
                        {[0, 1, 2, 2.5].map((value:number) => <SliderMark
                            value={value}
                            key={value}
                            mt={2}
                            children={<Text as="b" fontSize={"sm"}>{value}%</Text>}
                        />)}

                        <SliderMark
                        value={Number(values['sell_rate'])}
                        textAlign='center'
                        borderWidth={1}
                        rounded={4}
                        px={2}
                        mt='-12'
                        ml='-7'
                        >
                        {Number(values['sell_rate'])}%
                        </SliderMark>
                        <SliderTrack bgGradient={`linear(to-r, red.500 0%, red.500 ${stats['minimum']}%, yellow.500 ${stats['minimum']}%, yellow.500 ${stats['preferred']}%, green.500 ${stats['preferred']}%)`}>
                            <SliderFilledTrack bg="transparent" />
                        </SliderTrack>
                        <SliderThumb p={3} borderWidth={2} borderColor={"gray.300"}/>
                    </Slider>
                    </FormControl>}

                    {field.type === "number" &&
                        <FormControl  px={4} py={4}  display={"flex"} gap={2} flexDirection={field?.flow ?? "column"} justifyContent={"space-between"} alignItems={"start"} key={index}>
                        <Box w="100%" textAlign={field.align === "left" ? "left" : "center"}>
                            <FormLabel w="100%"  m={0}>{getFieldLabel(field.name, field.label)}</FormLabel>
                            {/* <Text fontSize={"xs"}>Ex. GST</Text> */}
                        </Box>
                        <NumberInput
                            gap={0}
                            maxW={field?.maxW ?? "48"}
                            w="100%"
                            size="lg"
                            py={1}
                            pos={"relative"}
                            rounded="4"
                            name={field.name} 
                            precision={field.precision ?? 0} 
                            value={values[field.name]} 
                            onChange={(str, num) => {
                                setFieldValue(field.name, num ? num : 0)
                            }} 
                            max={field.max} 
                            min={field.min}
                            step={field.step ?? 1}
                            borderWidth={1}
                            display="flex"
                            alignItems={"center"}
                            justifyContent={"space-between"}
                        >
                            
                            <NumberDecrementStepper _disabled={{borderColor: "gray.300", color: "gray.300"}} borderWidth={0} py={"0.5rem"} bg="gray.100" mx={2} borderColor={"gray.400"} color="gray.600" px={"0.8rem"} borderRadius={"4px !important"}>
                                    <FaMinus size="10px"/>
                            </NumberDecrementStepper>
                
                            <Text fontSize={"sm"} as="span">
                                {field.prefix}
                            </Text>
                            
                                
                            <NumberInputField height={"auto"} py={1}  border={0} w="100%" shadow={"none"} _focus={{shadow: "none"}} textAlign={"center"} fontSize={"sm"} px={0}></NumberInputField>
                            
                            <Text fontSize={"sm"} as="span">
                                {field.suffix}
                            </Text>
                
                            <NumberIncrementStepper _disabled={{borderColor: "gray.300", color: "gray.300"}} borderWidth={0} borderTop={"none"} py={"0.5rem"} bg="gray.100" mx={2} borderColor={"gray.400"} color="gray.600" px={"0.8rem"} borderRadius={"4px !important"}>
                                    <FaPlus size={"10px"}/>
                            </NumberIncrementStepper>
                        
                        </NumberInput>
                 
                        </FormControl>
                    }

                    {field.type === "value" &&
                    <FormControl  px={4} py={4}  display={"flex"} gap={2} flexDirection={field?.flow ?? "column"} justifyContent={"space-between"} alignItems={"start"} key={index}>
                        <Box w="100%" textAlign={field.align === "left" ? "left" : "center"}>
                            <FormLabel w="100%"  m={0}>{field?.label}</FormLabel>
                            {/* <Text fontSize={"xs"}>Ex. GST</Text> */}
                        </Box>
                    
                        <Flex  gap={1} fontWeight={"600"} rounded={4} py={1} px={1} justify={"start"} w="100%" align={"center"}>
                            <Text as="span">
                            {field.prefix}
                            </Text>
                            <Text as="span">
                            {stats[field.name]}
                            </Text>
                            <Text as="span">
                            {field.suffix}
                            </Text>
                        </Flex>
                
                    </FormControl>
                    }
                    {field.type === "spacer" && <Center px={4} w="100%" h={field.value}>
                        {field?.divider && <Divider w="100%"/>}
                    </Center>}
                    {field.type === "dropdown" && <FormControl   py={4} display={"flex"} gap={2} flexDirection={field?.flow ?? "column"} justifyContent={"space-between"} alignItems={"center"} key={index}>
                    <FormLabel w="100%" px={2} textAlign={"left"}  m={0}>{field?.label}</FormLabel>
                    <Box px={2} w="100%">
                        <Select value={values[field.name]} onChange={handleChange} name={field.name} pb={0} p={0} className='!pt-0' size="md">
                            {field?.values?.map((item:any, index:number) => <option key={index} value={index}>{item}</option>)}
                        </Select>
                    </Box>
                    {/* <Flex overflowX={"auto"}  w="100%">
                            <Flex gap={2} px={2}  py={3} w="fit-content">
                            {Array.from({
                                length: Math.floor((field?.max - field?.min)/field?.step)
                                }, (v, k) => (field.min + (k * field.step))).map(option => <HStack 
                                    key={option}
                                    minW={"96px"}
                                    align={"center"}
                                    spacing={2}
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
                                    <Text fontWeight={"800"}>{option}</Text> 
                                    <Text>{field?.suffix}</Text>
                            </HStack>)}
                        </Flex>
                        </Flex> */}
                        </FormControl>}
                </Box>
                )}
                </chakra.form>
                <Box pos={"fixed"} zIndex={100} p={2} bottom={2} left={0} right={0}>
                    <Flex w="100%" borderWidth={1} px={4} py={2} align={"center"} justify={"space-between"} rounded={"lg"} bg="white" shadow={"xl"}>
                        <Box>
                            <Flex mb={1} gap={2}>
                                {['red', 'yellow', 'green'].map((item:any, index:number) => <Box boxSize={4} rounded={"full"} bg={`${item}.500`} opacity={stats['deal_or_no_deal']?.toLowerCase() === item ? 1 : 0.3} key={index}></Box>)}
                            </Flex>
                            <Text fontSize={"sm"} fontWeight={"bold"}>
                            {stats['deal_or_no_deal'] === "GREEN" && "Send to Sales Admin"}
                            {stats['deal_or_no_deal'] === "RED" && "No Deal: Send to Sales Director"}
                            {stats['deal_or_no_deal'] === "YELLOW" && "Pre-approval: Subject to Review "}
                            </Text>
                        </Box>
                        <Button gap={[0, 2]} aria-label='Stats' colorScheme="primary" onClick={() => {setView(0)}}  variant={"solid"} my={1} size="md" rounded={"full"}>
                            <TbDashboard/>
                            <Text as="span" display={["none", "block"]}>View</Text>
                            <Text as="span" ml={2} display={["block"]}>Stats</Text>
                        </Button>
                    </Flex>
                </Box>
               <Box p={2} my={4}>
                   
                    {edit ? <ButtonGroup gap={0} w="100%">
                        <Confirmation title="Send Email" text="Do you want to send email too?" discardText="Save Only" confirmText="Send Email" onConfirm={(callback:any) => {
                            setLoading(true)
                            onEdit({...Object.fromEntries(Object.entries(values).map(item => item[1] ? [item[0], Number(item[1])] : [item[0], 0])), venue_name: venueName}, values._id, () => {
                                setOpen(false)
                                callback()
                                onMailSend({...Object.fromEntries(Object.entries(values).map(item => item[1] ? [item[0], Number(item[1])] : [item[0], 0])), venue_name: venueName})
                            })
                        }} onDiscard={() => {
                            setLoading(true)
                            onEdit({...Object.fromEntries(Object.entries(values).map(item => item[1] ? [item[0], Number(item[1])] : [item[0], 0])), venue_name: venueName},values._id, () => {
                                setOpen(false)
                            })
                        }} w="100%">
                            <Button isLoading={loading} loadingText="Sending"  colorScheme="blackAlpha" bg="black" w="100%">
                                Save 
                            </Button>
                        </Confirmation>
                    </ButtonGroup> : <VStack>
                        <Button size="lg" onClick={() => {
                            if(venueName){
                                setLoading(1)
                                onSave({...Object.fromEntries(Object.entries(values).map(item => item[1] ? [item[0], Number(item[1])] : [item[0], 0])), venue_name: venueName}, () => {
                                    setOpen(false)
                                    onMailSend({...Object.fromEntries(Object.entries(values).map(item => item[1] ? [item[0], Number(item[1])] : [item[0], 0])), venue_name: venueName})
                                })
                            }
                            else{
                                alert("Please enter Venue Name to continue.")
                            }
                        ;}} isLoading={loading === 1} loadingText="Saving"  colorScheme="blackAlpha" bg="black" w="100%">
                            Send
                        </Button>
                        <Button onClick={() => {
                            if(venueName){
                                setLoading(2)
                                onSave({...Object.fromEntries(Object.entries(values).map(item => item[1] ? [item[0], Number(item[1])] : [item[0], 0])), venue_name: venueName}, () => {
                                    setOpen(false)
                                })
                            }
                            else{
                                alert("Please enter Venue Name to continue.")
                            }
                        ;}} isLoading={loading === 2} loadingText="Saving" variant={"outline"}  colorScheme="blackAlpha" borderColor="black" color="black" w="100%">
                            Save as Draft
                        </Button>
                    </VStack>}
               </Box>
                <Box h={40}/>
            </Box>
        </Collapse>

        <Collapse in={view === 2}>
            <Center flexDirection={"column"} px={3} h="calc(100vh - 3.5rem)" flex={1} my="auto">
                    <Box w="100%">
                        <Input size="lg" value={venueName} onChange={(e) => {setName(e.target.value)}} placeholder='Enter Venue Name'/>
                    </Box>
                    <ButtonGroup w="100%" justifyContent={"end"} py={4}>
                        {/* <Button onClick={() => {setView(2)}}>
                            <BiX/>
                        </Button> */}
                        <Button gap={2} isDisabled={venueName === ''} onClick={() => {setView(1)}} colorScheme="primary">
                            <MdCheck/>
                            Save
                        </Button>
                    </ButtonGroup>
            </Center>
        </Collapse>

    </Box>
    
            
  )
})

export default Form;
