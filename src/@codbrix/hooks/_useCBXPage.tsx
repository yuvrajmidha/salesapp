import React, { useContext } from 'react'
import { CBXContext } from '../components/provider'

export default function useCBXPage() {
  
    const {project, routes, user} = useContext(CBXContext)

    const getRoutes = (page:string, route_type:string) => {
        const filtered_routes = Object.entries(routes)
        .filter((route:any) => route[1].page === page && route[1].route_type === route_type && route[1].user.includes(user?.role))
        .sort((a:any, b:any) => b[1].org?.order - a[1].org?.order)
        .map((route:any[]) => {return {
            ...route[1],
            name: route[0]
        }})

        return filtered_routes

    }

    const pages = project.pages.filter((page:any) => getRoutes(page.name, "VIEW").length > 0)
    
    return {pages, getRoutes}

}
