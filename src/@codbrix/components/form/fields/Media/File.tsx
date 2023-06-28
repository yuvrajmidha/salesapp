import { Box, Button } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { MdAdd } from 'react-icons/md'
import { ReactSortable } from 'react-sortablejs'
import cbx from '../../../../cbx'
import { CBXCard } from '../../../cards/Card'
import MediaBrowser from './Browser'

const getFile = (src:string) => {

    if(!src) return 

    src = src.toString()

    const parts = src.split('/')
    const filename = parts[parts.length - 1]
    const _ext = filename.split('.');
    const ext = _ext[_ext.length - 1]

    if(["png", "jpeg", "webp", "avif", "jpg", "gif"].includes(ext))
    return {
        src: src,
        name: filename.split('&')[0],
        extension: ext
    }

    else return {
        src: "https://dummyimage.com/800x800/e8e8e8/bfbfbf.png&text=" + filename,
        name: filename.split('&')[0]
    }

  }

export default function MediaFiles({onChange=(ids:string[])=>{}, value,route, param, field, max=-1}:any) {

    const [list, setList] = useState<any[]>([])

    const handleList = (values: any[]) => {
        onChange(values)
    }

    useEffect(() => {
        // console.log(value, max)
    }, [])

    const getColumns = (col:number=1) => {
        return ["full", "full", "36", "32", "20", "15"][col]
    }

    return (
        <Box>
            {value?.length > 0 && <ReactSortable animation={150} ghostClass="opacity-0" className='flex flex-wrap w-100 py-3' dragClass='' filter=".ignoreDrag" handle='.cbx-drag' list={value} setList={handleList}>
                {value.map((img:string, index:number) => <CBXCard
                    classes={`group  relative w-1/${field?.view?.columns} p-1`}
                    key={index}
                    overrides={field?.view?.class}
                    onClickInside={(event:string, el:any) => {
                        if(event === 'delete'){
                            onChange(value.filter((image:any) => image !== img))
                        }
                    }}
                    render={field?.view?.render ?? (field.type === "image" ? `<div class='flex justify-center rounded-md overflow-hidden items-center bg-gray-100'>
                    <img src='{{src}}' class='cbx-drag object-cover w-full h-${getColumns(field?.view?.columns)}'/>
                    <div class='absolute hidden justify-end group-hover:flex  bottom-0 left-0 right-0 w-full py-2 px-2'>
                        <a data-event="delete" class='cbx-event cursor-pointer hover:bg-black/40 bg-black/30 py-2 px-3 rounded-lg text-white'>
                            <i class='bx bx-trash pointer-events-none'></i>
                        </a>
                    </div>
                </div>` :`<div class='border-black/50 ring-1 ring-black/10 rounded-lg mb-2'>
                        <div class='flex items-center justify-start w-full overflow-hidden py-1 px-3'>
                            <i class='bx bx-grid-vertical cbx-drag opacity-50 mr-2'></i>
                            <i class='bx bx-link-alt opacity-50'></i>
                            <h6 class='px-2 max-w-xs overflow-hidden h-6 text-ellipsis whitespace-nowrap'>{{name}}</h6>
                            <a data-event="delete" class='cbx-event ml-auto cursor-pointer hover:bg-gray-100 py-1 px-2 rounded-lg text-gray-500'>
                                <i class='bx bx-plus rotate-45 scale-110 pointer-events-none'></i>
                            </a>
                        </div>
                    </div>`)}
                    data={getFile(img)}
                />)}
            </ReactSortable>}
            <MediaBrowser 
                onSave={(new_values:any[]) => {
                    const arr = Array.isArray(value) ? [...new_values, ...value] : new_values
                    onChange(arr.filter((a, i) => i === arr.indexOf(a)))
                }}
                onLoad={() => {
                    cbx.field.submit(route.name, param, field.name, {method: "get"}).then((res:any) => {
                        setList(res.data.images)
                    })
                }}
                onUpload={(file:any, onClose:any) => {
                    cbx.field.submit(route.name, param, field.name, {
                        method: "POST",
                        data: file
                    }).then((res:any) => {
                        onChange(Array.isArray(value) ? [...value, res.data.url] : [res.data.rule])
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
                        setList(list?.filter(file => file?.Key !== key))
                    }).catch(err => {
                        console.log(err)
                    })
                }}
                max={max}
                value={Array.isArray(value) ? value : (value === '' ? [] : [`${value}`])}
                mediaList={list}
            >
                {(value?.length < max || max === -1) && <Button height={value?.length > 0 ? "32px" : "128px"} size="sm" variant={"outline"} leftIcon={<MdAdd/>} borderStyle="dashed" w="100%">{field?.view?.placeholder ?? "Add"}</Button>}
            </MediaBrowser>
        </Box>
    )

}
