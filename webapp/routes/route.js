const express = require('express');
const webPageRouter = express.Router();
const app = express();
const User = require('../core/user');

//initialing the user 
const user = new User();


//for home page
app.get('/', (req,res,next)=>{
    res.render('index', {title:"Web Application"});
})

//home
webPageRouter.get('/home', (req, res, next)=> {
    res.send('This is home page !! ')
})



//for login page
app.get('/login', (req,res)=>{
    res.render('login.ejs', {name: 'Joe'})
})

//for register page
app.get('/register', (req,res)=>{
    res.render('register.ejs')
})

module.exports = webPageRouter;
