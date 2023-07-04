import React, { useContext, useEffect, useState } from 'react'
import ShowError from '../@codbrix/components/feedback/Error';
import Loading from '../@codbrix/components/feedback/Loading';
import useRoute from '../@codbrix/hooks/useRoute';
import { CBForm } from '../@codbrix/components/form';
import { Response } from '../@codbrix/types/response';
import List from '../@codbrix/components/list/List';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import Stats from './Stats';
import { FieldProps } from '../@codbrix/types/field';
import { CBXContext } from '../@codbrix/components/provider';

const Form = ({id, route, title, ...data}:any) => {
    
    const [values, setValues] = useState<any>({})

    return <>
       
        {/* {route.gpcalculator &&  <Box py={6} px={4}>
            <Heading size="lg">GP Calculator</Heading>
            <Text fontSize={"md"} mt={1}>All values are excluding GST</Text>
        </Box>} */}
        <CBForm {...data} id={id} route={route} title={route.title ? `<b>${route.title}</b>` : ''} onChange={setValues}/>
        {route.gpcalculator && <>
            <Box display={["block", "none"]} minH="120px"></Box>
            <Stats values={values}/>
        </>}
    </>

}

export default function Route({_id='', ...route}:any) {

    const response = useRoute(route.name, _id)   

    const {routes} = useContext(CBXContext)

    const {isLoading=true, id='', data, status, type="Error", render, message}:Response = response

    return isLoading ? <Loading/> : <Flex direction={"column"} w="100%" flex={1}>
        {response?.type === "Error" ? <ShowError message={message} code={response?.status.code}/> : <>
            {routes[route.name]?.render === "form" && <Form {...data} id={id} route={{...routes[route.name], name: route.name}} title={routes[route.name].title ? `<b>${routes[route.name].title}</b>` : ''} {...route}/>}
            {routes[route.name]?.render === "list" && <List {...data} id={id} route={{...routes[route.name], name: route.name}} {...route}/>}
        </>}
    </Flex>

}


