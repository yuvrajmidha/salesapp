import React, { useContext, useState } from 'react'
import { CBXContext } from '../components/provider'

export default function useClipboard(){

  const {toast} = useContext(CBXContext);

  const [hasCopied, setCopied] = useState(false)

  return {
    copyValue: (value:string) => {
      navigator.clipboard.writeText(value)
      // setCopied(true)
      toast({
        description: "Copied to Clipboard",
        status: "success",
      })
    },
    hasCopied
  }
}
