const Sequelize = require('sequelize')
const db = require('../db')

const Cookie = db.define('cookie', {
  flavor: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
      //  isIn: [['ChoclateChip', 'Vanilla']]
    }
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imgUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

module.exports = Cookie
