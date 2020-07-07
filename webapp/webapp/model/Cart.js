const Sequelize = require('sequelize')
const db = require('../core/dbconnection')

module.exports = db.sequelize.define(
  'carts',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    bookid:{
      type: Sequelize.INTEGER
    },
    userid:{
      type: Sequelize.INTEGER,      
    },
    quantity: {
      type: Sequelize.INTEGER,
    },
    title:{
      type: Sequelize.TEXT,
    },
    PRICE:{
      type: Sequelize.DOUBLE
    }
  },
  {
    timestamps: false
  }
)