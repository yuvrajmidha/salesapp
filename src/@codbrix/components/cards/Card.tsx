import React, { useEffect, useRef, useState } from 'react'
import mustache from 'mustache';

export const CBXCard = ({classes='', render='',data={}, overrides='', selectedClass='',isSelected, width='', onClick=(e:any)=> {}, onClickInside=(type:string, e:any)=> {}, ...props }:any) => {
    
    const [selected, setSelected] = useState(isSelected);

    const wrapper = useRef();

    useEffect(() => {
        setSelected(isSelected)
    }, [isSelected])

    return <div
        ref={wrapper}
        onClick={(e:any) => {
            onClick(e)
            if(typeof isSelected !== "boolean") setSelected(!selected)
        }}
        onMouseEnter={() => {
            const el:any = wrapper.current

            el.onclick = (e:any) => {
                if(Object.hasOwn(e.target?.dataset, "event")){
                    const event = e.target?.dataset['event']
                    onClickInside(event, e.target)
                }
            }
        }}
        {...props}
        className={(overrides ? overrides : `${classes}`) + `${' '} ${selected ? 'cbx-selected' : ''}`}
        dangerouslySetInnerHTML={{__html: mustache.render(render, data)}}
    />
}