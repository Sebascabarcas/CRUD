'use strict'
const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const User = require("./models/user")

const app = express()

app.use(bodyParser.urlencoded({extended: true})) // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json()) // for parsing application/j)

app.get("/api/user", (req,res) => {
 User.find({}, (err,user)  => {
   if (err) res.status(500).send(`La petición no pudo ejecutarse: ${err}`)
   if (!user) res.status(404).send("No se encontró el user")

   res.status(200).send({user})

 })

})

app.get("/api/user/:userId",(req,res)  =>{
let userId = req.params.userId
  User.findById(userId, (err, user) => {
    if (err) res.status(500).send(`La petición no pudo ejecutarse: ${err}`)
    if (!user) res.status(404).send("No se encontró el user")

    res.status(200).send({user})

  })
})

app.post("/api/user", (req,res) =>{
  console.log("POST")
  console.log(req.body)

  let user = new User()
  user.name = req.body.name
  user.age = req.body.age

  user.save((err, userStored) => {
    if (err)  res.status(500).send(`No se ha podido guardar el dato por el sgte error ${err}`)
//  console.log(String(err))}
    else res.status(200).send({user : userStored})

    })
})

app.put("/api/user/:userId", (req,res) =>{
  let userId = req.params.userId
  let update = req.body

  User.findByIdAndUpdate(userId, update, (err, userUpdated) =>{
    if (err) res.status(500).send(`La petición no pudo ejecutarse: ${err}`)

   res.status(200).send({user : userUpdated})
  })
})

app.delete("/api/user/:userId",(req,res)  =>{
  let userId = req.params.userId
    User.findById(userId, (err, user) => {
      if (err) res.status(500).send(`La petición no pudo ejecutarse: ${err}`)

      user.remove(err =>{
        if (err) res.status(500).send(`La petición no pudo ejecutarse: ${err}`)
        res.status(200).send({message : "EL producto se ha eliminado"})
      })

    })
})

mongoose.connect("mongodb://localhost:27017/personal", (err, res) =>{
  if (err) {
    console.log(String(err))
  }
  console.log("Conectado a mongodb")
  app.listen(3000, (req, res) => {
    console.log("Conectado correctamente")
  } )
})
