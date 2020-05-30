const express = require ('express');
const router = express.Router();
//Login Page
router.get('/login', (request, response)=> response.render('loginpage'));
//Register Page
router.get('/register', (request, response)=> response.render('registerpage'));
module.exports=router;
