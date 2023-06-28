import React, { useContext } from 'react'
import { CBXContext } from '../components/provider'

export default function useProject(){

  const {project} = useContext(CBXContext)

  return project
}
