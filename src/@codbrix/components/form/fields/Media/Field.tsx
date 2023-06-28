import { Box, Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { MdAdd } from 'react-icons/md'
import { ReactSortable } from 'react-sortablejs'
import cbx from '../../../../cbx'
import { CBXCard } from '../../../cards/Card'
import MediaBrowser from './Browser'

export default function MediaField({onChange=(ids:string[])=>{}, value,route, param, field, max=-1}:any) {

    const [list, setList] = useState<any[]>([])

    const handleList = (values: any[]) => {
        onChange(values)
    }

    return (
        <Box>
            {value?.length > 0 && <ReactSortable animation={150} ghostClass="opacity-0" className='flex flex-wrap w-100 py-3' dragClass='' filter=".ignoreDrag" handle='.cbx-drag' list={value} setList={handleList}>
                {value.map((img:string, index:number) => <CBXCard
                    classes={'group'}
                    key={index}
                    overrides={field?.view?.class}
                    onClickInside={(event:string, el:any) => {
                        if(event === 'delete'){
                            onChange(value.filter((image:any) => image !== img))
                        }
                    }}
                    render={field?.view?.render ?? `<div class='relative'>
                        <img src='{{image}}' class='cbx-drag object-hover mx-1 rounded-md'/>
                        <div class='absolute hidden justify-end group-hover:flex  bottom-0 left-0 right-0 w-full py-1 px-1'>
                            <a data-event="delete" class='cbx-event cursor-pointer hover:bg-black/40 bg-black/30 py-2 px-3 rounded-lg text-white'>
                                <i class='bx bx-trash pointer-events-none'></i>
                            </a>
                        </div>
                    </div>`}
                    data={{image: img}}
                />)}
            </ReactSortable>}
            <MediaBrowser 
                onSave={(value:any[]) => {
                    onChange(value)
                }}
                onLoad={() => {
                    cbx.field.submit(route.name, param, field.name, {method: "get"}).then((res:any) => {
                        setList(res)
                    })
                }}
                onUpload={(file:any, onClose:any) => {
                    cbx.field.submit(route.name, param, field.name, {
                        method: "POST",
                        data: file
                    }).then((res:any) => {
                        onChange([...value, res.data])
                        onClose()
                    }).catch(err => {
                        console.log(err)
                    })
                }}
                onDelete={(key:string) => {
                    cbx.field.submit(route.name, param, field.name, {
                        method: "DELETE",
                        params: {_key: key}
                    }).then((res:any) => {
                        setList(list.filter(file => file?.Key !== key))
                    }).catch(err => {
                        console.log(err)
                    })
                }}
                max={max}
                value={Array.isArray(value) ? value : (value === '' ? [] : [`${value}`])}
                mediaList={list}
            >
                {(value?.length < max || max === -1) && <Button height={value?.length > 0 ? "32px" : "128px"} size="sm" variant={"outline"} leftIcon={<MdAdd/>} borderStyle="dashed" w="100%">Add</Button>}
            </MediaBrowser>
        </Box>
    )

}
