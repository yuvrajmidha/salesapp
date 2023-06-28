import { useToast } from '@chakra-ui/react'
import React, { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CBXContext } from '../components/provider'

export default function useCBXNavigation() {
  
    const {project, routes, user} = useContext(CBXContext)

    const [history, setHistory] = useState<any[]>([]);

    const navigator = useNavigate()

    const location = useLocation()

    const navigate = (url: any) => {
        navigator(url)
        setHistory([...history, url])
    }

    const redirect = (url: any) => {
        
    }

    const getRoutes = (page:any, route_type:string) => {
        const filtered_routes = Object.entries(routes)
        .filter((route:any) => route[1].page === page && route[1].route_type === route_type && route[1].user.includes(user?.role))
        .sort((a:any, b:any) => a[1]?.org?.order - b[1]?.org?.order)
        .map((route:any[]) => {return {
            ...route[1],
            name: route[0]
        }})

        return filtered_routes

    }

    const getURLWithParams = (params:any) => {
        var query = Object.fromEntries(window.location.search.replace('?', '').split('&').map(q => [q.split('=')[0], q.split('=')[1]]))
        query = {
            ...query,
            ...params
        }
        return (window.location.pathname + '?' + Object.entries(query).map(item => item.join('=')).join('&'))   
    }

    const pages = project.pages.map((page:any) => {return {...page, views: getRoutes(page.name, "VIEW").length}})
    
    return {pages, getRoutes, getURLWithParams, navigate, redirect}

}
