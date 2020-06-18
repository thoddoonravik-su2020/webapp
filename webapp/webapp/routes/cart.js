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
users.use(cors())


process.env.SECRET_KEY = 'secret'

users.post('/cart/:id', (req,res) => {
  console.log('backend cart')
    const today = new Date()
    const cartItems = {
      bookid:req.body.bookid,
      userid: req.body.userid,
      quantity: req.body.quantity,
    }
    console.log(cartItems)      
    {
    const result = (resp) => { res.status(200); res.json(resp)}
    const cart = Cart.build(cartItems);
    cart.save().then(result);
       }
    })



    users.get('/cart/:id',(req,res)=>{ 
      console.log('/cart get findall')    
      const cart = Cart.findAll({
        where:{
          userid: req.params.id
        }
      });
         const result = (resp) => { res.status(200); res.json(resp)}
      cart.then(result)
    } )
    

module.exports = users;