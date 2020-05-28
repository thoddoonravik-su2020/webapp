const express = require('express');
const User = require('../core/user');
const router = express.Router();
//const app = express();
bodyParser = require('body-parser');


//initialing the user 
 const user = new User();


//for home page
router.get('/', (req,res,next)=>{
    res.render('index', {title:"Web Application"});
})

//home
router.get('/home', (req, res, next)=> {
    res.send('This is home page !! ')
})

//post registration
router.post('/register',(req,res,next)=>{
    let userDetails = {     
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password:req.body.password    
    };
    user.create(userDetails, function(lastId){
        if(lastId){
            res.send('You have logged in as '+ req.body.lastname);

        }
        else
        {
            console.log('Cannot register !!')
        }
    })
});




//for post login
router.post('/login', (req, res, next)=>{
    user.login(req.body.email, req.body.password, function(result){
        if(result){
            res.send('You have logged in with your email id  '+ req.body.email)
        }
        else
        {
            res.send('Incorrect credentials');
        }
    })
});

module.exports = router;
