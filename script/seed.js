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
    sprinkles,
    walnutCrumble,
    chocolateFrosting,
    vanillaFrosting
  ] = await Promise.all([
    Product.create({
      name: 'Chocolate Chip',
      category: 'Cookie',
      price: 1.95,
      description: 'Our version of a cookie classic!',
      imgUrl:
        'https://www.cookingclassy.com/wp-content/uploads/2014/06/chocolate-chip-cookie-16.jpg'
    }),
    Product.create({
      name: 'Double Chocolate Chunk',
      category: 'Cookie',
      price: 1.95,
      description:
        'These cookies are great...you get a double dose of chocolate!',
      imgUrl: 'https://www.meals.com/imagesrecipes/144807lrg.jpg'
    }),
    Product.create({
      name: 'Sugar',
      category: 'Cookie',
      price: 1.35,
      description: 'A sweet and tender cookie with wonderfully crisp edges!',
      imgUrl:
        'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fassets.marthastewart.com%2Fstyles%2Fwmax-300%2Fd35%2Fold-fashioned-sugar-hol05-msd101477%2Fold-fashioned-sugar-hol05-msd101477_vert.jpg%3Fitok%3Dg9SkvuNF'
    }),
    Product.create({
      name: 'Oatmeal Raisin',
      category: 'Cookie',
      price: 1.65,
      description: 'Moist, chewy and loaded with raisins!',
      imgUrl:
        'https://www.jessicagavin.com/wp-content/uploads/2018/12/oatmeal-raisin-cookies-10-1200-500x375.jpg'
    }),
    Product.create({
      name: 'White Chocolate Macadamia Nut',
      category: 'Cookie',
      price: 2.45,
      description:
        'Loaded with extra white chocolate chips and macadamia nuts, these are guaranteed to be your new favorite cookie!',
      imgUrl:
        'https://www.chelseasmessyapron.com/wp-content/uploads/2019/03/White-Chocolate-Macadamia-Nut-Cookie-10-500x500.jpg'
    }),
    Product.create({
      name: 'Snickerdoodle',
      category: 'Cookie',
      price: 1.55,
      description: 'Heavenly cinniamon in every bite!',
      imgUrl:
        'https://www.browneyedbaker.com/wp-content/uploads/2009/07/snickerdoodles-main.jpg'
    }),
    Product.create({
      name: 'Peanut Butter',
      category: 'Cookie',
      price: 1.99,
      description:
        'Packed with double the peanut butter, these peanut butter cookies boast a dense flavor and remarkably soft texture',
      imgUrl:
        'https://thenovicechefblog.com/wp-content/uploads/2014/07/The-Best-Chewy-Peanut-Butter-Cookies-3-sm-1-720x540.jpg'
    }),
    Product.create({
      name: 'Sprinkles',
      category: 'AddOn',
      price: 0.99,
      description: 'A rainbow of SUGAR',
      imgUrl:
        'https://nuts.com/images/rackcdn/ed910ae2d60f0d25bcb8-80550f96b5feb12604f4f720bfefb46d.ssl.cf1.rackcdn.com/6a84646656a4e'
    }),
    Product.create({
      name: 'Walnut Crumble',
      category: 'AddOn',
      price: 1.12,
      description:
        'Crumbly nutty goodness put right ontop of your favorite cookie!',
      imgUrl:
        ' https://foragerchef.com/wp-content/uploads/2014/01/black-walnut-crumble-6.jpg'
    }),
    Product.create({
      name: 'Chocolate Frosting',
      category: 'AddOn',
      price: 0.65,
      description:
        'Creamy smooth chocolate whipped to perfection and drizzled across any cookie you can dream of.',
      imgUrl:
        'https://whatsinthepan.com/wp-content/uploads/2019/04/Chocolate-Frosting.jpg'
    }),
    Product.create({
      name: 'Vanilla Frosting',
      category: 'AddOn',
      price: 0.65,
      description: 'Its sweet, its tangy, its FROSTING!',
      imgUrl:
        'https://tmbidigitalassetsazure.blob.core.windows.net/rms3-prod/attachments/37/1200x1200/Vanilla-Frosting_EXPS_DIYD19_22592_B03_15_1b_rms.jpg'
    })
  ])

  const [sampleOrderProduct1] = await Promise.all([
    OrderProducts.create({
      orderId: sampleOrder.id,
      productId: chocolateChip.id,
      quantity: 2,
      totalPrice: chocolateChip.price * this.quantity
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
    sprinkles,
    walnutCrumble,
    chocolateFrosting,
    vanillaFrosting,
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

/*
// CODE BELOW FOR REFERENCE ONLY
const Student = require('./server/db/student')
const Campus = require('./server/db/campus')

const seed = async () => {
  try {
    await db.sync({force: true})
    const [nyu, columbia, parsons] = await Promise.all([
      Campus.create({
        name: 'NYU',
        imageUrl:
          'https://news.artnet.com/app/news-upload/2020/03/IMG_6320_rev-1024x682.jpg',
        address: 'New York, NY 10003',
        description:
          'New York University (NYU) is a private research university based in New York City. Founded in 1831, the historical campus is in Greenwich Village, Lower Manhattan.'
      }),
      Campus.create({
        name: 'Columbia',
        imageUrl:
          'https://static01.nyt.com/images/2020/03/08/nyregion/08xp-columbia1/08xp-columbia1-mobileMasterAt3x.jpg',
        address: 'New York, NY 10027',
        description:
          'Columbia University is a private institution that was founded in 1754. It has a total undergraduate enrollment of 6,202, its setting is urban, and the campus size is 36 acres.'
      }),
      Campus.create({
        name: 'Parsons',
        imageUrl:
          'https://www.newschool.edu/parsons2/assets/img/home/1920x1080-DrawOnDisciplines.jpg',
        address: '66 5th Ave, New York, NY 10011',
        description:
          'Parsons School of Design, known colloquially as Parsons, is a private art and design college located in the Greenwich Village neighborhood of Lower Manhattan in New York City. It is one of the five colleges of The New School.'
      })
    ])
    const [sarah, becca, samy, brittany] = await Promise.all([
      Student.create({
        firstName: 'Sarah',
        lastName: 'Park',
        email: 'sp4422@nyu.edu',
        imageUrl:
          'https://comicvine1.cbsistatic.com/uploads/scale_medium/11/111746/5814390-powerpuffgirls-buttercup_large.png',
        gpa: 3.5,
        campusId: nyu.id
      }),
      Student.create({
        firstName: 'Becca',
        lastName: 'Colwell',
        email: 'bc2399@nyu.edu',
        imageUrl:
          'https://comicvine1.cbsistatic.com/uploads/scale_medium/11/111746/5814382-powerpuffgirls-bubbles_large.png',
        gpa: 4.0,
        campusId: nyu.id
      }),
      Student.create({
        firstName: 'Samy',
        lastName: 'Ruilova',
        email: 'sr0123@nyu.edu',
        imageUrl:
          'https://comicvine1.cbsistatic.com/uploads/scale_medium/11/111746/5814389-blossom_18.png',
        gpa: 3.7,
        campusId: nyu.id
      }),
      Student.create({
        firstName: 'Brittany',
        lastName: 'Jhin',
        email: 'bj@parsons.edu',
        imageUrl: 'https://t1.rbxcdn.com/27862de60bad9e88b6f101a89dc7ceb5',
        gpa: 3.5,
        campusId: parsons.id
      })
    ])
    return [nyu, columbia, parsons, sarah, becca, samy, brittany]
    // seed your database here!
  } catch (err) {
    console.log(red(err))
  }
}

module.exports = seed
// If this module is being required from another module, then we just export the
// function, to be used as necessary. But it will run right away if the module
// is executed directly (e.g. `node seed.js` or `npm run seed`)
if (require.main === module) {
  seed()
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
*/
