import React, { useContext } from 'react'
import { CBXContext } from '../components/provider'

export default function useSearching(){

  const {searching, setSearching} = useContext(CBXContext)

  return {searching, setSearching}

}
