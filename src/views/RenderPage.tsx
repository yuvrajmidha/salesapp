import React, { useContext, useEffect } from 'react'
import ActionModal from '../components/OperationModal'
import { CBXContext } from '../@codbrix/components/provider'
import MenuView from '../templates/Menu'
import TabView from '../templates/Tabs'
import { useLocation, useNavigate } from 'react-router-dom'
import { QuickEdit } from '../components/QuickEdit'

export default function RenderPage() {

  const {page, action, quick_edit, isLoggedIn, project} = useContext(CBXContext)
  const navigate = useNavigate()
  
  useEffect(() => {
    if(!isLoggedIn){
      navigate('/public/' + project.entry)
    }
  }, [isLoggedIn])

  const location = useLocation()

  useEffect(() => {

    localStorage.setItem('cbx_last', location.pathname + document.location.search)
    
}, [location])

  return (
    <>
      <ActionModal ref={action}/>
      <QuickEdit ref={quick_edit}/>
      <TabView/>
    </>
  )
}
