const pool = require('./dbconnection');
const bcrypt = require('bcrypt');

//function for the user setup
function User() {};

User.prototype = {
    //checks user is not an integer 
    find : function(user = null, callback){
        if(user){
            var field = Number.isInteger(user) ?'id':'firstname';

        }

        //if the user is string then returns input_fields to enter values
        let sqlQuery = `SELECT * FROM users WHERE ${field} =?`;
        pool.query(sqlQuery,user,function(err,result){
            if(err) throw err;
            callback(result);
            
        });
    },
    create:function(body,callback)
    {
        try{ var password = body.password;
            var salt = bcrypt.genSaltSync(10);
            body.password = bcrypt.hashSync(password,salt);}
            catch(e){
                console.log('no password data');
            }
       

        var usrArray = [];
        for(prop in body){
            usrArray.push(body[prop]);
        }

        let sqlQuery = `INSERT INTO users (firstname,lastname,email,password) VALUES(?,?,?,?)`;

        pool.query(sqlQuery, usrArray, function(err, lastId){
            if(err) throw err;
            callback(lastId);
            
        });

    },
    login : function(email,password,callback){
        this.find(email, function(user){
            if(user){
                if(bcrypt.compareSync(password, user.password)){
                    callback(user);
                    return;
                }
            }
            callback(null);
        });
    }
}
module.exports = User;