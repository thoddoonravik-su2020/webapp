const Sequelize = require('sequelize')
const db = require('../core/dbconnection')

module.exports = db.sequelize.define(
  'images',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    bookid:{
      type: Sequelize.INTEGER
    },
    imagedata:{
      type: Sequelize.STRING,      
    }
},
  {
    timestamps: false
  }
)