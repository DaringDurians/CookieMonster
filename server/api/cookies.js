const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

//sitting ontop api/products/cookies

router.get('/', async (req, res, next) => {
  try {
    const allCookies = await Product.findAll({
      where: {
        category: 'cookies'
      }
    })
    res.status(200).json(allCookies)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const cookie = await Product.findOne({
      where: {
        category: 'cookies',
        id: req.params.id
      }
    })
    res.status(200).json(cookie)
  } catch (err) {
    next(err)
  }
})
