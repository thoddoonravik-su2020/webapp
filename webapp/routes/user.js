const express = require ('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../model/User');
//Login Page
router.get('/login', (request, response)=> response.render('loginpage'));
//Register Page
router.get('/register', (request, response)=> response.render('registerpage'));
//Post Register
router.post('/register', (req, res)=>{
   const {firstname, lastname, email, password, password2} = req.body;
   let errors =[];
   //Password mismatch
   if(password !== password2){
       errors.push({msg: 'Entered passwords do not match !!'})
   }

   if(firstname == lastname){
       errors.push({msg: 'Please enter a valid firstname and lastname'})
   }
   if(password.length < 8){
       errors.push({msg: 'passwords cannot be less than 8 characters'})
   }
   if(errors.length > 0){
    
    res.render('registerpage', {
        errors, firstname, lastname, email
    })}
   else
   {
    //res.send('pass');
    //Authentication & Validation passed
    User.findOne({email:email})
    .then(user => {
        if(user){
            errors.push({msg : 'User already exists !!'})
            res.render('registerpage');
        }
        else
        {
            const newUser = new User({
            });

            console.log(newUser);
            res.send('Hello')

        }
    })
     
   }
});

module.exports=router;
