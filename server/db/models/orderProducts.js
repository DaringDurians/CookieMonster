const Sequelize = require('sequelize')
const db = require('../db')

const OrderProducts = db.define('orderProducts', {
  orderId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  productId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  productsPrice: {
    type: Sequelize.INTEGER
  },
  quantity: {
    type: Sequelize.INTENGER
  },
  totalPrice: {
    type: Sequelize.INTEGER
  }
})

module.exports = OrderProducts
