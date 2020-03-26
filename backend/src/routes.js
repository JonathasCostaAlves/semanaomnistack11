const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentCotroller = require('./controllers/IncidentCotroller');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');


const routes = express.Router();
// Rota para login

routes.post('/session',SessionController.create );

//Rotas para inclusão e xclusão de ongs

routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

// Rotas para filtro de casos e ongs

routes.get('/profile', ProfileController.index);

// Rotas para controle de casos ou incidentes

routes.get('/incidents', IncidentCotroller.index );
routes.post('/incidents', IncidentCotroller.create );
routes.delete('/incidents/:id', IncidentCotroller.delete );

module.exports = routes;
