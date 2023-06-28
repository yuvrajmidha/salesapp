import { AxiosRequestConfig } from "axios";
import { convert } from "./parser";
import { get, load, submit, field as controller, card } from "./send";

const cbx = {

    group: (name: string) => {
        return {
            get: async  (route_name: string, query?: any) => {
                return get(`${name}/${route_name}`, query)
            },
            submit: async (route_name: string, query?:any, data?: any, config?: any) => {
                return submit(`${name}/${route_name}`, query, data, config)
            },
        }
    },
    load: load,
    field: {
        submit: controller
    },
    card: card,
    get: get,
    submit: submit,
    convert: convert,
    parse: (obj:any) => {
        return {
            to: (type:string) => {
                convert(obj, type)
            }
        }
    }
}
export default cbx;