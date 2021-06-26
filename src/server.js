// Importando o Express e Route
const express = require('express')
const route = require('./route')
const path = require('path')

// Criar o server
const server = express()

// Passando para o Express que a View Engine será o módulo EJS
server.set('view engine', 'ejs')

server.use(express.static("public"))

// Passando para o Express o caminho do EJS
server.set('views', path.join(__dirname, 'views')) 

// Middleware
server.use(express.urlencoded({extended: true}))

// Passando para o Express usar o arquivo Route
server.use(route)

server.listen(3000, () => console.log('Rodando'))