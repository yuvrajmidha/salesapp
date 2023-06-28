export const makeArray = (value) => {

    if(Array.isArray(value)){
        return value
    }
    else{
        if(value === '' || !value){
            return []
        }
        else{
            return [value]
        }
    }
}

export const makeString = (value) => {

    console.log("String:", value)

    if(Array.isArray(value)){
        if(value.length > 0){
            return value[0]
        }
        else{
            return ''
        }
    }
    else{
        return value
    }
}

export const convert = (value, into) => {
    if(into === "array"){
        return makeArray(value)
    }
    else if(into === "string"){
        return makeString(value)
    }
}