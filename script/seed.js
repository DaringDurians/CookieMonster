'use strict'
const {green, red} = require('chalk')
const db = require('../server/db')

const {User, Order, OrderProducts, Product} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  const [
    Cody,
    Murphy,
    Jesse,
    Rida,
    Sarah,
    Tyler,
    Steven,
    Natalie,
    Dan,
    Dakota
  ] = await Promise.all([
    User.create({
      name: 'Cody',
      email: 'cody@email.com',
      isAdmin: false,
      password: '123'
    }),

    User.create({
      name: 'Murphy',
      email: 'murphy@email.com',
      isAdmin: false,
      password: '123'
    }),

    User.create({
      name: 'Jesse',
      email: 'jesse@email.com',
      isAdmin: false,
      password: '123'
    }),

    User.create({
      name: 'Rida',
      email: 'rida@email.com',
      isAdmin: false,
      password: '123'
    }),

    User.create({
      name: 'Sarah',
      email: 'sarah@email.com',
      isAdmin: false,
      password: '123'
    }),

    User.create({
      name: 'Tyler',
      email: 'tyler@email.com',
      isAdmin: false,
      password: '123'
    }),

    User.create({
      name: 'Steven',
      email: 'steven@email.com',
      isAdmin: true,
      password: '123'
    }),

    User.create({
      name: 'Natalie',
      email: 'natalie@email.com',
      isAdmin: false,
      password: '123'
    }),

    User.create({
      name: 'Dan',
      email: 'dan@email.com',
      isAdmin: true,
      password: '123'
    }),

    User.create({
      name: 'Dakota',
      email: 'dakota@email.com',
      isAdmin: false,
      password: '123'
    })
  ])

  const [sampleOrder] = await Promise.all([
    Order.create({
      userId: Sarah.id
    })
  ])

  const [
    chocolateChip,
    doubleChoclateChunk,
    sugar,
    oatmealRaisin,
    whiteChocMacadamia,
    snickerdoodle,
    peanutButter,
    chocoBrownie,
    oreoBrownie,
    strawberryBrownie,
    vanillaBrownie
  ] = await Promise.all([
    Product.create({
      name: 'Chocolate Chip',
      category: 'Cookie',
      price: 195,
      description: 'Our version of a cookie classic!',
      imgUrl:
        'https://www.cookingclassy.com/wp-content/uploads/2014/06/chocolate-chip-cookie-16.jpg'
    }),
    Product.create({
      name: 'Double Chocolate Chunk',
      category: 'Cookie',
      price: 195,
      description:
        'These cookies are great...you get a double dose of chocolate!',
      imgUrl: 'https://www.meals.com/imagesrecipes/144807lrg.jpg'
    }),
    Product.create({
      name: 'Sugar',
      category: 'Cookie',
      price: 135,
      description: 'A sweet and tender cookie with wonderfully crisp edges!',
      imgUrl:
        'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fassets.marthastewart.com%2Fstyles%2Fwmax-300%2Fd35%2Fold-fashioned-sugar-hol05-msd101477%2Fold-fashioned-sugar-hol05-msd101477_vert.jpg%3Fitok%3Dg9SkvuNF'
    }),
    Product.create({
      name: 'Oatmeal Raisin',
      category: 'Cookie',
      price: 165,
      description: 'Moist, chewy and loaded with raisins!',
      imgUrl:
        'https://www.jessicagavin.com/wp-content/uploads/2018/12/oatmeal-raisin-cookies-10-1200-500x375.jpg'
    }),
    Product.create({
      name: 'White Chocolate Macadamia Nut',
      category: 'Cookie',
      price: 245,
      description:
        'Loaded with extra white chocolate chips and macadamia nuts, these are guaranteed to be your new favorite cookie!',
      imgUrl:
        'https://www.chelseasmessyapron.com/wp-content/uploads/2019/03/White-Chocolate-Macadamia-Nut-Cookie-10-500x500.jpg'
    }),
    Product.create({
      name: 'Snickerdoodle',
      category: 'Cookie',
      price: 155,
      description: 'Heavenly cinniamon in every bite!',
      imgUrl:
        'https://www.browneyedbaker.com/wp-content/uploads/2009/07/snickerdoodles-main.jpg'
    }),
    Product.create({
      name: 'Peanut Butter',
      category: 'Cookie',
      price: 199,
      description:
        'Packed with double the peanut butter, these peanut butter cookies boast a dense flavor and remarkably soft texture',
      imgUrl:
        'https://thenovicechefblog.com/wp-content/uploads/2014/07/The-Best-Chewy-Peanut-Butter-Cookies-3-sm-1-720x540.jpg'
    }),
    Product.create({
      name: 'Chocolate Brownie',
      category: 'Brownie',
      price: 215,
      description: 'Chocolate chocolate is the best',
      imgUrl:
        'https://celebratingsweets.com/wp-content/uploads/2014/10/Homemade-Brownies-2.jpg'
    }),
    Product.create({
      name: 'Oreo Brownie',
      category: 'Brownie',
      price: 250,
      description: 'Dont be a Boreo and eat your Oreos',
      imgUrl:
        'https://www.dinneratthezoo.com/wp-content/uploads/2019/02/oreo-brownies-4.jpg'
    }),
    Product.create({
      name: 'Strawberry Brownie',
      category: 'Brownie',
      price: 250,
      description: 'Can a brownie have strawberries? There are no rules here',
      imgUrl:
        'https://www.lifeloveandsugar.com/wp-content/uploads/2017/06/Fudgy-Strawberry-Chocolate-Brownies3b.jpg'
    }),
    Product.create({
      name: 'Vanilla Brownie',
      category: 'Brownie',
      price: 225,
      description: 'The tastiest juxtaposition',
      imgUrl:
        'https://i.pinimg.com/originals/68/c4/e5/68c4e544128171c2c8afdb6b59565281.jpg'
    })
  ])

  const [sampleOrderProduct1] = await Promise.all([
    OrderProducts.create({
      orderId: sampleOrder.id,
      productId: chocolateChip.id,
      quantity: 2,
      totalPrice: chocolateChip.price * 2
    })
  ])

  // console.log(`seeded ${Product.length} products`)
  // console.log(`seeded successfully`)
  return [
    chocolateChip,
    doubleChoclateChunk,
    sugar,
    oatmealRaisin,
    whiteChocMacadamia,
    snickerdoodle,
    peanutButter,
    chocoBrownie,
    oreoBrownie,
    strawberryBrownie,
    vanillaBrownie,
    Cody,
    Murphy,
    Jesse,
    Rida,
    Sarah,
    Tyler,
    Steven,
    Natalie,
    Dan,
    Dakota,
    sampleOrder,
    sampleOrderProduct1
  ]
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed

if (require.main === module) {
  runSeed()
    .then(() => {
      console.log(green('Seeding success!'))
      db.close()
    })
    .catch(err => {
      console.error(red('Oh noes! Something went wrong!'))
      console.error(err)
      db.close()
    })
}
