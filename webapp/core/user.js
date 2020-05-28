const connection = require('./dbconnection');
const bcrypt = require('bcrypt');

//function for the user setup
function User() {};

User.prototype = {
    //checks user is not an integer 
    find : function(user = null, callback){
        if(user){
            var field = Number.isInteger(user) ?'id':'username';

        }

        //if the user is string then returns input_fields to enter values
        let sqlQuery = `SELECT * FROM users WHERE ${field} =?`;
        connection.query(sqlQuery,user,function(err,result){
            if(err) throw console.error('error');
            callback(result);
            
        });
    },
    create: function(body, callback )
    {
        let passwd = body.password;
        body.password = bcrypt.hashSync(passwd,10);

        var usrArray = [];
        for(prop in body){
            usrArray.push(body[prop]);
        }

        let sqlQuery = `INSERT INTO users (firstname,lastname,password,email) VALUES(?,?,?,?)`;

        connection.query(sqlQuery, usrArray, function(err, lastname){
            if(err) throw console.error('error 2');
            callback(lastname);
            
        });

    },
    login : function(lastname,password,callback){
        this.find(lastname, function(user){
            if(user){
                if(bcrypt.compare(password, user.password)){
                    callback(user);
                    return;
                }
            }
            callback(null);
        });
    }
}
module.exports = User;