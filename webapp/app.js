var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()
var port = process.env.PORT || 3000


app.use(bodyParser.json())
app.use(cors({origin: 'http://localhost:4200'}));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)

var Users = require('./routes/user.js')
var Book = require('./routes/book.js')



app.use('/users', Users)
app.use('/books', Book)

app.listen(port, function() {
  console.log('Server is running on port: ' + port)
})

module.exports = app;
