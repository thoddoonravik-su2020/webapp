const AWS = require('aws-sdk');

// const ID = process.env.accessKeyId;
// const SECRET = process.env.secretAccessKey;



const ID = 'AKIAIX45E43NMFL2IWNA';
const SECRET = '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';

const s3 = new AWS.S3({
    
    accessKeyId: ID,
    secretAccessKey: SECRET
});

<<<<<<< HEAD

=======
>>>>>>> 37cd653c4446ad2203ad93807406807ca3efa6ba
module.exports = s3;