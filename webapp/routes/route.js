const express = require ('express');
const router = express.Router();

//any views routed to
router.get('/', (request, response)=> response.render('welcomepage'));

//Homepage
router.get('/homepage', (req, res)=> res.render('homepage'));

module.exports=router;