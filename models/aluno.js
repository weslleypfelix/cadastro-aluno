//configuração do mongo 

const mongoose = require('mongoose')

module.exports = (app) => {

    //Definindo os Schemas da classe de mongoose

    const Schema = mongoose.Schema

    const alunoSchema = Schema(
        //Definindo a estrutura da coleção
        {
            ra: {type: String, required: true, index: { unique: true }},
            nomeCompleto: { type: String, required: true },
            rg: { type: String, required: true },
            ano : { type: String, required: true },
            turno: { type: String, required: true },
            dtNascimento: { type: String, required: true }
        }
    )

    const Aluno = mongoose.model('alunos', alunoSchema)
    return Aluno

}