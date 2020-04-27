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
    let potentialCart = await Order.findOrCreate({where: {userId: user.id}})
    let isNew = await OrderProducts.findAll({
      where: {orderId: potentialCart[0].id}
    })
    console.log(isNew)
    if (isNew.length > 1) {
      console.log('ISNEW IS FALSE; SHOULD UPDATE')
      let updated = await OrderProducts.findAll({
        where: {orderId: potentialCart[0].id}
      })
      console.log('POST ROUTE FOR ORDER ISNEW', updated)
      res.json(updated)
    } else {
      console.log('ISNEW IS TRUE; SHOULD ADD TO ORDERPRODUCTS')
      let existingProduct = OrderProducts.findOne({
        where: {orderId: potentialCart[0].id, productId: req.body.productId}
      })
      if (existingProduct) {
        await OrderProducts.update(
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
    console.log('PUT ROUTE', req.params.id)
    const updated = await Order.update(
      {active: req.body.active},
      {returning: true, plain: true, where: {id: req.params.id}}
    )
    res.json(updated[1])
  } catch (err) {
    next(err)
  }
})
