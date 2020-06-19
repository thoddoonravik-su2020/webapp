const AWS = require('aws-sdk');

const ID = 'AKIAIGDF6D3Z32EAFIVA';
const SECRET = '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';

const s3 = new AWS.S3({
    
    accessKeyId: ID,
    secretAccessKey: SECRET
});

module.exports = s3;