export default function filterIds(fields, values){
    fields.map((field) => {
        if(field.type === 'ref' && Array.isArray(values[field.name])){
           var _ids = values[field.name].map((value) => value._id)
           values[field.name] = field.multiple ? _ids : _ids[0]
        }
    })
    return values
}