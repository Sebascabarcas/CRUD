'use strict'

const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = Schema({
  name : String,
  age :{type : Number, default: 18}
})

module.exports = mongoose.model("User", UserSchema) //PARA HACERLO ACCESIBLE DESDE CUALQUIER LADO DEL CODIGO
