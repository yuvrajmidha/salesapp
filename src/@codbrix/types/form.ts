import { FieldProps } from "./field"


export type FormProps = {
    fields: FieldProps[],
    initials: any,
    route: any,
    title: string,
    description: string,
    success_redirect: string,
    success_message: string,
    icon: string,
    id: string,
    layout: string,
    confirmation: string,
    collection?: string,
    submit_text: string,
    submit_position: "BOTTOM" | "TOP-RIGHT" | "BOTTOM-LEFT" | "BOTTOM-RIGHT" | "HIDDEN"
    onSubmit: Function,
    onChange: Function,
}