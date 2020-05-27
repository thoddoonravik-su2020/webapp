
const util = require('util');
const mysql = require('mysql');

 const connection = mysql.createConnection({
   
   host     : 'localhost',
   user     : 'root',
   password : 'Jokish@8588',
   database : 'userdb'
 });
 var app = express();
 
 connection.connect(function(err){
 if(!err) {
     console.log("Database connection established");  
 } else {
     console.log("Error connecting to the database");  
 }
 });app.listen(3000);
 connection.query=util.promisify(connection,query);
 module.exports = connection;