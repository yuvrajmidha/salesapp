import {
  Heading,
  Image,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Badge, Box, Button, Center, Collapse, Flex, HStack, IconButton,
  Thead,
  Tr,
  useColorModeValue as mode,
  VStack,
  ButtonGroup,
  Divider,
} from '@chakra-ui/react'
import * as React from 'react'
import { } from '@chakra-ui/react'
import { BiFile, BiPlus } from 'react-icons/bi'
import mustache from "mustache";
import { ReactSortable } from 'react-sortablejs';
import HTMLCard from '../../../components/HTMLCard';
import {TbSearchOff} from 'react-icons/tb'

const getColumns = (fields:any) => fields.filter((field: any) => field?.view?.hidden !== true).map((field:any) => {
  return {
      Header: field?.view?.label,
      accessor: field?.name,
      type: field.type,
      class: field.view?.class,
      width: field?.view?.width ?? 12,
      Cell: function RenderCell(value: any, index:number, row:any){

          // const [expand, setExpand] = React.useState(false)
          const expand = false

          const data = {...row};

          if(field?.view?.render && field.type !== 'ref') return <HTMLCard w="100%" key={index} render={field?.view?.render} values={{...row, _value: value}}></HTMLCard>

          
          if(['number', 'email', 'text', 'week', 'time', 'month'].includes(field.type)) return <Text as="span" fontSize={"15px"} key={index}>
              <span dangerouslySetInnerHTML={{__html:field?.view?.prefix}}></span>{value}<span dangerouslySetInnerHTML={{__html:field?.view?.suffix}}></span>
          </Text>
          else if(['date', 'datetime-local'].includes(field.type)) {
            // console.log(value)
            const date = new Date(value)
            return <Box key={index}>
               <><span dangerouslySetInnerHTML={{__html:field?.view?.prefix}}></span>{date.toDateString()}<span dangerouslySetInnerHTML={{__html:field?.view?.suffix}}></span></>
            </Box>
          }
          else if(['textarea', 'html'].includes(field.type)) {
              // return <></>
              return <Box key={index} >
                      <Box fontSize={"xs"} overflow={"hidden"} height={expand ? "auto" : "40px"} maxW={"2xs"} noOfLines={expand ? 0 : 2} textOverflow={"ellipsis"} whiteSpace={expand ? "break-spaces" : "pre-wrap"}>
                          {value} &nbsp; 
                      </Box>
                      {/* <Button as="a" cursor={"pointer"} onClick={() => {}} aria-label='expand' variant={"link"} height="auto" size="xs">
                              Read {!expand ? "More" : "Less"} 
                      </Button> */}
                  </Box>
          }
          else if(['select', 'radio'].includes(field.type)) {
              return <Flex key={index} direction="column" gap={1}>
                  {field.multiple ? <>
                      {value.map((v:string, index: number) => index < 2 && <div key={index} dangerouslySetInnerHTML={{__html: field?.rules?.options?.filter((option:any) => option.value === v)[0]?.render ?? v}}/>)}
                      <Box><Button size="xs" variant={"link"}>+ 2 More</Button></Box>
                  </> : 
                  <div dangerouslySetInnerHTML={{__html: field?.rules?.options?.filter((option:any) => option.value === value)[0]?.render ?? value}}/>}
              </Flex>
          }
          else if(['file'].includes(field.type)) {
              return <Flex key={index} align={"center"} direction="column">
                  {field.multiple ? <React.Fragment> <Button size="xs" variant={"outline"} leftIcon={<BiFile/>}>
                      {value[0]}
                  </Button>
                  <Button size="xs" variant={"outline"}>
                      + 1
                  </Button>
                  </React.Fragment> : <Button size="xs" variant={"outline"} leftIcon={<BiFile/>}>
                      {value}
                  </Button>}
              </Flex>
          }
          else if(['image'].includes(field.type)) {
              return <Flex key={index} align={"center"}>
                  {field.multiple ? <React.Fragment>
                      {value?.map((src:string, index: number) =>  (index < 2) && <Image key={index} src={src} minW="24px" boxSize="24px" mr={1} objectFit={"cover"} rounded="base"/>)}
                      <Center fontSize={"12px"} minW="24px" fontWeight={"900"} boxSize={"24px"}>
                          + 1
                      </Center>
                  </React.Fragment> : <Image src={value} boxSize="64px" objectFit={"cover"} rounded="base"/>}
              </Flex>
          }
          else if(['ref'].includes(field.type)) {
              return <Flex key={index} w="auto" alignItems={"center"}>
                 <Box 
                      dangerouslySetInnerHTML={{__html: mustache.render(field?.view?.render, value?.length > 0 ? value[0] : value)}} 
                  />
                  {field.multiple && value.length > 1 && <Button size="xs" variant={"outline"} disabled={true}>+{value.length - 1}</Button>}
              </Flex>
          }
          else return <Box key={index}>
          
          </Box>
      }
  }
})

const DividerExtended = () => {
  const divider:any = React.useRef()

  React.useEffect(() => {
    const dim = divider.current.getBoundingClientRect()
    divider.current.style.minWidth = `${dim.width + (window.innerWidth - dim.right)}px`
  }, [window.innerWidth])

  return <>
    <Divider display={{base: "none", "block": "block"}} w="100%" className='ignoreDrag' ref={divider}/>
    <Divider display={{base: "block", "none": "none"}} w="100%" className='ignoreDrag'/>
  </>
}

export const TableContent = ({
    data=[],
    id='', 
    render="",
    fields=[],
    footer='', 
    header='', 
    view="list", 
    wrapper_class='', 
    borders=false,
    onOrderChange=() => {}, 
  }:any) => {
  
  const [list, setList] = React.useState<any[]>([])

  const [sort, setSort] = React.useState(false)

  React.useEffect(() => {
    setList(data.map((i:any, index:number) => {return {...i, id: index}}))
  }, [data])


  React.useEffect(() => {


  }, [data])

  function dragAndDropArrayElement(array:any[], p:number, q:number) {
    // Remove the element at position p from the array
    const element = array.splice(p, 1)[0];
    // Insert the element at position q in the array
    array.splice(q, 0, element);
    return array;
  }

  const handleDrag = (e:any) => {

    var newArr = dragAndDropArrayElement(list, e.oldIndex, e.newIndex)
    onOrderChange(newArr.map(item => item._id))
    setSort(true)

  }


  const ListView = () =>  <Flex flex={1} width={"100%"}>
      <Box w="100%">
        <ReactSortable onEnd={handleDrag} animation={150} ghostClass="opacity-0" className='flex flex-wrap w-full' dragClass='' filter=".ignoreDrag" handle='.cbx-drag' list={list} setList={(arr) => {
          if(sort){
            setList(arr)
            setSort(false)
          }
        }}>
            {/* <Flex flexWrap={"wrap"} w="100%"> */}
              {list.map((row:any, index:number) => render ? (typeof render === "string" ? <HTMLCard key={index} values={{...row, _index: index}} className={wrapper_class} render={render}/> : render(row, index) ) : <Box key={index} w="100%" onClick={(e:any) => {e.target.classList.toggle('cbx-selected')}} className={'group ' + (wrapper_class ? mustache.render(wrapper_class ?? '', row) : ' flex px-2 justify-between border-b bg-white first:border-t w-full items-center')}>
                  {getColumns(fields).map((column:any, index:number) => {
                    const cell = row[column.accessor as keyof typeof row]
                    const element = column.Cell?.(cell, index, row) ?? cell
                    return (
                        <Box overflow="hidden" textOverflow={"ellipsis"} className={(column?.class ?? 'py-0 px-1')} whiteSpace="nowrap"  key={index}>
                          {element}
                        </Box>
                      )
                    })}
                </Box>)}
            {/* </Flex> */}
        </ReactSortable>
      </Box>
  </Flex>

const TableView = () => <Box w={["100vw", "100vw", "100%"]} borderRightWidth={borders ? 1 : 0} borderLeftWidth={borders ? 1 : 0} overflowX={"auto"}>
  <Divider/>
  <Table>
      <Thead>
        <Tr>
          {fields.map((field:any, index:number) => !field?.view?.hidden && <Th px={[3,3,3,3,6]} py={2} color="gray.400" textTransform={"uppercase"} fontSize="xs" fontWeight={"800"} whiteSpace="nowrap"  key={index}>
              <span>{field?.view?.label}</span>
            </Th>)}
        </Tr>
      </Thead>
      <Tbody>
        {list.map((row:any, index:number) => <Tr className='group' key={index}>
              {getColumns(fields).map((column:any, index:number) => {
                const cell = row[column.accessor as keyof typeof row]
                const element = column.Cell?.(cell, index, row) ?? cell
                return (
                  <Td px={[3,3,3,3,6]} className={(column?.class ?? '')} whiteSpace="nowrap"  key={index}>
                    {element}
                  </Td>
                )
              })}
          </Tr>
        )}
      </Tbody>
  </Table>
</Box>

  return <>
  
  {header && <HTMLCard w="100%" py={2} render={header} values={{data, id}}/>}

  {list.length ? <>

    {/* Table View */}
    {(view === 'table' || view === 'TABLE') && <TableView/>}
              
    {/* List View */}
    {(view === 'list' || view === 'LIST') && <ListView/>}

    {footer && <HTMLCard w="100%" py={2} render={footer} values={{data, id}}/>}

  </> : (!footer ? <Box display={!data.length ? "flex" : "none"} w="100%" p={[3,3,3,3,4]}>
  {/* If List is Empty */}
    <VStack py={20} rounded="xl" textAlign={"center"} w="100%" color="gray.500" bg="gray.100">
          <Box boxSize="48px">
            <TbSearchOff size="48px"/>
          </Box>
          <Heading size="md">No Data Found.</Heading>
          <Text>Please create one to start or search something else.</Text>
    </VStack>
  </Box> : <HTMLCard w="100%" py={2} render={footer} values={{data, id}}/>)}</>
}
