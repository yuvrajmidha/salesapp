import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { CBXContext } from '../@codbrix/components/provider'

export default function Page() {

    const {routes} = useContext(CBXContext)
    const navigate = useNavigate()

    const {page} = useParams()

    useEffect(() => {
        if(Object.entries(routes).length > 0) navigate(`/cms/${page}/${Object.entries(routes).filter((route:any) => route[1]?.route_type === "VIEW" && route[1].order === 1 && route[1].page === page)[0][0]}`)
    }, [routes])

    return (
        <div>Redirecting...</div>
    )
}
