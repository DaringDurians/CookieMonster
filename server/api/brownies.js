const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

//sitting ontop api/products/brownies

router.get('/', async (req, res, next) => {
  try {
    const allBrownies = await Product.findAll({
      where: {
        category: 'brownies'
      }
    })
    res.status(200).json(allBrownies)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const brownie = await Product.findOne({
      where: {
        category: 'brownies',
        id: req.params.id
      }
    })
    res.status(200).json(brownie)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const updated = await Product.update(req.body, {
      returning: true,
      where: {id: req.params.id}
    })
    res.json(updated[1][0])
  } catch (err) {
    next(err)
  }
})
