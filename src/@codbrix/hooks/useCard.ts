import React, { useContext, useEffect, useState } from 'react'
import cbx from '../cbx'
import { CBXContext } from '../components/provider'
import mustache from 'mustache'

export default function useCard(page:string='_users', query:any={}, dependencies:any[]=[]){

  const [render, setRender] = useState<string>('')

  const {project, user} = useContext(CBXContext)

  useEffect(() => {
    cbx.card(page, Object.entries(query).length > 0 ? query : {_id: user?._id}).then((res) => {
        if(project.cards[page]?.render){
          setRender(mustache.render(project.cards[page]?.render, res))
        }
        else{
          setRender(`<h5>${query?._id}</h5>`)
        }
    })
  }, dependencies)

  return render

}
