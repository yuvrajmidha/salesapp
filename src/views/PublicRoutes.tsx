import React, { useContext , useState, useEffect, ComponentType} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CBXContext } from '../@codbrix/components/provider'
import { Center, Flex} from '@chakra-ui/layout'
import DynamicImport from '../components/Route'
import ShowError from '../@codbrix/components/feedback/Error'


// export default CBXComponent;

export default function PublicRoutes() {

    const {routes, project, isLoggedIn} = useContext(CBXContext)

    const {page, route} = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        if(isLoggedIn){
        //   navigate('/cms' + project.homepage)
        }
      }, [isLoggedIn])

    return (
    <Flex h="100vh" w="100%">
        <Center w="100%" maxW="xl" mx="auto" px={[3, 3, 6, 6, 12]}>
            {routes[page + '/' + route] ? <>
                {DynamicImport({...routes[page + '/' + route], name: page + '/' + route})}
            </> : <><ShowError code={404}/></>}
        </Center>
    </Flex>
    )
}
