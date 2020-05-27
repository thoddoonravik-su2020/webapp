const express = require('express');
const router = express.Router();


//for home page
app.get('/', (req,res)=>{
    res.render('index.ejs')
})

//for login page
app.get('/login', (req,res)=>{
    res.render('login.ejs', {name: 'Joe'})
})

//for register page
app.get('/register', (req,res)=>{
    res.render('register.ejs')
})
