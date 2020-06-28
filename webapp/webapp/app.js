var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()
const path = require('path');
var port = process.env.PORT || 3000

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use(bodyParser.json({limit: '10000kb'}))
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)
//main file
var Users = require('./routes/user.js')
var Book = require('./routes/book.js')
var Cart = require('./routes/cart')
var s3 = require('./s3bucket.js') 
// var Images = require('./routes/image.js')


app.use('/users', Users)
app.use('/books', Book)
app.use('/buyer', Cart)
// app.use('/images', Images)


app.listen(port, function() {
  console.log('Server is running on port: ' + port)
})

module.exports = app;
