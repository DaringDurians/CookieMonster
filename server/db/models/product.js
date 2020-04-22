const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isIn: [['Cookie', 'Brownie']]
    }
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.STRING
  },
  imgUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue:
      'https://www.modernhoney.com/wp-content/uploads/2017/11/Thin-and-Crispy-Chocolate-Chip-Cookies-2.jpg',
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Product
