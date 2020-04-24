const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

//sitting ontop api/products/cookies

router.get('/', async (req, res, next) => {
  try {
    const allCookies = await Product.findAll({
      where: {
        category: 'Cookie'
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
        category: 'Cookie',
        id: req.params.id
      }
    })
    res.status(200).json(cookie)
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
    res.status(204)
  } catch (error) {
    next(error)
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

