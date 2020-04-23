const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

//sitting ontop api/products
router.use('/brownies', require('./brownies'))
router.use('/cookies', require('./cookies'))

router.post('/', async (req, res, next) => {
  try {
    res.json(await Product.create(req.body))
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    await Product.destroy({
      where: {
        id: req.params.id
      }
    })
  } catch (err) {
    next(err)
  }
})
