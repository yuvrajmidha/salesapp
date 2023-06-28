/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react'
import { CBXCard } from '../../cards/Card'

export function CBXRadio({data=[], onChange=(value: any)=>{}, max=1, classes, overrides, width=0, value=[]}:any) {
  
    const [selections, setSelected] = useState<any[]>([])
    const [options, setOptions] = useState<any[]>([])

    useEffect(() => {
        if(value) setSelected(Array.isArray(value) ? value : [value])
    }, [value])

    useEffect(() => {
        setOptions(data)
    }, [data])

    // useEffect(() => {
    //     const all_data = [...options, ...data]
    //     setOptions(all_data.filter((item, index) => index === all_data.findIndex(el => el.value === item.value)))
    // }, [data])

    const handleChange = (value:any) => {
        setSelected(value)
        onChange(value)
    }

    return (<div className="flex flex-wrap" role="none">
            {options.map((option:any, i:number) => <CBXCard
                    key={i}
                    classes={classes ? classes : (' py-1 px-2 mr-2 mb-2 group rounded-md ring-1 ring-gray-200 cursor-pointer w-auto ' + (value?.includes(option.value) ? ' ring-black ' : ''))}
                    overrides={overrides}
                    render={option.render}
                    isSelected={value?.includes(option.value)}
                    onClick={() => {
                        const index = selections.indexOf(option.value)
                        if(index > -1){
                            handleChange(selections.filter(item => item !== option.value))
                        }
                        else{
                            if(max === 1){
                                handleChange([option.value])
                            }
                            else if(selections.length < max){
                                handleChange([...selections, option.value])
                            }
                        }
                    }}
                    tabIndex={-1}
                    data={{}}
                />)}
    </div>)
}