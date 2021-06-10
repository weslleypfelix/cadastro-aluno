const mongoose = require('mongoose')

module.exports = (app) => {

    const AlunoController = {

        /* Nesta constante ficarão API's que usaremos. Cada função dessa será uma API.  */

        cadastrar (request, response) {

            const Aluno = app.models.aluno
            const aluno = new Aluno(request.body)

            mongoose.connect(
                'mongodb://localhost:27017/usuarios',
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useCreateIndex: true
                }
            ).then(
                (resultado) => {
                    console.log('Conexão com o mongodb realizada!')

                    const resultadoCreate = Aluno.create(aluno)
                    .then((resultado) =>{
                        console.log(`resultado do then: ${resultado} | constructor: ${resultado.constructor.name}`)
                        console.log(resultado)
                        console.log(`${aluno.nomeCompleto} cujo R.A é ${aluno.ra}, foi cadastrado com sucesso.`)
                        mongoose.disconnect()
                        response.status(200).send(resultado)
                    })
                    .catch((erro) => {
                        console.log(`erro do create: ${erro} | constructor: ${erro.constructor.name}`)
                        console.log(erro)
                        console.log(`Erro ao cadastrar o aluno: ${erro}`)
                        mongoose.disconnect()   
                        response.status(500).send(`Erro ao cadastrar o aluno: ${erro}`)
                    })


                }
            ).catch(
                (erro) => {
                    console.log(`erro do connection: ${erro} | constructor: ${erro.constructor.name}`);
                    console.log(erro);
                    console.log(`Erro ao conectar no banco MongoDB: ${erro}`);
                    response.status(500).send(`Erro ao conectar no banco MongoDB: ${erro}`);     
                }
            )


        },
        alterar(request, response) {
            //informando que a rota alterar foi chamada
            console.log("Rota PUT/ ALTERAR aluno chamada")
            console.log(`${request.body}`)
            console.log(request.body)

            //carrego aqui as informações que vem do models aluno..
            const Aluno = app.models.aluno
            //conecto ao banco
            mongoose.connect(
                'mongodb://localhost:27017/usuarios',
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useCreateIndex: true
                }
            ).then(() => {
                Aluno.updateOne(
                    //objeto com criterio de busca do documento
                    {ra: request.body.ra},
                    // objetos que sofrerão atualização
                    {
                        $set: {
                            turno: request.body.turno,
                            ano: request.body.ano
                        }
                    }
                )
                .then((resultado) => {
                    console.log(`resultado do UpdateOne:`)
                    console.log(resultado)

                    if (resultado.nModified > 0) {
                        mongoose.disconnect()
                        response.status(200).send(`Informações de turno e ano alterado com sucesso`)
                    }else {
                        mongoose.disconnect()
                        response.status(404).send('Aluno não alterado no banco de dados..')
                    }


                })
                .catch((erro) => {
                    console.log(`Erro ao alterar os registros do aluno: ${erro}`)
                    console.log(erro)
                    mongoose.disconnect()
                    response.status(500).send(`Erro ao alterar o Aluno: ${erro}`)
                })
            })
            .catch((erro) => {
                console.log(`erro do connection: ${erro} | constructor: ${erro.constructor.name}`);
                console.log(erro);
                console.log(`Erro ao conectar no banco MongoDB: ${erro}`);
                response.status(500).send(`Erro ao conectar no banco MongoDB: ${erro}`);
            
            })

        },
        
        excluir(request, response) {
            console.log('Rota DELETE /rastreador chamada...')
            console.log('request.params:')
            console.log(request.params) // oque ta na url

            mongoose.connect(
                'mongodb://localhost:27017/usuarios',
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useCreateIndex: true
                }
            )
            .then(() => {
                const Aluno = app.models.aluno
                Aluno.deleteOne(
                    { ra: request.params.ra }
                )
                .then((resultadoDeleteAluno) => {
                    console.log(`resultadoDeleteAluno :`)
                    console.log(resultadoDeleteAluno)
                    mongoose.disconnect()
                    if(resultadoDeleteAluno.deletedCount > 0){
                        response.status(200).send(`Foi excluido ${resultadoDeleteAluno.deletedCount} documentos`)
                    }else {
                        response.status(404).send("Aluno não foi localizado")
                    }
                })
                .catch((erro) => {
                    console.log(`Erro ao excluir o documento do Rastreador: ${erro}`)
                    console.log(erro)
                    mongoose.disconnect()
                    response.status(500).send(`Erro ao excluir o documento do rastreador: ${erro}`)
                })
            }).catch((erro) => {
                console.log("Erro ao conectar no mongo")
                console.log(erro)
                response.status(500).send('Erro ao conectar no mongoo')
            })
            
        }

    }
    return AlunoController

}