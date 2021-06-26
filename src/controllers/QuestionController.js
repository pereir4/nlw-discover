// Importando o banco de dados
const Database = require('../db/config')

module.exports = {
    async index(req, res) {
        const db = await Database()
        const roomId = req.params.room
        const questionId = req.params.question
        const action = req.params.action
        const password = req.body.password

        const verifyRoom = await db.get(`SELECT * FROM rooms WHERE id = ${roomId}`)
        // Verifica se a senha é igual
        if(verifyRoom.pass == password) {
            if(action == "delete") {
                await db.run(`DELETE FROM questions WHERE id = ${questionId}`)
            } else if (action == "check") {
                await db.run(`UPDATE questions SET read = 1 WHERE id = ${questionId}`)
            }
            res.redirect(`/room/${roomId}`)
        } else {
            res.render('pass-invalid', {roomId: roomId})
        }
    },

    // Create
    async create(req, res) {
        const db = await Database()
        // Recebe do corpo da HTML do FORM
        const question = req.body.question
        // Recebece como parametro
        const roomId = req.params.room

        await db.run(`INSERT INTO questions (
            title,
            room,
            read
        ) VALUES (
            "${question}",
            ${roomId},
            0
        )`)

        res.redirect(`/room/${roomId}`)
    }
}