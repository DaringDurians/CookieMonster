const router = require('express').Router()
const {OrderProducts, Product, Order, User} = require('../db/models')
const {Op} = require('sequelize')
module.exports = router

//sitting ontop api/order
router.get('/', async (req, res, next) => {
  try {
    const order = await Order.findAll()
    res.send(order)
  } catch (err) {
    next(err)
  }
})

// router.get('/:userId', async (req, res, next) => {
//   try {
//     const order = await Order.findOrCreate({
//       where: {
//         userId: req.params.userId,
//         active: true
//       }
//     }).spread(function(order, created) {
//       if (created) {
//         res.status(200).json(order)
//       }
//     })
//   } catch (err) {
//     next(err)
//   }
// })

router.get('/:userId', async (req, res, next) => {
  try {
    const order = await Order.findAll({
      where: {
        userId: req.params.userId,
        active: true
      }
    })
    res.json(order)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    res.json(await Order.create(req.body))
  } catch (err) {
    next(err)
  }
})
