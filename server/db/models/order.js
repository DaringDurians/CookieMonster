const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  chocolateChip: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 100000
    }
  },

  orderDate: {
    type: Sequelize.DATE
  },

  total: {
    type: Sequelize.FLOAT,
    allowNull: false,
    defaultValue: 0,
    validate: {
      notEmpty: true
    }
  },
  finished: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

// Order.prototype.getChildren = async function(){
//   const getChildren = await Order.findAll({
//     where: {
//       parentId: this.id
//     }
//   })
//   return getChildren
// }
// Order.prototype.addChild = function(newCookie){
//   const newCookie = Order.create({
//     parentId: this.id,
//     name: newCookie.name
//   })
//   return newCookie
// }

module.exports = Order
