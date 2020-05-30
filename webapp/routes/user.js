const express = require ('express');
const router = express.Router();
//Login Page
router.get('/login', (request, response)=> response.send('Login'));
//Register Page
router.get('/register', (request, response)=> response.send('Register'));
module.exports=router;