'use strict'

const {db, models: {User, Product} } = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */

const products = [
  {
    name: "kit-kat",
    price: 4354,
    quantity: 34,
    imageUrl:
      "https://m.media-amazon.com/images/I/41aD-L0EYOL._SX425_PIbundle-24,TopRight,0,0_AA425SH20_.jpg",
  },
  {
    name: "doritos",
    price: 6331,
    quantity: 23,
    imageUrl:
      "https://target.scene7.com/is/image/Target/GUEST_048fcd0f-b6b1-480c-a421-685acc83777d",
  },
  {
    name: "chips-ahoy",
    price: 1245,
    quantity: 9,
    imageUrl:
      "https://i5.walmartimages.com/asr/936d6321-e090-4408-a7c6-bc388501380d.5eab41298be237408665a83e21d24e54.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF",
  },
  {
    name: "snickers",
    price: 4632,
    quantity: 87,
    imageUrl: "https://images.heb.com/is/image/HEBGrocery/000121400",
  },
  {
    name: "milkyway",
    price: 1897,
    quantity: 87,
    imageUrl: "https://m.media-amazon.com/images/I/51zEFddSQcL._SL1000_.jpg",
  },
  {
    name: "littlebites",
    price: 6441,
    quantity: 11,
    imageUrl:
      "https://i5.walmartimages.com/asr/6c555211-e551-4411-aa4e-1e3f74f907dd.7e7939ee135be1fc32781e7d07de1bed.jpeg",
  },
  {
    name: "lays",
    price: 7651,
    quantity: 22,
    imageUrl:
      "https://mobileimages.lowes.com/product/converted/028400/028400097802.jpg?size=pdhism",
  },
];


async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123' }),
    User.create({ username: 'murphy', password: '123' }),
  ])

    await Promise.all(
      products.map((product) => {
        return Product.create(product);
      })
    );

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
  return {
    users: {
      cody: users[0],
      murphy: users[1]
    }
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
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

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
