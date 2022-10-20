const { v4: uuidv4 } = require('uuid')
const express = require('express')
const fs = require('fs')
const PORT = 8080
const app = express()
const archivo = "producto.txt"
let informacion = []

try {
  console.log(`Intentando leer el archivo: ${archivo}`)
  informacion = JSON.parse(fs.readFileSync(archivo, 'utf-8'))
} catch (error) {
  console.error(error)
}

const server = app.listen(PORT, () => {
  console.log(`Listening server ${server.address().port}`)
})

app.get('/productos', (req,res) => {
  let uuid = uuidv4()
  let body = JSON.stringify(informacion)
  res.set('X-UUID', uuid)
  res.status(200)
  res.send(body)
  console.log(`Id: ${uuid}, Path: ${req.path}, Response: ${body}`)
})

app.get('/productosRandom', (req,res) => {
  let randomIndex = Math.floor(Math.random() * informacion.length ); 
  let uuid = uuidv4()
  let body = `[${JSON.stringify(informacion[randomIndex])}]`
  res.set('X-UUID', uuid)
  res.status(200)
  res.send(body)
  console.log(`Id: ${uuid}, Path: ${req.path}, Index: ${randomIndex}, Response: ${body}`)
})