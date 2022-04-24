const { Schema, model} = require('mongoose')

const SchemaEmployed = Schema({
  surname: {
    type: String,
    required: true
  },
  second_surname: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true
  },
  other_name: {
    type: String,
  },
  country: {
    type: String,
    required: true,
  },
  type_id: {
    type: String,
    required: true,
  },

  nro_id:{
    type: String,
    required: true,
  },

  email:{
    type: String,
    required: true,
  },

  date_entry:{
    type: Date,
    required: true,
  },

  department:{
    type: String,
    required: true,
  },

  state:{
    type: Boolean,
    required: true,
    default:true
  },

  date_register:{
    type: Date,
    required: true,
    default:new Date(),
  },
})

SchemaEmployed.method('toJSON',function(){
  const {__v,_id,...object} = this.toObject()
  object.id = _id
  return object
})

module.exports= model('Employes',SchemaEmployed)
