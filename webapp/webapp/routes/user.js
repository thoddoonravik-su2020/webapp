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



const AWS_ACCESS_KEY='AKIAIGDF6D3Z32EAFIVA';
const AWS_SECRET_KEY='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';
//GET IMAGE from s3
// Our default route
users.get('/image',(req,res)=>{
  console.log('hello')
  AWS.config.update({
      accessKeyId: 'AKIAIGDF6D3Z32EAFIVA',
      secretAccessKey: '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'
    });
let s3 = new AWS.S3();
async function getImage(){
  const params =  s3.getObject(
    {
        Bucket: 'webapp.keerthana.ravi',
        Key: 'myImage1'
      }
    
  ).promise();
  return params;
} 
getImage()
.then((img)=>{
let image="<img src='data:image/jpeg;base64," + encode(img.Body) + "'" + "/>";
let startHTML="<html><body></body>";
let endHTML="</body></html>";
let html=startHTML + image + endHTML;
res.send(html)
}).catch((e)=>{
      res.send(e)
})
function encode(data){
  let buf = Buffer.from(data);
  let base64 = buf.toString('base64');
  return base64
  }
  })
  

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
        const hash = bcrypt.hashSync(userData.password, 10)
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



// //POST
// users.put('/profile', (req, res) => {
//   const today = new Date()
//   const userData = {
//     firstname: req.body.firstname,
//     lastname: req.body.lastname,
//     email: req.body.email,
//     password: req.body.password,
//     created: today
//   }
  
 //UPDATE USERS
users.put('/profile/:id', (req, res) =>{

  const cont = Object.assign({},req.body);
  console.log(cont);
  const hash = bcrypt.hashSync(cont.password, 10)
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
      if (bcrypt.compareSync(req.body.password, user.password)) {
        
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
