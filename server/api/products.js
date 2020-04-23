const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

//sitting ontop api/products
router.use('/brownies', require('./brownies'))
router.use('/cookies', require('./cookies'))
