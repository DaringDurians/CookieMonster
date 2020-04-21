const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.status(200).json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/yummy/:category', async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: {category: req.params.category}
    })
    res.status(200).json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const products = await Product.findByPk(req.params.id)
    res.status(200).json(products)
  } catch (err) {
    next(err)
  }
})
