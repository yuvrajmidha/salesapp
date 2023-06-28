import React, { useContext, useEffect, useRef } from 'react'
import mustache from 'mustache'
import { useLocation, useNavigate } from 'react-router-dom'
import { CBXContext } from '../@codbrix/components/provider'
import { Box } from '@chakra-ui/react'

export default function HTMLCard({render='', values={}, ...props}:any) {

    const navigate = useNavigate()

    const {action, quick_edit, noOfRequests} = useContext(CBXContext)

    const card:any = useRef()

    const modal:any = useRef()

    const handleHTML = () => {

      const item = Array.from(document.getElementsByClassName('cbx-navigate'))
        for (let index = 0; index < item.length; index++) {
            const element:any = item[index];
            element.onclick = (e:any) => {
                navigate('/cms' + element?.dataset?.navigate)
            }
      }

      const submits = Array.from(card.current.getElementsByClassName('cbx-submit'))
        for (let index = 0; index < submits.length; index++) {
            const element:any = submits[index];
            element.onclick = (e:any) => {
                var form_id = element?.dataset?.form
                var btn = document.getElementById('cbx-form-' + form_id.replace('/', '-') + '-submit')
                btn?.click()
            }
      }

        const prompts = Array.from(card.current.getElementsByClassName('cbx-prompt'))
        for (let index = 0; index < prompts.length; index++) {
            const element:any = prompts[index];
            element.onclick = (e:any) => {
                action.current.openPrompt(element?.dataset?.prompt, element?.dataset?.id)
            }
        }


        const modals = Array.from(card.current.getElementsByClassName('cbx-modal'))
        for (let index = 0; index < modals.length; index++) {
            const element:any = modals[index];
            element.onclick = (e:any) => {
                action?.current?.openModal(element?.dataset?.route, element?.dataset?.id ?? '', element?.dataset?.title ?? '', element?.dataset?.size ?? '')
            }
        }


        const sidebar = Array.from(card.current.getElementsByClassName('cbx-sidebar'))
        for (let index = 0; index < sidebar.length; index++) {
            const element:any = sidebar[index];
            element.onclick = (e:any) => {
              quick_edit?.current?.openSidebar(element?.dataset?.page, element?.dataset?.id)
          }
        }

    }

    useEffect(() => {

        handleHTML()

    }, [noOfRequests])

  return (
    <>
      <Box ref={card} onTouchStart={() => {
          handleHTML()
      }} onMouseEnter={(e) => {
        handleHTML()
      }} dangerouslySetInnerHTML={{__html: mustache.render(render, values)}} {...props}/>
      {/* <BlankModal ref={modal}/> */}
    </>
  )
}
