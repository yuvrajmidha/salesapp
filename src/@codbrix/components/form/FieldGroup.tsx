import React, { useContext, useEffect } from 'react'
import ReactQuill from 'react-quill';

import {
  Box,
  useColorModeValue as mode,
  Divider,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Textarea,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Flex,
  grid,
  GridItem,
  Button,
  IconButton,
} from "@chakra-ui/react";
import BlockEditor from './fields/BlockEditor';
import { CBXSelect } from './fields/Select';
import { CBXRadio } from './fields/Radio';
import MediaField from './fields/Media/Field';
import MediaFiles from './fields/Media/File';
import cbx from '../../cbx';
import visibilty from '../../cbx/visibilty';
import Ref from './fields/Ref';
import useUser from '../../hooks/useUser';
import HTMLCard from '../../../components/HTMLCard';
import mustache from 'mustache';
import { BiCheck, BiCopy } from 'react-icons/bi';
import useClipboard from '../../hooks/useClipboard';
import { convert } from '../../cbx/parser';
import Numeric from './fields/Numeric';

export default function FieldGroup({initials, values,gridArea,space, setFieldError, setFieldValue, handleChange, handleBlur, errors, touched, fields, route, fields_param_name}:any) {

    const user = useUser()

    const placeholder = mode("gray.300", "gray.600")

    const {copyValue, hasCopied} = useClipboard()

    const cbfields = fields.filter((field:any) => !field?.view?.hidden);

    return <GridItem className={`cbx-${route.name.replace('/', '-')}-${gridArea}-panel`} area={gridArea}>
      <Box bg="white" p={space} rounded="lg">
        <Flex m="-0.5rem" flexWrap={"wrap"}>{cbfields.filter((field:any) => field?.view?.location === gridArea ? true : (gridArea === 'main' && !field?.view?.location)).map((field: any, index: number) => visibilty({
          values,
          user
        }, field?.visibility) && (
          ["heading", "paragraph", "divider", "static"].includes(field.type) ? (
            <Box
              className={`${field?.view?.class}`}
              key={index}
              textAlign={field?.align}
              p={2}
              w={
                (field?.view?.width % 12)
                  ? {
                      base: "100%",
                      lg: `${(field.view.width % 12) * (100 / 12)}%`,
                    }
                  : "100%"
              }
            >
              {field.type === "paragraph" && <HTMLCard render={field?.content} values={{...initials, ...values}}/>}
              {field.type === "static" && (
                // <HTMLCard render={field?.content} values={values}/>
                <div dangerouslySetInnerHTML={{
                  __html: values[field.name]
                }} />
              )}
              {field.type === "heading" && (
                <Heading pt={3} size={field?.size || "md"}>
                  <HTMLCard render={field?.content} values={{...initials, ...values}} as="span"/>
                </Heading>
              )}
              {field.type === "divider" && <Divider />}
            </Box>
          ) : (
            <FormControl
              py={field?.view?.readonly ? 0 : 2}
              width={"none"}
              px={2}
              className={`w-full w-${field?.view?.width}/12 ${field?.view?.class ?? 'flex flex-col '} cbx-field-${field.name} cbx-type-${field.type}`}
              pos={"relative"}
              isInvalid={
                errors[field.name] && touched[field.name] ? true : false
              }
              key={index}
            >
                {field?.view?.label && (
                  <FormLabel fontWeight={"bold"} w="100%" textTransform={"capitalize"} fontSize="sm" color="gray.500" mb={1}>
                    {field.view.label}
                  </FormLabel>
                )}
                {[
                  "number",
                  "email",
                  "text",
                  "date",
                  "week",
                  "password",
                  "time",
                  "datetime-local",
                  "month",
                ].includes(field.type) && (
                  <InputGroup display={"flex"} size="sm" alignItems="center">
                    {field?.view?.prefix && <InputLeftElement px={2} w={"auto"}>
                      {field?.view?.prefix}
                    </InputLeftElement>}
                    <Input
                      name={field.name}
                      disabled={field?.view?.readonly}
                      _disabled={{
                        border: 0,
                        px: 0,
                        py: "0px !important",
                        outline: 0,
                        height: "auto"
                      }}
                      type={field.type}
                      border={0}
                      outline={"1px solid"}
                      outlineColor="gray.300"
                      _focus={{
                        shadow: "none",
                        outlineColor: "primary.500",
                        outline: "1px solid blue"
                      }}
                      placeholder={field?.view?.placeholder}
                      _placeholder={{color: placeholder}}
                      value={values[field.name]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      min={field?.rules?.min}
                      max={field?.rules?.max}
                    />
                    {(field?.view?.copy && field?.view?.readonly) && <IconButton onClick={() => {
                      copyValue(values[field.name])
                    }} color="gray.500" variant={"ghost"} p={0} size={"sm"} aria-label='copy'>
                      {hasCopied ? <BiCheck/> : <BiCopy/>}
                    </IconButton>}
                    {field?.view?.suffix && <InputRightElement w="auto" px={2} bg="white">
                      {field?.view?.suffix}
                    </InputRightElement>}
                  </InputGroup>
                )}
                {["textarea"].includes(field.type) && (
                  <Textarea
                    name={field.name}
                    minH={["80px"]}
                    value={values[field.name]}
                    size="sm"
                    _focus={{
                      borderColor: "primary.500",
                      shadow: "none"
                    }}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                )}
                {["html"].includes(field.type) && (
                <Box borderWidth={1} className='editor-wrapper' _focusWithin={{borderColor: "primary.500"}} rounded="sm" onBlur={() => {
                }}>
                    <ReactQuill
                      readOnly={field?.view?.readonly}
                      theme="bubble"
                      value={values[field.name]}
                      onChange={(e) => {
                        setFieldValue(field.name, e)
                      }}
                    />
                </Box>
                )}

                {["blockeditor"].includes(field.type) && (
                    <Box className='block-editor-wrapper' rounded={"md"}>
                        <>{console.log()}</>
                        <BlockEditor 
                            value={values[field.name]?.blocks ? values[field.name] : {blocks: []}}
                            onChange={(blocks:any) => {setFieldValue(field.name, {
                                blocks: blocks
                            })}}
                        />
                    </Box>
                )}
      
                {/* {["select"].includes(field.type) && (
                  <>
                    <Menu size={"md"}
                    closeOnSelect={!field?.multiple}>
                      <MenuButton
                        w="100%"
                        justifyContent={"space-between"}
                        h="10"
                        p={2}
                        rightIcon={<FaCaretDown />}
                        as={Button}
                        textAlign={"left"}
                        variant="outline"
                      >
                        {field.multiple ? (
                          values[field.name] === "" ? (
                            <Text as="span" color="gray.400">
                              {field?.view?.placeholder || "Select items"}
                            </Text>
                          ) : (
                            values[field.name]?.length + " items"
                          )
                        ) : values[field.name] === "" ? (
                          <Text as="span" color="gray.400">
                            Select One
                          </Text>
                        ) : (
                          <Box
                            w="100%"
                            dangerouslySetInnerHTML={{
                              __html:
                                field?.rules?.options.filter(
                                  (option: any) =>
                                    option.value === values[field.name]
                                )[0]?.render || values[field.name],
                            }}
                          ></Box>
                        )}
                      </MenuButton>
                      <MenuList minWidth="240px">
                        {!field.multiple ? (
                          <MenuOptionGroup
                            value={values[field.name]}
                            title="Select One"
                            type="radio"
                          >
                            {field?.rules?.options?.map(
                              (option: any, index: number) => (
                                <MenuItemOption
                                  key={index}
                                  onClick={() => {
                                      setFieldValue(field.name, option.value)
                                  }}
                                  value={option.value}
                                >
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html:
                                        option?.render || option.value,
                                    }}
                                  />
                                </MenuItemOption>
                              )
                            )}
                          </MenuOptionGroup>
                        ) : (
                          <MenuOptionGroup
                            title="Select"
                            type="checkbox"
                            value={values[field.name] || []}
                            onChange={(value: any) => {
                              setFieldValue(field.name, value);
                            }}
                          >
                            {field?.rules?.options?.map(
                              (option: any, index: number) => (
                                <MenuItemOption
                                  key={index}
                                  value={option.value}
                                >
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html:
                                        option?.render || option.value,
                                    }}
                                  />
                                </MenuItemOption>
                              )
                            )}
                          </MenuOptionGroup>
                        )}
                      </MenuList>
                    </Menu>
                  </>
                )} */}
                {["select"].includes(field.type) && (
                      <CBXSelect
                        value={values[field.name]}
                        onChange={(value:any) => setFieldValue(field.name, value?.length ? value[0] : value)}
                        data={field?.rules.options}
                      />
                )}
                {["radio"].includes(field.type) && (
                      <CBXRadio
                        value={values[field.name]}
                        onChange={(value:any) => setFieldValue(field.name, value?.length ? value[0] : value)}
                        data={field?.rules.options}
                      />
                )}
                {/* {["radio"].includes(field.type) && (
                  <>
                    {!field?.multiple === true ? (
                      <>
                        <RadioGroup
                          my={3}
                          onChange={(e) => {
                            setFieldValue(field.name, e);
                          }}
                          value={values[field.name]}
                        >
                          <Flex mx="-0.5rem" wrap={"wrap"} gap={0}>
                            {field?.rules?.options.map(
                              (option: any, index: any) => (
                                <Box
                                  key={index}
                                  className="radio-wrapper"
                                  borderColor={
                                    values[field.name] === option.value
                                      ? "blue.500"
                                      : "gray.100"
                                  }
                                  rounded="md"
                                  py={1}
                                  px={2}
                                >
                                  <Radio value={option.value}>
                                    {option?.render}
                                  </Radio>
                                </Box>
                              )
                            )}
                          </Flex>
                        </RadioGroup>
                      </>
                    ) : (
                      <>
                        <CheckboxGroup
                          colorScheme="green"
                          value={
                            values[field.name] === ""
                              ? []
                              : values[field.name]
                          }
                          onChange={(arr) => {
                            // console.log(field.name, arr)
                            setFieldValue(field.name, arr);
                          }}
                        >
                          <Flex w="100%" py={2} wrap={"wrap"} gap={2}>
                            {field?.rules?.options?.map(
                              (option: any, index: any) => (
                                <Checkbox
                                  borderWidth={0}
                                  key={index}
                                  value={option.value}
                                >
                                  <Box
                                    dangerouslySetInnerHTML={{
                                      __html: option?.render,
                                    }}
                                  />
                                </Checkbox>
                              )
                            )}
                          </Flex>
                        </CheckboxGroup>
                      </>
                    )}
                  </>
                )} */}
                
                {["ref"].includes(field.type) && (
                  <Box>
                    <Ref
                      field={field}
                      param={fields_param_name}
                      route={route}
                      onChange={(value:any) => {
                        if(field?.multiple){
                          Array.isArray(value) ? setFieldValue(field.name, value) : setFieldValue(field.name, [])
                        }else{
                          Array.isArray(value) ? setFieldValue(field.name, value.length > 0 ? value[0] : '') : setFieldValue(field.name, value)
                        }                    
                      }}
                      value={values[field.name]}
                    />
                  </Box>
                )}
            
                {["file"].includes(field.type) && (
                  <MediaField
                    field={field}
                    param={fields_param_name}
                    max={field?.multiple ? -1 : 1}
                    route={route}
                    value={convert(values[field.name], "array")}
                    onChange={(value:any) => {setFieldValue(field.name, convert(value, field.multiple ? "array" : "string"))}}
                  />
                )}
                {["image"].includes(field.type) && (
                  <MediaFiles
                    field={field}
                    param={fields_param_name}
                    max={field?.multiple ? -1 : 1}
                    route={route}
                    value={convert(values[field.name], "array")}
                    onChange={(value:any) => {setFieldValue(field.name, convert(value, field.multiple ? "array" : "string"))}}
                  />
                )}
                {["numeric"].includes(field.type) && (
                  <Numeric
                    {...field}
                    value={values[field.name]}
                    setFieldValue={setFieldValue}
                  />
                )}
                <FormErrorMessage>{`${
                  errors[field.name]
                }`}</FormErrorMessage>
                {(field?.view && field.view?.help) && (
                  <FormHelperText fontSize={"xs"}>{field.view.help}</FormHelperText>
                )}
            </FormControl>
          )
        ) 
        
        )}</Flex>
      </Box>
    </GridItem>
    
}
