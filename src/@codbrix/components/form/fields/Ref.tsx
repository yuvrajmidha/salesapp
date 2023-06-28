import React, { useEffect, useState } from 'react'
import { CBXRadio } from './Radio'
import { CBXSelect } from './Select'
import mustache from 'mustache'
import cbx from '../../../cbx'

export default function Ref({onChange=(ids:string[])=>{}, value,route, param, field}:any) {

    const [items, setItems] = useState<any>([])

    const [val, setValue] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const searchData = (k = '', callback=(values:any)=> {}) => {
        cbx.field.submit(route.name, param, field.name, {
            method: 'get',
            params: {_search: k}
        }).then((res:any) => {
            // convert res in option value thing
            const render = field?.view?.render ?? `<div>{{_id}}</div>`

            const options = Array.isArray(res.data) ? res?.data.map((item:any) => {return{
                render: mustache.render(render, item),
                value: item['_id']
            }}) : []

            callback(options)

        })
    }

    useEffect(() => {

        if(value === ''){
            setValue([])
        }
        else if(typeof value === "string" && value !== ''){
            setValue([value])
        }
        else if(Array.isArray(value)){
            if(value.length > 0){
                if(Object.hasOwn(value[0], '_id')){
                    setValue(value.map(i => i._id))
                }
                else if(typeof value[0] === "string"){
                    setValue(value)
                }
                else{
                    setValue([])
                }
            }
            else{
                setValue([])
            }
        }
        else{
            setValue([])
        }

    }, [value])

    useEffect(() => {
        searchData('', (options:any[]) => {
            setItems(options)
        })
    }, [])

    useEffect(() => {
    }, [loading])

    useEffect(() => {

        if(Array.isArray(val)){
            if(val.length > 0 && typeof val[0] === "string"){
                setLoading(false)
            }
            else if(val.length === 0) setLoading(false)
            else setLoading(true)
        }
        else{
            setLoading(true)
        }

    }, [val])

    return loading ? <>Loading...</> : <>{field?.multiple ? <CBXRadio
        data={items}
        max={field?.multiple ? (field?.rules?.max || items.length) : 1}
        value={val}
        onChange={onChange}
        overrides={field?.view?.class}
    /> : <CBXSelect
        data={items}
        value={val.length > 0 ? val[0] : ''}
        placeholder={field?.view?.placeholder}
        onSearch={(query:string) => {
            searchData(query, (options:any[]) => {
                setItems(options)
            })
        }}
        onChange={(value:any) => {
            Array.isArray(value) ? onChange(value) : onChange([value])
        }}
        overrides={field?.view?.class}
    />}</>
    
}
