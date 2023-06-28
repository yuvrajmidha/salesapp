import { Box, Button, ButtonGroup, Flex, Text, useColorModeValue as mode } from '@chakra-ui/react'
import * as React from 'react'

export const LoadMore = ({onLoad=() => {},collection='',list=[], route='', total=0}:any) => {

  const [page, setPage] = React.useState<number>(1)

  return (
   <>
    <Box pos="sticky" bg={mode("white", "black")} bottom={0} left={0} w="100%" p={4}>
      {list?.length > 0 && <Flex align="center" justify="space-between">
        <Text fontSize="sm">
          Showing {list?.length} of {total} {collection.replace(/_/g, ' ')}
        </Text>
        <ButtonGroup variant="outline" size="sm">
          <Button isDisabled={list?.length === total} onClick={() => {
              onLoad(page + 1)
              setPage(page + 1)            
          }} as="a" rel="next">
            Load More
          </Button>
        </ButtonGroup>
      </Flex>}
    </Box>
   </>
  )
}
