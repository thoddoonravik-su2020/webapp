// const express=require('express');
// const app=express();
// const users = express.Router()
// const path = require('path');
// const PORT=3200;
// const AWS = require('aws-sdk');
// const IMAGE = require('../model/Cart')


// // const AWS_ACCESS_KEY='AKIAIX45E43NMFL2IWNA';
// // const AWS_SECRET_KEY='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';



// //GET IMAGE from s3
// // Our default route
// users.get('/image',(req,res)=>{
//     console.log('hello')
//     AWS.config.update({
//         accessKeyId: "AWS_ACCESS_KEY",
//         secretAccessKey: "AWS_SECRET_KEY"
//       });
// let s3 = new AWS.S3();
// async function getImage(){
//     const params =  s3.getObject(
//       {
//           Bucket: 'webapp.keerthana.tr',
//           Key: 'file.name'
//         }
      
//     ).promise();
//     return params;
//   } 
//   getImage()
//  .then((img)=>{
//   let image="<img src='data:image/jpeg;base64," + encode(img.Body) + "'" + "/>";
//   let startHTML="<html><body></body>";
//   let endHTML="</body></html>";
//   let html=startHTML + image + endHTML;
//   res.send(html)
//   }).catch((e)=>{
//         res.send(e)
//   })
//   function encode(data){
//     let buf = Buffer.from(data);
//     let base64 = buf.toString('base64');
//     return base64
//     }
//     })
    