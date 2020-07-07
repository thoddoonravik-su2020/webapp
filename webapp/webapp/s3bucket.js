const AWS = require('aws-sdk');

const ID = 'AKIAIX45E43NMFL2IWNA';
const SECRET = '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';

const s3 = new AWS.S3({
    
    accessKeyId: ID,
    secretAccessKey: SECRET
});


// const s3 = new AWS.S3();
module.exports = s3;