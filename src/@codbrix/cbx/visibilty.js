import mustache from 'mustache'

export default function visibilty(variables, condition) {

    var variable = ''

    if(typeof condition === "undefined") return true
    else{
        const keys = condition?.variable.split('.')
        if(keys[1]){
            variable = variables[keys[0]][keys[1]]
        }
        else{
            variable = variables[keys[0]]
        }
    }
    
    if(condition?.operator === "equals"){
        return variable === mustache.render(condition.value, variables)
    }
    else if(condition?.operator === "not_equal"){
        return variable !== mustache.render(condition.value, variables)
    }
    else if(condition?.operator === "includes"){
        return variable.includes(mustache.render(condition.value, variables))
    }
    else{
        return true
    }

}
