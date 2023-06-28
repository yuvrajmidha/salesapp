import { Box, Button, Flex, HStack, Image, Input, useColorModeValue as mode, Spinner, Text, useBoolean, VStack, SimpleGrid, StackProps, Center, chakra, IconButton } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { BiCloudUpload, BiSearch } from 'react-icons/bi'
import {DndContext} from '@dnd-kit/core';
import { ReactSortable } from 'react-sortablejs';
import { MdClose } from 'react-icons/md'

const toBase64 = (file:any) => new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(`${reader.result}`);
    reader.onerror = reject;
});

export default function ImageField({route, image, setImage, param, field, setFieldValue, values, touched}:any) {

    const [uploading, setUploading] = useBoolean()

    const color = mode("gray.50", "gray.900")

    const Uploader = () => <Input
        size="lg"
        opacity={0}
        pos="absolute"
        h="100%"
        w="100%"
        cursor={"pointer"}
        top={0}
        left={0}
        type="file"
        onChange={async (e: any) => {
            const _file:any = e.target.files[0]
            const _image:string = await toBase64(_file)
            setImage((field.multiple && Array.isArray(image)) ? [...image, _image] : _image)
        }}
    />

    const PlaceHolder = ({...props}:StackProps) => <Center
        textAlign={"center"}
        w="100%"
        className='ignoreDrag'
        overflow={"hidden"}
        fontWeight="bold"
        _hover={{ bg: mode("gray.50", "gray.900") }}
        rounded="xl"
        color="gray.500"
        borderWidth={2}
        py={12}
        borderStyle="dashed"
        minH={["48px", "56px"]}
        // spacing={4}
        pos="relative"
        {...props}
      >
          <Box>
            <Flex justify={"center"} w="100%" opacity={0.6}>
              <BiCloudUpload size="24px" />
            </Flex>
            <Box>{field.placeholder || "Upload"}</Box>
          </Box>
        <Uploader/>
      </Center>

    useEffect(() => {
      setImage()
    }, [])

    useEffect(() => {
      setFieldValue(field.name, image)
    }, [image])
  
    return <DndContext>
       <Box maxW="100%">
    {image ? (
      <VStack mb={4} w="100%">
       
          <Box w="100%">
          {field.multiple ? <>
            
            <ReactSortable
                list={Array.isArray(image) ? image : []}
                setList={(newlist:any) => setImage(newlist)}
                ghostClass="dropArea"
                handle=".dragHandle"
                filter=".ignoreDrag"
                preventOnFilter={true}
                style={{
                  display: "grid",
                  gridGap: "0.5rem",
                  gridTemplateColumns: "repeat(" + (image.length > 0 ? 4 : 1) + ", 1fr)"

                }}
                // onEnd={({ oldIndex, newIndex }) => onDragDropEnds(oldIndex, newIndex)}
              >
                {/* <SimpleGrid columns={5}> */}
                  {image.map((img:any, index: number) => (
                    <Box key={index} position={"relative"} className='dragHandle'>
                      <Image  bg={color} src={img}></Image>
                      <IconButton 
                          pos="absolute" 
                          top={1} 
                          right={1} 
                          variant="ghost" 
                          aria-label='delete'
                          onClick={() => {setImage(image.filter((img:any, i:number) => i !== index))}}
                        ><MdClose/></IconButton>
                    </Box>
                  ))}
                  <PlaceHolder/>
                {/* </SimpleGrid> */}
              </ReactSortable>
              
          </> : <Image
            w="100%"
            mt={4}
            rounded={"lg"}
            opacity={uploading ? "50%" : "100%"}
            src={`${image}`}
            objectFit="cover"
          />}
          {(!uploading && !field.multiple) && <SimpleGrid spacing={2} py={2} columns={[2]}>
            <Button pos={"relative"}>
                Change
                <Uploader/>
            </Button>
            <Button onClick={() => {
                setImage('')
                setFieldValue(field.name, '')
            }} colorScheme={"red"}>
                Delete
            </Button>
          </SimpleGrid>}
          </Box>
      </VStack>
    ) : (
      <HStack
        w="100%"
        _hover={{ bg: mode("gray.50", "gray.900") }}
        rounded="xl"
        spacing={4}
        pos="relative"
      >
        <VStack
          textAlign={"center"}
          w="100%"
          fontWeight="bold"
          color="gray.500"
          borderWidth={2}
          borderStyle="dashed"
          minH={["48px", "56px"]}
          p={12}
          rounded={"xl"}
        >
          <Box opacity={0.6}>
            <BiCloudUpload size="24px" />
          </Box>
          <Box>{field.placeholder || "Upload"}</Box>
        </VStack>
        <Uploader/>
      </HStack>
    )}
    {uploading && <Flex gap={2}><Spinner boxSize={"24px"}/> <b>Uplaoding...</b></Flex>}
    
  </Box>
    </DndContext>
   
}


    
