const {expect} = require('chai')
const {db} = require('.')
const seed = require('../../../script/seed')
const {Order, Product, User} = require('.')

describe('Models', () => {
  before(() => db.sync({force: true}))
  afterEach(() => db.sync({force: true}))

  describe('Sequelize Models', () => {
    let user, savedUser, product, savedProduct, order, savedOrder
    beforeEach(async () => {
      user = {
        name: 'John',
        email: 'model@model.com',
        isAdmin: false
      }

      product = {
        name: 'peanut butter cookie',
        category: 'cookies',
        price: 195,
        description: 'buttery goodness!',
        imgUrl: 'test'
      }

      order = {
        userId: 1,
        orderDate: new Date('04-27-2018'),
        active: true
      }

      savedUser = await User.create(user)
      savedProduct = await Product.create(product)
      savedOrder = await Order.create(order)
    })

    it('User has fields name, email, isAdmin', async () => {
      expect(savedUser.name).to.equal('John')
      expect(savedUser.email).to.equal('model@model.com')
      expect(savedUser.isAdmin).to.equal(false)
    })

    it('User name cannot be null or an empty string', async () => {
      expect(User.rawAttributes.name.allowNull).to.equal(false)
      expect(User.rawAttributes.name.validate.notEmpty).to.equal(true)
    })

    it('User email cannot be null or an empty string; must be an email', async () => {
      expect(User.rawAttributes.email.allowNull).to.equal(false)
      expect(User.rawAttributes.email.validate.isEmail).to.equal(true)
    })

    it('Product has fields name, email, isAdmin', async () => {
      expect(savedProduct.name).to.equal('peanut butter cookie')
      expect(savedProduct.category).to.equal('cookies')
      expect(savedProduct.price).to.equal(195)
      expect(savedProduct.description).to.equal('buttery goodness!')
      expect(savedProduct.imgUrl).to.equal('test')
    })

    it('Product name cannot be null or an empty string', async () => {
      expect(Product.rawAttributes.name.allowNull).to.equal(false)
      expect(Product.rawAttributes.name.validate.notEmpty).to.equal(true)
    })

    it('Product category cannot be null or empty', async () => {
      expect(Product.rawAttributes.category.allowNull).to.equal(false)
      expect(Product.rawAttributes.category.validate.notEmpty).to.equal(true)
    })

    it('Product price cannot be null or empty', async () => {
      expect(Product.rawAttributes.price.allowNull).to.equal(false)
      expect(Product.rawAttributes.price.validate.notEmpty).to.equal(true)
    })

    it('Order has fields userId, active', async () => {
      expect(savedOrder.userId).to.equal(1)
      expect(savedOrder.active).to.equal(true)
    })
  })

  describe('Model Association', () => {
    let cookieOrders, brownieOrders, allProducts
    beforeEach(async () => {
      await seed()
      allProducts = await Product.findAll()
      cookieOrders = await Order.findAll({
        include: {
          model: Product,
          where: {
            category: 'cookies'
          }
        }
      })
      brownieOrders = await Order.findAll({
        include: {
          model: Product,
          where: {
            category: 'brownies'
          }
        }
      })
    })

    it('creates at least one order with a brownie', () => {
      expect(brownieOrders).to.have.lengthOf.above(0)
    })

    it('creates more than one order with a cookie', () => {
      expect(cookieOrders).to.have.lengthOf.above(0)
    })
  })

  describe('Dummy Data Records', () => {
    let allProducts, allUsers
    beforeEach(async () => {
      await seed()
      allProducts = await Product.findAll()
      allUsers = await User.findAll()
    })

    it('creates more than ten products', () => {
      expect(allProducts).to.have.lengthOf.above(10)
    })

    it('creates at least ten users', () => {
      expect(allUsers).to.have.lengthOf(10)
    })
  })
})
