const router = require('express').Router()
const {OrderProducts, Product, Order, User} = require('../db/models')
const {Op} = require('sequelize')
module.exports = router

//sitting ontop api/order
router.get('/', async (req, res, next) => {
  try {
    const order = await Order.findAll({
      include: [Product]
    })
    res.send(order)
  } catch (err) {
    next(err)
  }
})

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
    let user = await User.findOne({where: {id: req.body.userId}})
    let potentialCart = await Order.findOrCreate({
      where: {
        userId: user.id,
        active: true
      }
    }) //, active: true
    let isNew = await OrderProducts.findAll({
      where: {orderId: potentialCart[0].id}
    })
    if (Array.isArray(isNew) && isNew.length > 1) {
      await OrderProducts.destroy({where: {productId: 11, quantity: 0}})
      let updated = await OrderProducts.findAll({
        where: {orderId: potentialCart[0].id}
      })
      res.json(updated)
    } else {
      let existingProduct = await OrderProducts.findOne({
        where: {orderId: potentialCart[0].id, productId: req.body.productId}
      })

      if (existingProduct) {
        let updatedProd = await OrderProducts.update(
          {quantity: req.body.quantity},
          {
            returning: true,
            plain: true,
            where: {orderId: potentialCart[0].id, productId: req.body.productId}
          }
        )
      } else {
        await OrderProducts.create({
          orderId: potentialCart[0].id,
          productId: req.body.productId,
          quantity: req.body.quantity,
          totalPrice: req.body.totalPrice
        })
      }
      res.json(potentialCart[0])
    }
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const updated = await Order.update(
      {active: req.body.active},
      {returning: true, plain: true, where: {id: req.params.id}}
    )
    res.json(updated[1])
  } catch (err) {
    next(err)
  }
})
