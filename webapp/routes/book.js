const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const Book = require('../model/Books')
const Sequelize = require('sequelize')
const db = require('../core/dbconnection')
const ObjectId = require('sequelize')

users.use(cors())

process.env.SECRET_KEY = 'secret'

//GET REQUEST FOR BOOKS localhost3000:/seller/books
users.get('/seller',(req,res)=>{
    
    const book = Book.findAll();
       const result = (resp) => { res.status(200); res.json(resp)}
    book.then(result)
} )

//POST
users.post('/seller', (req, res) => {
    const today = new Date()
    const sellerData = {
      id:req.body.id,
      userid: req.body.userid,
      isbn: req.body.isbn,
      title: req.body.title,
      authors: req.body.authors,
      publication_date: today,
      quantity: req.body.quantity,
      PRICE: req.body.PRICE,    
    }
    console.log(sellerData)
    if(req.body.quantity > 0 && req.body.quantity < 999)
     
    {
            const result = (resp) => { res.status(200); res.json(resp)}
            const book = Book.build(sellerData);
            book.save().then(result);
       }
    else
    {
     console.log('quantity should be betweeon 0 & 999 and price should be between 0.1 & 9999.99');
    }
    // const result = (resp) => { res.status(200); res.json(resp)}
    // book.then (result)
})



//GET PROFILE 
users.get('/seller/:id', (req, res) => {
    // var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
    Book.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(book => {
        if (book) {
          res.json(book)
        } else {
          res.send('User does not exist')
        }
      })
      .catch(err => {
        res.send('error: ' + err)
      })
  })



//UPDATE BOOKS
users.put('/seller/:id', function (req, res, next) {
    const cont = Object.assign({},req.body)
        // Book.update(cont, {where :{id : cont.id}});
    const promise =Book.update(cont, {where :{id : cont.id}});
    const result = (resp) => { res.status(200); res.json(resp)}
     promise.then(result)
 
   })

    //  //DELETE BOOKS
   users.delete('http://localhost:3000/books/seller/:id', function (req, res, next) {
     console.log('deleting')
     debugger
    Book.destroy();
   }
   )


module.exports = users