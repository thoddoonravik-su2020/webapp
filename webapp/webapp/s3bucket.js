const AWS = require('aws-sdk');

const ID = process.env.accessKeyId;
const SECRET = process.env.secretAccessKey;




const s3 = new AWS.S3({
    
    accessKeyId: ID,
    secretAccessKey: SECRET
});

module.exports = s3;