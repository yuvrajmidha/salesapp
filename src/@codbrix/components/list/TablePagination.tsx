import { Box, Button, ButtonGroup, Flex, Text, useColorModeValue as mode } from '@chakra-ui/react'
import * as React from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

export const TablePagination = ({limit=1,collection='',route='', data=[], total=''}:any) => {

  const [params, setParams] = useSearchParams()
  const query = useParams()

  const [showNext, setNext] = React.useState<boolean>(true)
  const [showPrev, setPrev] = React.useState<boolean>(true)

  React.useEffect(() => {

    const total_pages =  Math.floor((data.total - 1)/limit) + 1
    const page = Number(params.get('_page')) || 1

    // if(page !== 1){
      if(total_pages > page) setNext(true)
      else if(total_pages < page){
        if(query.route === route) setParams({...Object.fromEntries(params.entries()), _page: `${total_pages || 1}`})
      }
      else if(page === 1) setPrev(false)
      else if(page < 1 && query.route === route) setParams({...Object.fromEntries(params.entries()), _page: `${1}`})

      if(total_pages === page) setNext(false)
    // }

    

  }, [params, query, data.total])

  const navigatePage = (offset:number) => {
    setParams({...Object.fromEntries(params.entries()), _page: `${( Number(params.get('_page')) || 1) + offset}`})
  }

  return (
    <Box pos="sticky" bottom={0} left={0} w="100%" p={4}>
      <Flex align="center" justify="space-between">
        <Text fontSize="sm">
          Showing {data?.length} of {total} {collection.replace(/_/g, ' ')}
        </Text>
        <ButtonGroup variant="outline" size="sm">
          <Button isDisabled={ Number(params.get('_page')) < 2} onClick={() => {
              navigatePage(-1)
          }} as="a" rel="prev">
            Previous
          </Button>
          <Button isDisabled={data.length === 0} onClick={() => {
            // navigate(`${collection_name}`)
            navigatePage(1)
          }} as="a" rel="next">
            Next
          </Button>
        </ButtonGroup>
      </Flex>
    </Box>
  )
}
