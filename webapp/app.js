const express = require('express');
const path = require('path');
const app = express();
//const expressLayouts = require('express-ejs-layouts');

//body parser
app.use(express.urlencoded({extended:false}));

//static assests
app.use(express.static(path.join(__dirname,'assets')));

//views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


//for home page
app.get('/', (req,res)=>{
    res.render('index');
})

//for login page
app.get('/login', (req,res)=>{
    res.render('login.ejs', {name: 'Joe'})
})

//for register page
app.get('/register', (req,res)=>{
    res.render('register.ejs')
})


const PORT = process.env.PORT || 3000;
//port setting for server
app.listen(3000, ()=> {
    console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;
