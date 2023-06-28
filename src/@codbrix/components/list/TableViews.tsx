import { Button, ButtonGroup } from '@chakra-ui/button'
import { Box, Flex } from '@chakra-ui/layout'
import React from 'react'

export default function TableViews() {
  return (
    <Flex w="137px" py={3} px={4}>
        <ButtonGroup variant={"outline"} isAttached justifyContent={"end"} flex={1} size="xs">
            <Button variant={"solid"} colorScheme="primary" px={2}><i className="ti ti-table text-lg"></i></Button>
            <Button px={2}><i className="ti ti-layout-list text-lg"></i></Button>
            <Button px={2}><i className="ti ti-layout-kanban text-lg"></i></Button>
        </ButtonGroup>
    </Flex>
  )
}
