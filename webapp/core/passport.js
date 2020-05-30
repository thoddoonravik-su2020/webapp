const LocalStrategy = require('passport-local').Strategy;
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const User = require('../model/User');
module.exports = function(passport){
    passport.use( new LocalStrategy( { usernameField: 'email'}, (email, password, done) => {
        //Validation email 
        User.findOne({email:email})
         .then(user => { if (user){
             bcrypt.compare(password, user.password, (err, isMatch)=> {
                 if(err) throw err;
                 if(isMatch){
                     return done(null, user);
                 }
                 else
                 {
                     return done(null, false, {message:'Password Failed !!'})
                 }
             });

         }
         else{
             return done( null, false, { message: 'You are not registered. Please sign up !!'})

         } })
          .catch(err => console.log(err));

    })
    );
    passport.serializeUser((user, done)=>{done(null, user.id);});
    passport.deserializeUser((id, done)=>{User.getById(id, (err, user)=> {
        done(err, user);
    });
});
}