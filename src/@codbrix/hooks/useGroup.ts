import React, { useContext } from 'react'
import { CBXContext } from '../components/provider'

export default function useGroup(name: string) {
  
    const {routes, user} = useContext(CBXContext)

    const getRoutes = (page:string, route_type:string) => {
        const filtered_routes = Object.entries(routes)
        .filter((route:any) => route[1].page === page && route[1].route_type === route_type && route[1].user.includes(user?.role))
        .sort((a:any, b:any) => a[1].order - b[1].order)
        .map((route:any[]) => {return {
            ...route[1],
            name: route[0]
        }})

        return filtered_routes

    }

    // const pages = project.pages.filter((page:any) => getRoutes(page.name, "VIEW").length > 0)
    
    return {
      views: getRoutes(name, "VIEW"),
      tabs: getRoutes(name, "OPERATION").filter(route => route?.org?.location === 0 ||  typeof route?.org?.location === "undefined"),
      sidebar: getRoutes(name, "OPERATION").filter(route => route?.org?.location === 1),
      actions: getRoutes(name, "OPERATION").filter(route => route?.org?.location === 2),
      drawer: getRoutes(name, "OPERATION").filter(route => route?.org?.location === 3),
      creators: getRoutes(name, "CREATE")
    }

}
