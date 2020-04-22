const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const allBrownies = await Product.findAll({
      where: {
        category: 'Brownie'
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
        category: 'Brownie',
        id: req.params.id
      }
    })
    res.status(200).json(brownie)
  } catch (err) {
    next(err)
  }
})
