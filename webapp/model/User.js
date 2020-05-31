const Sequelize = require('sequelize');
const db = require("../core/dbconnection");

module.exports = db.sequelize.define(
    'user', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoincrement:true
        },
        firstname: {
            type: Sequelize.STRING,

        },
        lastname: {
            type: Sequelize.STRING,
            
        },
        email: {
            type: Sequelize.STRING,
            
        },
        password: {
            type: Sequelize.STRING,
            
        },
      
        },
        {
            timestamps:false
        }

)
module.exports = db;