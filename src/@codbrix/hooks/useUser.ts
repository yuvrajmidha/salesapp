import React, { useContext } from 'react'
import { CBXContext } from '../components/provider'

export default function useUser(){

  const {user} = useContext(CBXContext)

  return user
  
}
