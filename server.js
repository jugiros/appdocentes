const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')
const publico = require('./routes/public')

var app = express()
const server = http.createServer(app)

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.get('/', function (req, res, next) {
  res.status(500).send("Ésta es una petición válida")
})
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/public', publico)
server.listen('3000', function () {
  console.log('Servidor Iniciado http://localhost:3000/!')
})
module.exports=server
