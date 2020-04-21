const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  userId: {
    type: Sequelize.INTEGER,
    defaultValue: null
  },
  orderDate: {
    type: Sequelize.DATE,
    defaultValue: new Date()
  },
  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  total: {
    type: Sequelize.INTEGER
  }
})

module.exports = Order
