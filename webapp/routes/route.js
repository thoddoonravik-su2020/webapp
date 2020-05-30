const express = require ('express');
const router = express.Router();

//any views routed to
router.get('/', (request, response)=> response.render('welcomepage'));
module.exports=router;