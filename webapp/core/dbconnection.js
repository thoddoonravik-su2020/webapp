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
 if(err)
 console.log("Cannot connect to the database !!");
 if(connection)
 connection.release();
return;   
 });

 pool.query=util.promisify(pool.query);
 module.exports = pool;