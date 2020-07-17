const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const User = require('../model/User')
const AWS = require('aws-sdk');
const path = require('path');
const IMAGE = require('../model/Cart')

users.use(cors())

process.env.SECRET_KEY = 'secret'


//POST
users.post('/register', (req, res) => {
  const today = new Date()
  const userData = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    created: today
  }
  console.log(userData);
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    //TODO bcrypt
    .then(user => {
      if (!user) {
        let buff = new Buffer(userData.password, 'base64');

        let text = buff.toString('ascii');
        console.log(text)
        const hash = bcrypt.hashSync(text, 10)
        userData.password = hash
        User.create(userData)
          .then(user => {
            let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
              expiresIn: 1440
            })
            res.json({ token: token })
          })
          .catch(err => {
            res.send('error: ' + err)
          })
      } else {
        res.json({ error: 'User exists' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})



  
 //UPDATE USERS
users.put('/profile/:id', (req, res) =>{

  const cont = Object.assign({},req.body);
  console.log(cont);
  let buff = new Buffer(cont.password, 'base64');

  let text = buff.toString('ascii');
  console.log(text)
  const hash = bcrypt.hashSync(text, 10)
  cont.password = hash
  console.log(cont);
  console.log('into put method')
  const promise =User.update(cont, {where :{id : req.params.id}});
  const result = (resp) => { res.status(200); res.json(resp)}
   promise.then(result)

 })


//POST LOGIN
users.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
         }
  })
    .then(user => {
      let buff = new Buffer(req.body.password, 'base64');

      let text = buff.toString('ascii');
      console.log(text)
  
      if (bcrypt.compareSync(text, user.password)) {
        
        let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, {
          expiresIn: 1440
        })
        res.json({ token: token })
      } else {
        res.send('User does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})


//GET PROFILE 
users.get('/profile', (req, res) => {
  var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)

  User.findOne({
    where: {
      id: decoded.id
    }
  })
    .then(user => {
      if (user) {
        res.json(user)
      } else {
        res.send('User does not exist')
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

//{{ details?.firstname }}


module.exports = users
