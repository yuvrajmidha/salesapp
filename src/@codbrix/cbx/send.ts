import axios, { AxiosRequestConfig } from 'axios'
import { Response } from '../types/response'


const submit = (route:string, query: any, data:any, config?:any) => new Promise<Response>((resolve) => {

    axios({
        method: 'post',
        ...config,
        url:`/cms/${route}`,  
        data, 
        params: query
    }).then((res) => {
        if(res.data.token){
            // alert(res.data.token)
            localStorage.setItem('cbx_token', res.data.token)
            axios.defaults.headers['x-token'] = res.data.token
            window.location.reload()
        }
        resolve(res.data)
    }).catch(err => {
        const res = err?.response?.data
        resolve({
            ...res
        })
    })

})

const get = (route:string, query?: any) => new Promise<Response>((resolve) => {
    axios.get(`/cms/${route}`, {
        params: query
    }).then((res) => {
        resolve(res.data)
    }).catch(err => {
        console.log(err)
        const data = err?.response?.data
        resolve({
            ...data,
        })
    })
})


const load = (base_url:string, callback:any) => {

    axios.defaults.baseURL = base_url
    const token = localStorage.getItem('cbx_token')
    axios.defaults.headers['x-token'] = token

    axios.get('/load').then((res:any) => {
        callback(res.data)
    }).catch((err:any) => {
        console.log(err)
        callback({
            errors: err?.response,
            message: "Unknown Error Occured.",
            type: "LOAD",
            status: {
                code: err?.status_code,
                text: err?.status_text
            },
        })
    })

}


const field = (route:string, param:string, field:string, config: AxiosRequestConfig) => new Promise((resolve) => {

    axios({
        method: 'GET',
        url: `/field/${route}/${param}/${field}`,
        ...config
    }).then((res) => {
        resolve(res.data)
    }).catch(err => {
        const res = err?.response?.data
        resolve({
            ...res
        })
    })
    
})

const card = (page: string, query: any) => new Promise((resolve) => {

    axios({
        method: 'GET',
        url: `/card/${page}`,
        params: query
    }).then((res) => {
        resolve(res.data)
    }).catch(err => {
        const res = err?.response?.data
        resolve({
            ...res
        })
    })
    
})

export {get, submit, field, load, card}