/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react'
import { CBXCard } from '../../cards/Card'
import { CBXRadio } from './Radio'


export function CBXSelect({data=[],placeholder='', onChange=(value: string)=>{}, onSearch=(k: string)=>{}, max=1, value=[], overrides=''}:any) {
  

    const [menuFocus, setMenuFocus] = useState(false)
    const [inputFocus, setInputFocus] = useState(false)

    const [selected, setSelected] = useState({render: ''})

    const [query, setQuery] = useState('')
    const [options, setOptions] = useState<any[]>([])

    const [isOpen, setOpen] = useState(false)

    useEffect(() => {

        setSelected(data.filter((item:any) => item.value === (Array.isArray(value) ? value[0] : value))[0])

    }, [value, data])

    useEffect(() => {
        
        setOptions(query === '' ? data : data.filter((item:any) => item.value.toLowerCase().includes(query.toLowerCase())))

    }, [query, data])

    useEffect(() => {

        const all_data = [...data, ...options]
        setOptions(all_data.filter((item, index) => index === all_data.findIndex(el => el.value === item.value)))
        
    }, [data])

    useEffect(() => {

        if(menuFocus === true || inputFocus === true){
            setOpen(true)
        }
        else{
            setOpen(false)
        }
        
    }, [menuFocus, inputFocus])

    useEffect(() => {
        window.onblur= () => {
            setOpen(false)
        }
    }, [])

    return (
        <div className="relative inline-block text-left w-full">
        <div onClick={() => {setInputFocus(true)}} onBlur={() => {setInputFocus(false)}} className='w-full'>
            {!selected?.render ? <input tabIndex={-1} placeholder={placeholder} onChange={(e) => {setQuery(e.target.value); onSearch(e.target.value)}} className='w-full ring-1 ring-gray-200 rounded-sm focus:outline-none px-2 py-1' /> :
            <button type="button" onClick={() => {setOpen(!isOpen)}} className="ring-1 ring-gray-200 inline-flex w-full items-center justify-between gap-x-1.5 rounded-sm bg-white px-2 py-1 text-sm font-semibold text-gray-900" id="menu-button" aria-expanded="true" aria-haspopup="true">
                <CBXCard
                    classes='cursor-pointer w-full justify-start flex'
                    overrides={overrides}
                    render={selected?.render}
                    width={12}
                />
                <svg className={"cbx-drop-icon -mr-1 h-5 w-5 text-gray-400 transition " + (isOpen ? " rotate-180" : '')} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                </svg>
            </button>}
        </div>
      
       {isOpen && <div style={{zIndex: 300}} onFocus={() => {setMenuFocus(true)}} onBlur={() => {setMenuFocus(false)}} className="absolute right-0 mt-2 w-full origin-top-right rounded-md bg-white ring-1 ring-gray-200 shadow-lg p-0 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
          <CBXRadio
            data={options}
            classes={'w-full py-2 px-2 hover:bg-gray-100 text-sm my-0'}
            onChange={(value:any) => {
                typeof value === "string" ? onChange(value[0]) : onChange(value)
                setOpen(false)
            }}
            value={value}
            width={12}
            max={max}
            overrides={overrides}
          />
        </div>}
      </div>
      
  )
}