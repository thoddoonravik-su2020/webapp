const express = require('express')
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const Book = require('../model/Books')
const Sequelize = require('sequelize')
const db = require('../core/dbconnection')
const ObjectId = require('sequelize')
const s3 = require('../s3bucket')
const config = require('../config')
const imagesmodel = require('../model/Images')
users.use(cors())

process.env.SECRET_KEY = 'secret'
const Op = Sequelize.Op

//GET REQUEST FOR BOOKS localhost3000:/seller/books
users.get('/seller/images/:id',(req,res)=>{

  //////////////////////////////////////////
  const bookid = req.params.id;
  var imgs = [];
  const s3buck = (param, id) => {
      return s3.getObject(param).promise().then(x => {

          let img = {
              "imgid": id,
              "image": x.Body.toString('utf-8')
          }
          imgs.push(img);
      })
  }

  const resu = (results) => {
      let promises = []
      results.forEach(element => {
          let params = { Bucket: config.bucket_name, Key: element.dataValues.imagedata };
          let id = element.id;
          promises.push(s3buck(params, id));
      });
      Promise.all(promises).then(z => {
          res.json(imgs);
      })
  }
  //const imgPromise = ImageService.getImages(bookid);
  const imgResp = imagesmodel.findAll({ where :{bookid : bookid} })
  imgResp.then(resu);



  ///////////////////////////////////////////
    // const book = Book.findAll({});
    //    const result = (resp) => { res.status(200); res.json(resp)} 
    // book.then(result)
} )

//GET REQUEST FOR BOOKS
users.get('/buyer/:id',(req,res)=>{
    
  console.log(req.params.id);
  const book = Book.findAll({
    where:{
      userid : {
        [Op.not]: req.params.id
      }
    }
  });
     const result = (resp) => { res.status(200); res.json(resp)}
  book.then(result)
} )

//POST
users.post('/seller', (req, res) => {
    const today = new Date()
    // const sellerData = {
    //   id:req.body.id,
    //   userid: req.body.userid,
    //   isbn: req.body.isbn,
    //   title: req.body.title,
    //   authors: req.body.authors,
    //   publication_date: today,
    //   quantity: req.body.quantity,
    //   PRICE: req.body.PRICE,    
    // }
    // Save the book with images
    const content = Object.assign({}, req.body);
    const book =  Book.build(content);
    const isExist = Book.findOne({ where: { isbn: book.isbn, userid: book.userid } });
    const check = (isExist) => {
        if (isExist != null) {
            res.json({ message: "Book already Exist" })
        } else {
            const promise = book.save();
            const result = (register) => {
                let bookid = register.dataValues.id;
                const imagesbody = req.body.images;
                imagesbody.forEach(element => {
                    let currentTime = new Date();
                    const params = {
                        Bucket: config.bucket_name,
                        Key: currentTime.getTime().toString(),
                        Body: element
                    };
                    s3.upload(params).promise().then(x => {
                            let body = {
                                "bookid": bookid,
                                "imagedata": x.Key
                            }
                            const tosave = imagesmodel.build(body);
                            tosave.save();
                    });
                });
                res.json(register);
            };
            promise.then(result);
        }
    }

    isExist.then(check);
    //////////////////////////////////////////////////////////////////
    // if(req.body.quantity > 0 && req.body.quantity < 999)
     
    // {
    //         const result = (resp) => { res.status(200); res.json(resp)}
    //         const book = Book.build(sellerData);
    //         book.save().then(result);
    //    }
    // else
    // {
    //  console.log('quantity should be betweeon 0 & 999 and price should be between 0.1 & 9999.99');
    // }
})



//GET BOOKS
users.get('/seller/:id', (req, res) => {
    // var decoded = jwt.verify(req.headers['authorization'], process.env.SECRET_KEY)
    Book.findAll({
      where: {
        userid: req.params.id
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
   users.delete('/seller/:id', function (req, res, next) {
     console.log(req.body)
     console.log('deleting')
    // const cont = Object.assign({},req.params.body)
     //console.log(cont)
  
     //const promise =
     imagesmodel.destroy({where :{bookid: req.params.id}});
    Book.destroy({where :{id : req.params.id}});
  
   const result = (resp) => { res.status(200); res.send('this item cannot be deleted')}
    // Book.destroy();

   }
   )

   users.delete('/seller/:id', function (req, res, next) {
    console.log(req.body)
    console.log('deleting')
   // const cont = Object.assign({},req.params.body)
    //console.log(cont)
 
    //const promise =
    imagesmodel.destroy({where :{imgid: req.params.id}});
   Book.destroy({where :{id : req.params.id}});
 
  const result = (resp) => { res.status(200); res.send('this item cannot be deleted')}
   // Book.destroy();

  }
  )




module.exports = users