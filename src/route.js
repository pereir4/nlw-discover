// Importando o Express
const express = require('express')
const QuestionController = require('./controllers/QuestionController')
const RoomController = require('./controllers/RoomController')

const route = express.Router()

// Definindo as routas
route.get('/', (req, res) => res.render("index", {page: 'welcome'}))
route.get('/create-pass', (req, res) => res.render("index", {page: 'create-pass'}))

route.get('/room/:room', RoomController.open)
route.post('/enter-room', RoomController.enter)
route.post('/create-room', RoomController.create)

route.post('/question/create/:room', QuestionController.create)
route.post('/question/:room/:question/:action', QuestionController.index)

// Exportando a constante ROUTE
module.exports = route