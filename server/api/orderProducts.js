const router = require('express').Router()
const {OrderProducts} = require('../db/models')
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

router.get('/:orderId', async (req, res, next) => {
  try {
    const order = await OrderProducts.findAll({
      where: {
        orderId: req.params.orderId
      }
    })
    res.status(200).json(order)
  } catch (err) {
    next(err)
  }
})
