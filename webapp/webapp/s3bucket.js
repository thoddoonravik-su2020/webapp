const AWS = require('aws-sdk');

const ID = process.env.accessKeyId;
const SECRET = process.env.secretAccessKey;
<<<<<<< HEAD


=======
>>>>>>> 820ded08ad3a9b8ee6096658621e08f256d32c1b

const s3 = new AWS.S3({
    
    accessKeyId: ID,
    secretAccessKey: SECRET
});

<<<<<<< HEAD

=======
>>>>>>> 820ded08ad3a9b8ee6096658621e08f256d32c1b
module.exports = s3;