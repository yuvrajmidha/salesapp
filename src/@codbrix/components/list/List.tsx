import { Box, Flex } from '@chakra-ui/react'
import * as React from 'react'
import { LoadMore } from './LoadMore'
import { TableContent } from './Content'
import { TablePagination } from './TablePagination'
import cbx from '../../cbx'
import { ListProps } from '../../types/list'

const List = (props: ListProps) => {

    const {
      collection='',
      filters=[],
      fields=[],
      data=[],
      total=0,
      limit=0,
      footer='',
      header='',
      wrapper_class='',
      view="list",
      render='',
      route={},
      onSearch= () => {

      },
      onSort= () => {

      },
      onFilter= () => {

      },
      onLoad= (page: number) => {

        cbx.submit(route.name, {_page: page}, {}, {method: 'get'}).then(result => {
          const newArr = [...list, ...result?.data?.data]
          setList(newArr.filter((item, index) => newArr.findIndex(el => el._id === item._id) === index))
        })

      },
      pagination= true,
      onPageChange= () => {

      },
      onDragEnd= (ids:string[]) => {
          if(list.length > 1) cbx.submit(route.name,{}, {ids}, {method: "patch"})
      },
      onAdd= () => {

      },
      onExport= () => {

      },
      onEvent= () => {

      },

  } = props

  const [list, setList] = React.useState<any[]>([])

  React.useEffect(() => {
      setList(data)
  }, [data])

  return <Flex wrap={"wrap"} maxWidth={route?.route_type === "OPERATION" ? "3xl" : "100%"} mx="auto" w="100%">
      {/* <TableFilters data={data}/> */}
      <TableContent data={list} render={render} view={view} footer={footer} header={header} id={props.id} borders={route?.route_type === "OPERATION"} route={route} wrapper_class={wrapper_class} onOrderChange={onDragEnd} fields={fields}/>
      {(pagination && data.length < total) && <>
        {view === "list" ? <LoadMore wrapper_class={wrapper_class} view={view} total={total} list={list} route={route.name} collection={collection} onLoad={onLoad}/> :
        <TablePagination data={list} route={route?.name} collection={collection} limit={limit} total={total}/>}
      </>}
  </Flex>
  
}

export default List;
