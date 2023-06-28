type FieldView = {

    label?: string,
    placeholder?: string,
    class?: string,
    hidden?: boolean
    help?: string
}

type OptionsRule = {
    render: string,
    value: any
}

type FieldRules = {
    options?: OptionsRule[],
    min_length?: number,
    max_length?: number,
    min?: number,
    max?: number,
    after?: number,
    default?: any,
    before?: number,
    pattern?: string[],
    collection_name?:string,
    fields?:string[],
    filter?: any
}

export type FieldProps = {
    name: string,
    type: string,
    required?: boolean,
    multiple?: boolean,
    view?: FieldView,
    rules?: FieldRules,
}