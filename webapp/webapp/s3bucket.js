const AWS = require('aws-sdk');

const ID = process.env.accessKeyId;
const SECRET = process.env.secretAccessKey;

const s3 = new AWS.S3({
    
    accessKeyId: ID,
    secretAccessKey: SECRET
});


<<<<<<< HEAD
// const s3 = new AWS.S3();
//bucket
=======
>>>>>>> bb8f1f376d760811d68d39bb19ac269202406bc1
module.exports = s3;