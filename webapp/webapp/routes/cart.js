const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const Book = require('../model/Books')
const Sequelize = require('sequelize')
const db = require('../core/dbconnection')
const ObjectId = require('sequelize')
const Cart = require('../model/Cart')
const User = require('../model/User')
var customlogger = require('./../customlogger')
users.use(cors())


process.env.SECRET_KEY = 'secret'

users.post('/cart/:id', (req,res) => {
  console.log('backend cart')
    const today = new Date()
    const cartItems = {
      bookid:req.body.bookid,
      userid: req.body.userid,
      quantity: req.body.quantity,
      title: req.body.title,
      PRICE: req.body.PRICE
    }
    console.log(cartItems)      
    {
    const result = (resp) => { res.status(200); res.json(resp)}
    const cart = Cart.build(cartItems);
    cart.save().then(result);
       }
    })

//Update cart quantity
users.put('/cart/:id',(req,res) =>{
  customlogger.info("cart updated")
  const cont = Object.assign({},req.body)
  const result = (response) =>{
    res.status(200);
    res.json(response);
  }
  const promise =Cart.update(cont, {where :{id : cont.id}});
  promise.then(result)
})

// Delete cart
users.delete('/cart/:id',(req,res) =>{
  customlogger.info("book deleted")
  const result = (response) =>{
    res.status(200);
    res.json(response)
  }
  const promise = Cart.destroy({where :{id: req.params.id}});
  promise.then(result)
})

// Get cart details
    users.get('/cart/:id',(req,res)=>{ 
      customlogger.info("book added to cart")
      console.log('/cart get findall')    
      const cart = Cart.findAll({
        where:{
          userid: req.params.id
        },
        order:[
            ['id','ASC']
        ]
      });
         const result = (resp) => { res.status(200); res.json(resp)}
      cart.then(result)
    } )
  
//Get cart for given Book ID and User ID
users.get('/cart/check/:userid/:bookid',(req,res) =>{
  const result = (response) =>{
    res.status(200)
    res.json(response);
  };
  console.log(req.params.userid)
  console.log(req.params.bookid)
  const promise = Cart.findAll({ where :{ bookid: req.params.bookid, userid: req.params.userid}})
  promise.then(result)
})
    

module.exports = users;