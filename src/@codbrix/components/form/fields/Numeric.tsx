import {
    Center,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

export default function Numeric({ rules, view, value, name, setFieldValue }: any) {

  const [num, setNum] = useState(rules.default)

  useEffect(() => {
    setNum(typeof value === "undefined" ? (rules?.default ? rules.default : 0) : Number(value))
  }, [value])

  return (
    <NumberInput
      px={2}
      rounded="sm"
      size="sm"
      pos={"relative"}
      precision={rules.precision ?? 0}
      value={num}
      onChange={(str, num) => {
        setFieldValue(name, num)
      }}
      max={rules.max}
      
      min={rules.min}
      step={rules.step ?? 1}
      display="flex"
      alignItems={"center"}
      borderWidth={1}
      _focusWithin={{borderColor: "primary.500"}}
    >
      {view.prefix && (
        <Center
          h="100%"
          fontSize={"sm"}
          px={1}
        >
          {view.prefix}
        </Center>
      )}
      <NumberInputField disabled={true} _disabled={{color: "inherit"}} px={1} border={0} _focus={{ shadow: "none" }} />
      {view.suffix && (
        <Center
          h="100%"
          fontSize={"sm"}
          px={1}
        >
          {view.suffix}
        </Center>
      )}
      <NumberInputStepper pos="relative" flexDirection={"row"} width="4rem">
        <NumberIncrementStepper color="gray.500" borderWidth={0} py={2} rounded="md" px={2} >
            <FaPlus/>
        </NumberIncrementStepper>
        <NumberDecrementStepper
          borderWidth={0}
          py={2}
          color="gray.500"
          px={2}
          rounded="md"
          _last={{ borderWidth: 0 }}
        >
            <FaMinus/>
        </NumberDecrementStepper>
      </NumberInputStepper>
    </NumberInput>
  );
}
