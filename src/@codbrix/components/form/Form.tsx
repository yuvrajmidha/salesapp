import React, { useContext, useEffect, useRef, useState } from "react";
import { Formik, Form } from "formik";

import {
  Box,
  Button,
  useColorModeValue as mode,
  Flex,
  HStack,
  ButtonGroup,
  Card,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import FieldGroup from "./FieldGroup";
import HTMLCard from "../../../components/HTMLCard";
import { FormProps } from "../../types/form";
import cbx from "../../cbx";
import { useLocation, useNavigate } from "react-router-dom";
import { getLocationParams } from "../../cbx/params";
import { CBXContext } from "../provider";
import mustache from 'mustache'
import Confirmation from "../dialog/Confirmation";
import { FieldProps } from "../../types/field";

export const CBForm = (props: FormProps) => {

  const route  = props.route

  const navigate = useNavigate()
  const location = useLocation()

  const {toast, setUser, setLoggedIn} = useContext(CBXContext)

  const id = props?.id

  const [myValues, setValues] = useState({})


  const {
    fields,
    submit_text,
    submit_position,
    confirmation='',
    success_message,
    success_redirect,
    layout = '"main"',
    initials = {},
    title="",
    onSubmit = (values:any, {setTouched, setSubmitting, setErrors}: any) => {

      //touch each field
      setTouched(Object.fromEntries(fields.map((field:any) => [field.name, true])))
      
      //submitting to true
      setSubmitting(true)
  
      //query
      var query:any = {}
  
      if(id){
        query['_id'] = id
      }
  
      //call function
      cbx.submit(route.name, query, {...getInitials(initials), ...values}).then((res:any) => {

        toast({
          description: success_message || res.message,
          status: res.type.toLowerCase(),
        });
  
        setSubmitting(false);
  
        if(res.type === "Success") {

          if(!success_redirect){
            navigate(location.pathname + getLocationParams({_updated: 'true'}))
          }
          else{
            //   if redirect has search params
            if (success_redirect.includes("?")) {
                navigate(mustache.render(success_redirect + '&_updated=true', values));
              }
              // if redirect is plain
              else {
                navigate(success_redirect);
              }
          }
  
        } else {
          setErrors(Object.fromEntries(Object.entries(res.errors).map((item: any) => [item[0],item[1].message,])));
        }
      }).catch(err => {
        console.log(err)
      })
  
    },
    onChange = (values: any) => {}
  } = props

  var submit_pos = 'DEFAULT'

  if(!submit_position){
    if(route.route_type === "OPERATION"){
      submit_pos = "TOP-RIGHT"
    }
    else if(route.route_type === "PROMPT"){
      submit_pos = "BOTTOM-LEFT"
    }
    else{
      submit_pos = "BOTTOM-LEFT"
    }
  }
  else{
    submit_pos = submit_position
  }

  const cbfields = fields ?? [];

  const confirmation_dialog:any = useRef()

  const getInitials = (initials:any) => {
    var init:any = {}
    fields.filter((field: FieldProps) => field.name).map((field: FieldProps) => {
        if(initials[field.name] === '' || typeof initials[field.name] === "undefined"){
          init[field.name] = field.rules?.default ?? ''
        }
        else{
          init[field.name] = initials[field.name]
        }
    })
    return init
  }

  var locations:any[] = []
  layout.split(' ').map(str => 
    str.replaceAll('"', '').replaceAll("'", '').split(' ').map(str => {
      if(!locations.includes(str)) locations.push(str)
    })
  )

  useEffect(() => {
      if(Object.entries(myValues).length === 0){
        onChange(getInitials(initials))
      }
      else{
        onChange(myValues)
      }

  }, [myValues])

  return (
      <Formik
        initialValues={getInitials(initials)}
        enableReinitialize={true}
        validate={(values: any) => {
          setValues(values)
        }}
        onSubmit={(values: any, { setErrors, setSubmitting, setTouched }) => {
          if(confirmation){
            confirmation_dialog.current.open()
          }
          else{
            onSubmit(values, { setErrors, setSubmitting, setTouched });
          }
        }}
      >
        {({isSubmitting,...formikProps}) => (
          <Form style={{display: "flex", flex: 1}}>
            
            <Confirmation ref={confirmation_dialog} title={""} text={mustache.render(confirmation, formikProps.values)} onConfirm={(callback:any) => {
                onSubmit(formikProps.values, formikProps);
                callback()
            }} onDiscard={() => {
                formikProps.setSubmitting(false)
            }} confirmText="Proceed" />

            <Flex maxWidth={locations.length > 1 ? "7xl" : "3xl"} mx="auto" flex={1} direction={"column"}>

             {route?.route_type === "OPERATION" && <>
                {(submit_pos.includes("TOP") || title !== '') && <HStack p={3} justifyContent={"space-between"}>
                  {typeof title !== "string" ? <Box>{title}</Box> : <HTMLCard values={formikProps.values} render={title}/>}
                  {submit_pos === "TOP-RIGHT" && <Button
                    isDisabled={isSubmitting}
                    _disabled={{ opacity: 1 }}
                    isLoading={confirmation ? false : isSubmitting}
                    id={'cbx-form-' + route.name.replace('/', '-') + '-submit'}
                    loadingText={"Submitting..."}
                    variant="outline"
                    size="xs"
                    type="submit"
                  >
                    {submit_text}
                  </Button>}
                </HStack>}
              </>}

              <Grid w="100%" gap={locations.length > 1 ? 3 : 0} gridAutoColumns="1fr" templateAreas={[`"main" "right" "left"`,`"main" "right" "left"`, layout]}>
                {['left', "main", "right"].map(area => locations.includes(area) && <FieldGroup space={3} initials={initials} fields={cbfields} gridArea={area} key={area} fields_param_name={"fields"} route={route} {...formikProps}/>)}
              </Grid>

              {submit_pos.includes("BOTTOM") && <Flex p={3} rounded="lg" justify={submit_pos.includes("RIGHT") ? "end" : "start"} w="100%">
                <Button
                  isDisabled={isSubmitting}
                  size="sm"
                  id={'cbx-form-' + route.name.replace('/', '-') + '-submit'}
                  width={submit_pos === "BOTTOM" ? "100%" : "auto"}
                  _disabled={{ opacity: 0.75 }}
                  textTransform="capitalize"
                  isLoading={confirmation ? false : isSubmitting}
                  loadingText={"Submitting..."}
                  colorScheme={"primary"}
                  type="submit"
                >
                  {submit_text}
                </Button>
              </Flex>}
            </Flex>
          </Form>
        )}
      </Formik>
  ) 
};
