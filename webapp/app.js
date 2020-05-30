const express = require ('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const passport = require('passport');
require('./core/passport')(passport);


// for EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// for Body parser
app.use(express.urlencoded({extended: false}));

//for passport login authentication - middleware
app.use(passport.Initialize());
app.use(passport.session());


//for route
app.use('/', require('./routes/route'));
app.use('/user', require('./routes/user'));

//PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server listening on ${PORT}`));

// sudo netstat -plunt |grep :3000
//kill -9 processnuber