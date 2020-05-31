const express = require ('express');
const users = express.Router();

//any views routed to
usesrs.get('/', (request, response)=> response.render('welcomepage'));

//Homepage
users.get('/homepage', (req, res)=> res.render('homepage'));

module.exports=users;