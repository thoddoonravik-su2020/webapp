const express = require('express');
const path = require('path');
const app = express();
const router = require('./routes/route');
//const expressLayouts = require('express-ejs-layouts');

//body parser
app.use(express.urlencoded({extended:false}));

app.use('/', router);

//static assests
app.use(express.static(path.join(__dirname,'assets')));

//views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//for redirecting errors
app.use((req, res, next)=>{
    const err = new Error('Page cannot be found !!');
    err.status =404;
    next(err);
})

//to handle errors
app.use((req,res)=> {
    res.status(err.status || 500);
    res.send(err.message);
})

const PORT = process.env.PORT || 3000;
//port setting for server
app.listen(3000, ()=> {
    console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;
