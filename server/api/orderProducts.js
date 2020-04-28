const router = require('express').Router()
const {OrderProducts, Product} = require('../db/models')
const {Op} = require('sequelize')
module.exports = router

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
    const orderDetails = await OrderProducts.findAll({
      where: {
        orderId: req.params.orderId
      }
    })
    res.send(orderDetails)
  } catch (err) {
    next(err)
  }
})

router.post('/:productId', async (req, res, next) => {
  try {
    console.log('*****************INSIDE POST ROUTE*******************')
    const found = await OrderProducts.findOne({
      where: {productId: req.params.productId, orderId: req.body.orderId}
    })
    if (found) {
      console.log('*******POST ROUTE IF STATEMENT')
      console.log(req.body)
      const update = await found.update({
        quantity: req.body.quantity,
        totalPrice: req.body.totalPrice
      })

      res.json(update)
    } else {
      console.log('*******POST ROUTE ELSE STATEMENT')
      const orderProduct = await OrderProducts.create(req.body)
      res.json(orderProduct)
    }
  } catch (err) {
    next(err)
  }
})

router.put('/:productId', async (req, res, next) => {
  try {
    const orderProduct = await OrderProducts.findOne({
      where: {
        productId: req.params.productId
      }
    })
    await orderProduct.update(req.body)
    res.status(201).json(orderProduct)
  } catch (err) {
    next(err)
  }
})
