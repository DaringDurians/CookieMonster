const router = require('express').Router()
module.exports = router

//sitting ontop of /api

router.use('/users', require('./users'))
router.use('/products', require('./products'))
router.use('/orderProducts', require('./orderProducts'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
