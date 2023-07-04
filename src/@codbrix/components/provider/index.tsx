import React, { createRef, useRef } from "react";
import { Center } from "@chakra-ui/layout"
import { ToastProps, useToast } from "@chakra-ui/react"
import { createContext, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { Outlet, useLocation, useParams, useNavigate } from "react-router"
import { loadCache, setCache } from "../../redux/cache"
import { CBXConfigProps, CBXContextType } from "../../types/config"
import cbx from "../../cbx";
import { error } from "console";

export const CBXContext = createContext<CBXContextType>({})

export const Codbrix = ({base_url}: CBXConfigProps) => {

    const dispatch = useDispatch()

    const action = createRef()

    const quick_edit = createRef()

    //User and Other Global Data
    const [user, setUser]:any = useState({})
    const [routes, setRoutes]:any = useState({})
    const [project, setProject]:any = useState({})

    const [searching, setSearching] = React.useState<boolean>(false)

    const [isLoggedIn, setLoggedIn]:any = useState(false)
    const [loading, setLoading]:any = useState<any>("Loading routes...")
    const {route, id, page}:any = useParams()

    const [noOfRequests, setCount]:any = useState(0)

    const location = useLocation()

    const navigate = useNavigate()

    const _toast = useToast({
        duration: 5000,
        isClosable: true,
        variant: "subtle",
        position: 'bottom',
        containerStyle: {
            marginBottom: "84px"
        }
    })

    const toast = (props:ToastProps) => {
        _toast.closeAll()
        _toast(props)
    }

    useEffect(() => {
        cbx.load(base_url, (data:any) => {
                
            let _cache:any = {}
            Object.entries(data.routes).map((str:any) => {
                _cache[str[0]] = {
                    isLoading: true,
                    data: str[1]?.data,
                    message: "Loading...",
                    status: {code: 100, text: "Loading"},
                    user,
                    render: str[1]?.render
                }
                return 1
            })
            dispatch(loadCache(_cache))
            
            document.title = data?.project?.title;

            setProject(data.project)
            setRoutes(data.routes)
            setUser(data.user)
            setLoggedIn(data.isLoggedIn)
            

            if(data.isLoggedIn){
                try{

                    const home:any  = Object.entries(data?.routes).filter(([key, route]:any) => {
                        if(route.route_type === "VIEW" && route?.user.includes(data?.user?.role)){
                            return true
                        }
                        else{
                            return false
                        }
                    })[0][1]
                    
                    if(home.page){
                        navigate(localStorage.getItem('cbx_last') ?? '/')
                        setLoading(false)
                    }
                    else{
                        throw new Error("")
                    }

                }   
                catch(e:any){
                    localStorage.removeItem("cbx_token")
                    localStorage.removeItem("cbx_last")
                    setLoading("Couldn't find any view to load. Please refresh to go back")
                }
               
            }
            else{
                navigate(data?.project?.entry)
                setLoading(false)
            }

        })


    }, [])

    const callPage = (route:string) => {

        if(!route || !routes[route]) return
        else if(isLoggedIn && !routes[route]?.user.includes(user?.role)) return 
        else {
            cbx.get(route + location.search).then((res:any) => {
                const pload = {route, res}
                // setTimeout(() => {
                    dispatch(setCache(pload))
                    setCount(noOfRequests + 1)
                   
                // }, 1000)
                setSearching(false)
            })
        }
    }

    const callOperation = (route:string, _id?: string) => {
        
        if(!route && !id) return
        
        // dispatch(setCache({route, res: {isLoading: false, data: {}}}))
        else cbx.get(route + '?_id=' + _id || id).then((res:any) => {
            const pload = {route, res}
            dispatch(setCache(pload))
            setCount(noOfRequests + 1)
         
        })
    }


    

    return <CBXContext.Provider value={{
        isLoggedIn, 
        setLoggedIn,
        user, 
        setUser, 
        callPage,
        callOperation,
        action,
        noOfRequests,
        setSearching,
        searching,
        quick_edit,
        project, 
        routes, 
        route: routes[route] ? {...routes[route], name: route} : false,
        page: project?.pages?.filter((project_page:any) => project_page.name === page)[0],
        toast
    }}>
        {loading ? <Center w={"100vw"} h="100vh">{loading}</Center> : <Outlet/>}
    </CBXContext.Provider>

}