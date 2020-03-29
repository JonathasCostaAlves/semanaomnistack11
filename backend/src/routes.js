const express = require('express');
const { celebrate , Segments, Joi} = require('celebrate');

const OngController = require('./controllers/OngController');
const IncidentCotroller = require('./controllers/IncidentCotroller');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');


const routes = express.Router();
// Rota para login

routes.post('/session',SessionController.create ); // voltar para fazer validação

//Rotas para inclusão e inclusão de ongs

routes.get('/ongs', OngController.index);

routes.post('/ongs', celebrate({

    [Segments.BODY]: Joi.object().keys({
        name : Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
      })

}) ,OngController.create);

// Rotas para filtro de casos e ongs

routes.get('/profile', celebrate({
   
    [Segments.HEADERS] : Joi.object({
        authorization :Joi.string().required(),
    }).unknown(),
 
}), ProfileController.index);

// Rotas para controle de casos ou incidentes

routes.get('/incidents', celebrate({
    [ Segments.QUERY] : Joi.object().keys({
        page : Joi.number(),
    })
}),IncidentCotroller.index );

routes.post('/incidents', celebrate({
    [Segments.HEADERS] : Joi.object({
        authorization :Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
        title : Joi.string().required(),
        description: Joi.string().required(),
        value: Joi.number().required(),
       
      }),

})
,IncidentCotroller.create );

routes.delete('/incidents/:id', celebrate({
   [Segments.PARAMS] : Joi.object().keys({
       id: Joi.number().required(),
   })
}),IncidentCotroller.delete );

module.exports = routes;
