import React, { useContext, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { CBXContext } from '../components/provider'
import useSearching from './useSearching'

export default function useRoute(route:string, id?:string){

  const response = useSelector((state:any) => state.cache.value[route])

  const {callOperation, routes, callPage} = useContext(CBXContext)

  const _id = useParams()

  const {setSearching} = useSearching()

  const location = useLocation()

  useEffect(() => {
    if(routes[route]?.render === 'form' && routes[route]?.route_type !== 'OPERATION'){
      callOperation(route, id ?? _id)
    }  
  }, [])

  useEffect(() => {
    if(routes[route]?.render === 'form' && routes[route]?.route_type === 'OPERATION'){
      callOperation(route, id ?? _id)
    }  
    if(routes[route]?.render === 'list'){
      if(routes[route]?.route_type === 'OPERATION'){
        callOperation(route, id ?? _id)
      }
      else{
        setSearching(true)
        callPage(route)
      }
    }
  }, [location])

  return {...response, id: id ?? _id};

}
