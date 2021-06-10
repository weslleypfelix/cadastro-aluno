//chamando os modulos que irei usar

const express = require('express')
const consign = require('consign')
const app = express()

// a partir do objeto app, irei controlar a forma
//de comunicação com o postman

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// como o padrão é o MVC, irei fazer uso do consign
// chamando todos as partes 

consign().include('models').then('controllers').then('routes').into(app)

// Depois, vamos usar o atributo listen, que é para usar
// uma porta específica a partir do express

app.listen(3000, () => console.log('Servidor rodando na porta 3000...'))



