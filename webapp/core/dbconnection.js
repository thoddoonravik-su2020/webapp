const Sequelize = require('sequelize');
const db = {}
const sequelize = new Sequelize("userdb", "root", "12345", 
{

  host:"localhost", dialect: "mysql", operatorsAliases: 0,

  pool:{
    max: 5,
    min: 0,
    acquire: 30000,
    idle:10000
  }
}
)



db.Sequelize = Sequelize;
db.sequelize = sequelize;




module.exports = db;