// Importando o banco de dados
const Database = require('../db/config')

module.exports = {
    // Create
    async create(req, res) {
        const db = await Database()
        const pass = req.body.password
        let roomId
        let isRoom = true
        
        while(isRoom) {
            // Gera o ID da sala
            for(var i = 0; i < 6; i++) {
                i == 0 ? roomId = Math.floor(Math.random() * 10).toString() : 
                roomId += Math.floor(Math.random() * 10).toString()
            }

            // Verifica na tabela se o ID já existe
            const roomsExistIds = await db.all(`SELECT id FROM rooms`)
            // isRoom compara se o novo ID gerado é igual aos IDs salvos na tabela
            isRoom = roomsExistIds.some(roomsExistIds => roomsExistIds === roomId)

            // Só entra no IF se os códigos não forem iguais, pois o IF ! nega o isRoom
            // IF ! = false
            if(!isRoom) {
                // Insere o registro no banco
                await db.run(`INSERT INTO rooms (
                    id,
                    pass
                ) VALUES (
                    ${parseInt(roomId)},
                    ${pass}
                )`)
            }
        }
        
        await db.close()

        res.redirect(`/room/${roomId}`)
    },

    // Open
    async open(req, res) {
        const db = await Database()

        // roomID recebe o parametro room da URL do navegador
        const roomId = req.params.room

        // Busca as perguntas no banco com o mesmo ID da sala e com o campo read = 0
        const questions = await db.all(`SELECT * FROM questions WHERE room = ${roomId} AND read = 0`)
        
        // Busca as perguntas no banco com o mesmo ID da sala e com o campo read = 1
        const questionsRead = await db.all(`SELECT * FROM questions WHERE room = ${roomId} AND read = 1`)

        let isNoQuestions
        // Verifica se existe perguntas
        if(questions.length == 0) {
            if(questionsRead.length == 0) {
                isNoQuestions = true
            }
        }

        // Renderiza a view room
        res.render("room", {roomId: roomId, questions: questions, questionsRead: questionsRead, isNoQuestions: isNoQuestions})
    },

    enter(req, res) {
        const roomId = req.body.roomId

        res.redirect(`/room/${roomId}`)
    }
}