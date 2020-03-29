const express = require('express'); //Importando o express para dentro da aplicação 
const cors = require('cors'); // modulo de segurança

const  { errors } = require('celebrate')
const routes = require('./routes')
const app = express(); // Iniciando o app

app.use(cors());
app.use(express.json()); // dependencia do express para que o app converter json em algo que se possa entender
app.use(routes);
app.use(errors());

module.exports = app; // O app ouve a porta 