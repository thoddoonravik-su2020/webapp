const express = require ('express');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const app = express();
//require('./core/passport')(passport);



// for EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// for Body parser
app.use(express.urlencoded({extended: false}));

app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true
}));

//Middle ware for Passport
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());

//Global
app.use((req, res, next)=>{
    res.locals.success_msg = req.flash('sucess_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error_msg = req.flash('error');
    next();
});



//for route
app.use('/', require('./routes/route'));
app.use('/user', require('./routes/user'));

//PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server listening on ${PORT}`));

// sudo netstat -plunt |grep :3000
//kill -9 processnuber