const router = require('express').Router()
const {OrderProducts} = require('../db/models')
const {Op} = require('sequelize')
module.exports = router

//sitting ontop api/orderProducts

router.get('/:orderId', async (req, res, next) => {
  try {
    console.log('req.params.id', req.params.id)
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
