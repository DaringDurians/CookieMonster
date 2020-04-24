const router = require('express').Router()
const {OrderProducts, Product, Order} = require('../db/models')
const {Op} = require('sequelize')
module.exports = router

//sitting ontop api/orderProducts

router.get('/', async (req, res, next) => {
  try {
    const order = await OrderProducts.findAll()
    res.send(order)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    const order = await Order.findAll({
      where: {
        userId: req.params.userId
      },
      include: [Product]
    })
    res.status(200).json(order)
  } catch (err) {
    next(err)
  }
})
