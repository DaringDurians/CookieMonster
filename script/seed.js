'use strict'
const {green, red} = require('chalk')
const db = require('../server/db')
const {User} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const [Cody, Murphy, Jesse, Rida, Sarah, Tyler, Steven] = await Promise.all([
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
    })
  ])

  return [Cody, Murphy, Jesse, Rida, Sarah, Tyler, Steven]
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
