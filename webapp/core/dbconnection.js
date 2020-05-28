const express = require('express');
const util = require('util');
const mysql = require('mysql');

 const pool = mysql.createPool({
   connectionLimit: 10,   
   host     : 'localhost',
   user     : 'root',
   password : '12345',
   database : 'userdb'
 });
 var app = express();
 
 pool.getConnection((err,connection)=>{
 if(connection) {
   connection.release();
 }
 if(err){
  console.log("Error connecting to the database");  
}
return;   
 });

 pool.query=util.promisify(pool.query);
 module.exports = pool;