const router = require('express').Router()
const {OrderProducts} = require('../db/models')
const {Op} = require('sequelize')
module.exports = router

router.get('/:productId', async (req, res, next) => {
  try {
    const orderProduct = await OrderProducts.findOne({
      where: {
        productId: req.params.productId
      }
    })
    res.status(200).json(orderProduct)
  } catch (err) {
    next(err)
  }
})

router.post('/:productId', async (req, res, next) => {
  try {
    const orderProduct = await OrderProducts.create(req.body)
    res.status(201).json(orderProduct)
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
