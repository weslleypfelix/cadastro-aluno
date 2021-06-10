const { response } = require("express")
const { request } = require("http")

module.exports = (app) => {


    app.get(
        '/',
        (request, response) => {
            console.log('Rota principal chamada!! Yahuuuuu....')
            response.status(200).send('Acessado com sucesso')
        }
    )

    app.post('/cadastrar', app.controllers.aluno.cadastrar);

    app.put('/alterar', app.controllers.aluno.alterar)

    app.delete('/deletar/:ra',app.controllers.aluno.excluir   )




}