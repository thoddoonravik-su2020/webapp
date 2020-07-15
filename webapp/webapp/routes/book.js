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
const statsd = require('../statsd')
var customlogger = require('../customlogger')
users.use(cors())

process.env.SECRET_KEY = 'secret'
const Op = Sequelize.Op

//GET REQUEST FOR BOOKS localhost3000:/seller/books
users.get('/seller/images/:id',(req,res)=>{
  customlogger.info("view book")
 
  const bookid = req.params.id;

  statsd.increment('viewed book id' + bookid);

  var imgs = [];
  const s3buckOp = (param, id) => {
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
          promises.push(s3buckOp(params, id));
      });
      Promise.all(promises).then(z => {
          res.json(imgs);
      })
  }

  const imgResp = imagesmodel.findAll({ where :{bookid : bookid} })
  imgResp.then(resu);

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



// Obtain Book details using Book ID
users.get('/:id',(req,res) =>{
  const result = (response) =>{
    res.status(200);
    res.json(response);
  }
  const book = Book.findOne({where: { ID: req.params.id}})
  book.then(result)
})

//POST
users.post('/seller', (req, res) => {
  
    const today = new Date()
    
    // Save the book with images
    const content = Object.assign({}, req.body);
    const book =  Book.build(content);
    const isExist = Book.findOne({ where: { isbn: book.isbn, userid: book.userid } });
    const check = (isExist) => {
        if (isExist != null) {
            res.json({ message: "Book already Exist" })
        } else {
          var pre_addbook_query = new Date().getTime();
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
                    var pre_s3_query = new Date().getTime();
                    s3.upload(params).promise().then(x => {
                      var post_s3_query = new Date().getTime();
                      var duration = (post_s3_query - pre_s3_query) / 1000;
                      statsd.timing("sql_s3_add", duration);

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
            promise.then(result)

            promise.then(x=>{
            var post_addbook_query = new Date().getTime();

              var duration = (post_addbook_query - pre_addbook_query ) / 1000;
              statsd.timing("sql_addbook_update", duration);
             })
        }
    }

    isExist.then(check);
    
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

    var pre_updt_query = new Date().getTime();
    const promise =Book.update(cont, {where :{id : cont.id}});
    const result1 = (register) => {
      let bookid = cont.id;
      console.log(bookid)
      const imagesbody = req.body.images;
      imagesbody.forEach(element => {
          let currentTime = new Date();
          const params = {
              Bucket: config.bucket_name,
              Key: currentTime.getTime().toString(),
              Body: element
          };
          var pre_s3_query = new Date().getTime();
          s3.upload(params).promise().then(x => {
            var post_s3_query = new Date().getTime();
            var duration = (post_s3_query - pre_s3_query) / 1000;
            statsd.timing("sql_s3_add", duration);


                  let body = {
                      "bookid": bookid,
                      "imagedata": x.Key
                  }
                  const tosave = imagesmodel.build(body);
                  var pre_img_query = new Date().getTime();
                  tosave.save().then(r=>{
                    var post_img_query = new Date().getTime();
                    var duration = (post_img_query - pre_img_query) / 1000;
                    statsd.timing("sql_img_update", duration);
                  });
          });
      })
      res.status(200);
      res.json(register);
  };
     promise.then(x=>{
      var post_updt_query = new Date().getTime();
      var duration = (post_updt_query - pre_updt_query) / 1000;
      statsd.timing("sql_book_update", duration);
     }).then(result1)
 
   })




      //DELETE BOOKS
    users.delete('/seller/:id', function (req, res, next) {
      console.log(req.body)
      console.log('deleting')
      console.log(req.params.id)
 
       //send response back
     const response = (result) =>{
       console.log('inside response')
       res.status(200);
       res.json(result);
     };



      // delete the book
    const bookDel = (resp) =>{
      var pre_bookdelete_query = new Date().getTime();
      const r = Book.destroy({where :{id : req.params.id}});
      r.then(x=>{
        var post_bookdelete_query = new Date().getTime();
        var duration = (post_bookdelete_query - pre_bookdelete_query) / 1000;
        statsd.timing("sql_book_delete", duration);
       }).then(response)
    };






    // Delete the images from s3 bucket
    const s3buckOp = (param,id) => {
      return s3.deleteObject(param).promise().then(x => {
        console.log(x);
        imagesmodel.destroy({where :{ id: id}})
      }).catch(err => {
        res.send('error: ' + err)
      });      
  }

    //delete all images
  const imgDelete = (results) => {
      let promises = []
      results.forEach(element => {
          let params = { Bucket: config.bucket_name, Key: element.dataValues.imagedata };
          let id = element.dataValues.id;
          promises.push(s3buckOp(params,id));
      });
      Promise.all(promises).then(bookDel)
  }
    //get all images for the book
  const imgResp = imagesmodel.findAll({ where :{bookid : req.params.id} })
  imgResp.then(imgDelete);

   })

   // Delete Image
   users.delete('/seller/image/:id', function(req,res){
    const imgId = req.params.id;

     const images3Id = imagesmodel.findOne({where : {id : imgId}})
     const result = (imgData) => {if(images3Id){
       console.log(imgData.dataValues.imagedata)
       const params = {
        Bucket: config.bucket_name,
        Key: imgData.dataValues.imagedata
        };

        s3.deleteObject(params).promise().then(x => {
          console.log(x);
          imagesmodel.destroy({where :{ id: imgId}})
        }).catch(err => {
          res.send('error: ' + err)
        });

        res.status(200);
        res.json('deleted')
     };
    }
    images3Id.then(result);
   })

module.exports = users
