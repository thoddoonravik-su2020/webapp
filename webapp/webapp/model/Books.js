const Sequelize = require('sequelize')
const db = require('../core/dbconnection')

module.exports = db.sequelize.define(
  'book',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userid:{
      type: Sequelize.INTEGER,      
    },
    isbn:{
        type: Sequelize.TEXT,
    },
    title: {
      type: Sequelize.TEXT,
    },
    authors: {
      type: Sequelize.TEXT
    },
    PUBLICATION_DATE: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    quantity: {
      type: Sequelize.INTEGER,
    },
    PRICE: {
      type: Sequelize.DOUBLE,
    }
  },
  {
    timestamps: false
  }
)