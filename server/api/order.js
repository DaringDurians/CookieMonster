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
        userId: user.id
      }
    }) //, active: true
    console.log('potential', potentialCart)
    let isNew = await OrderProducts.findAll({
      where: {orderId: potentialCart[0].id}
    })
    if (Array.isArray(isNew) && isNew.length > 1) {
      console.log('ISNEW IS FALSE; SHOULD UPDATE')
      await OrderProducts.destroy({where: {productId: 11, quantity: 0}})
      let updated = await OrderProducts.findAll({
        where: {orderId: potentialCart[0].id}
      })
      console.log('POST ROUTE FOR ORDER ISNEW', updated)
      res.json(updated)
    } else {
      console.log('ISNEW IS TRUE; SHOULD ADD TO ORDERPRODUCTS')
      let existingProduct = await OrderProducts.findOne({
        where: {orderId: potentialCart[0].id, productId: req.body.productId}
      })

      console.log(req.body.productId)
      if (existingProduct) {
        let updatedProd = await OrderProducts.update(
          {quantity: req.body.quantity},
          {
            returning: true,
            plain: true,
            where: {orderId: potentialCart[0].id, productId: req.body.productId}
          }
        )
        console.log('finished route', updatedProd)
      } else {
        console.log('******************* req.body', req.body)
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
