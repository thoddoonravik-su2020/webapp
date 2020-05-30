const express = require ('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../model/User');
//Login Page
router.get('/login', (request, response)=> response.render('loginpage'));
//Register Page
 router.get('/register', (request, response)=> response.render('registerpage'));
const cors = require('cors')
const jwt = require('jsonwebtoken')

router.use(cors())

process.env.SECRET_KEY = 'secret'

router.post('/register', (req, res) => {
  const today = new Date()
  const userData = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,  
  }

  User.findOne({
    where: {
      email: req.body.email
    }
  })
   // TODO bcrypt
    .then(user => {
       if (!user) {
         const newUser = new User({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          password: req.body.password,  
         });
       bcrypt.genSalt(10, (err, salt)=> bcrypt.hash(newUser.password, salt, (err, hash)=>
       {
         if(err) throw err;
         newUser.password = hash;
         newUser.save()
         .then(user => {
           res.redirect('/user/login')
         })
         .catch(err => console.log('oops something went wrong'))
       }))


       } else {
        res.json({ error: 'User already exists' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

module.exports=router;
