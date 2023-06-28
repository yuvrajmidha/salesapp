import { useToast } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { CBXContext } from '../components/provider'

export default function useCBXOperation(collection:string) {
  
    const {routes,user} = useContext(CBXContext)

    const getTabs = () => {
        
        var tabs:any[] = []

        Object.entries(routes).filter((route:any) => route[1]?.route_type === "OPERATION" && route[1]?.user?.includes(user?.role) && route[1]?.page === collection && route[1]?.org?.location < 3).map((route:any) => {
            const tab:any = tabs.filter(tab => tab?.title === route[1]?.org?.tab)
            if(tab.length === 1){
                tab[0]?.routes.push({...route[1], name: route[0]})
            }
            else{
                tabs.push({
                    name: route[1]?.org?.tab?.toLowerCase().replace(/ /g, '_'),
                    title: route[1]?.org?.tab,
                    routes: [
                        {...route[1], name: route[0]}
                    ]
                })
            }
        })

        tabs = tabs.map(tab => {
                tab.routes = tab?.routes.sort((a:any, b:any) => a?.org?.order - b?.org?.order).sort((a:any, b:any) => a.org?.location - b?.org?.location)
                return tab
        }).filter(tab => tab.name)

        return tabs

    }

    return {
        prompts: Object.entries(routes).filter((route:any) => route[1].route_type === "PROMPT" && route[1].page === collection).map((route:any) => {return {...route[1], name: route[0]}}),
        tabs: getTabs()
    }

}
