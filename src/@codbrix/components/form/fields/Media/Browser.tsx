import React, { useState, useEffect } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Box,
    Button,
    Image,
    Flex,
    Heading,
    Divider,
    ButtonGroup,
    VStack,
    Text,
    HStack,
    Center,
    StackProps,
    Input,
    Grid,
    Checkbox,
  } from '@chakra-ui/react'
import { BiCheck, BiCloudUpload } from 'react-icons/bi'


  const getImage = (src:string) => {

    if(!src) return 

    const parts = src.split('/')
    const filename = parts[parts.length - 1]
    const _ext = filename.split('.');
    const ext = _ext[_ext.length - 1]

    if(["png", "jpeg", "webp", "avif", "jpg", "gif"].includes(ext))
    return {
        src: "https://cbx-public.s3.ap-south-1.amazonaws.com/" + src,
        name: filename,
        extension: ext
    }

    else return {
        src: "https://dummyimage.com/800x800/e8e8e8/bfbfbf.png&text=" + filename,
        name: filename,
        extension: ext
    }

  }

  const toBase64 = (file:any) => new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(`${reader.result}`);
    reader.onerror = reject;
});

export default function MediaBrowser({children, max=-1, mediaList, value=[], onDelete=() => {},onLoad=() => {}, onUpload=(file:any, onClose:any) => {}, onSave=()=>{}}:any) {
  
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [selected, setSelected] = useState<any>({})

    const [choosen, setChoosen] = useState<any>(Array.isArray(value) ? value : [])

    const [active, setTab] = useState<any>(0)

    const [uploaded, setImage] = useState('')
    const [uploadedName, setName] = useState('')
    const [uploadedSrc, setSrc] = useState('')
    const [uploading, setUploading] = useState(false)

    useEffect(() => {
        setUploading(false)
        setImage('')
        if(isOpen){
            onLoad()
            setSelected([])
            setChoosen([])
        }
    }, [isOpen])


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
            setName(_file.name)
            setImage(_image)

            if(_file.type.includes("image")){
                setSrc(_image)
            }else{
                setSrc("https://dummyimage.com/400x80/edf2f6/000.png&text=" + _file.name)
            }
        }}
    />

    const PlaceHolder = ({...props}:StackProps) => <Center
        textAlign={"center"}
        w="100%"
        flex={1}
        className='ignoreDrag'
        overflow={"hidden"}
        fontWeight="bold"
        _hover={{ bg:"gray.50"}}
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
            <Box>{"Upload Your Files Here"}</Box>
          </Box>
      </Center>

return (
    <>
      <Box onClick={onOpen}>{children}</Box>

      <Modal size="6xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader py={2} px={3}>
            <ButtonGroup variant={"ghost"} size="sm">
                {["Media", "Upload"].map((tab, index) => <Button key={index} onClick={() => {setTab(index)}} variant={active === index ? "solid" : "ghost"} colorScheme="primary">{tab}</Button>)}
            </ButtonGroup>
          </ModalHeader>
          {/* <Divider/> */}
          <ModalBody px={3}>
                {active === 0 && <>
                    {mediaList?.length > 0 ? <Grid templateColumns={selected?.Key ? "1fr 24rem" : "1fr"}>
                     <Flex wrap={"wrap"} gap={3} alignContent={"start"}>
                        {mediaList?.map((file:any, index:number) => <Box key={index} onClick={() => {
                            const src = getImage(file.Key)?.src
                            if(choosen.includes(src)){
                                setChoosen(choosen.filter((img:any) => img !== src))
                            }
                            else{
                                if(max === 1) setChoosen([src])
                                if(choosen.length < max || max === -1){
                                    setChoosen([...choosen, src])
                                }
                            }
                        }} pos="relative" className='group'>
                            <Box cursor={"pointer"} boxSize={"16px"} pos={"absolute"} className={"group-hover:opacity-100 rounded-full text-white ring-2 " + (choosen.includes(getImage(file.Key)?.src) ? ' ring-blue-500 bg-blue-500 opacity-100' : ' ring-gray-500 opacity-0')} right={2} top={2}>
                                {choosen.includes(getImage(file.Key)?.src) && <BiCheck/>}
                            </Box>
                            <Image onClick={() => {setSelected(file);}} objectFit="cover" _hover={{outline: "2px solid #eee"}} key={index} src={getImage(file.Key)?.src} h="128px" rounded={"lg"}/>
                        </Box>)}
                    </Flex>
                   {selected?.Key && <VStack h="100%" flex={1} w="100%" p={2} bg="gray.100" rounded={"lg"}>
                        <Center bg="white" rounded={"lg"} w="23rem" minH="23rem">
                            <Image src={getImage(selected?.Key)?.src}/>
                        </Center>
                        <Box w="100%">
                            <Text overflow={"hidden"} w="100%" height={"24px"} whiteSpace="nowrap" textOverflow={"ellipsis"} fontWeight={"bold"} px={2} fontSize="14px">{getImage(selected?.Key)?.name}</Text>
                            <HStack w="100%" justify={"space-between"}>
                                <Text px={2} fontSize="14px">{selected.LastModified}</Text>
                                <Text px={2} fontSize="14px">{selected.Size}</Text>
                            </HStack>
                        </Box>
                        <Box h={8}></Box>
                        <Button onClick={() => {
                            onDelete(selected?.Key)
                            setSelected({})
                            setChoosen(choosen.filter((img:any) => img !== getImage(selected?.Key)?.src))
                        }} variant={"outline"} colorScheme="red" w="100%" size="sm">Delete Permanently</Button>
                    </VStack>}
                </Grid>  : <Center w="100%" minH="10rem">
                    <Heading color={"gray.200"}>No Media Found</Heading>    
                </Center>}
                </>}
                {active === 1 && <Flex justify={"center"} align={uploaded ? "center" :""} bg={uploaded ? "gray.100" : ""} pos={"relative"} rounded="lg" minH="20rem">
                    {uploaded ? <Image src={uploadedSrc} maxW="100%" maxH="40rem" objectFit={"contain"} my="auto"/> : <PlaceHolder/>}
                    <Uploader/>
                </Flex>}
          </ModalBody>
          {/* <Divider/> */}
          <ModalFooter py={2} px={3}>
                <Button variant={"ghost"} mr={3} onClick={onClose}>
                  Close
                </Button>
                {active === 0 && <Button onClick={() => {onSave(choosen); onClose()}} isDisabled={choosen.length === 0} colorScheme='primary'>Add {choosen?.length > 0 ? `(${choosen.length})` : ''}</Button>}
                {active === 1 && <Button isLoading={uploading} loadingText={"Uploading..."} isDisabled={uploaded === ''} onClick={()=>{
                    onUpload({
                        name: uploadedName,
                        content: uploaded
                    }, onClose)
                    setUploading(true)
                }} colorScheme='primary'>Upload</Button>}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
