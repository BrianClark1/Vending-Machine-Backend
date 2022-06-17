const router = require("express").Router();
const {
  models: { Product, Bank },
} = require("../db");
module.exports = router;
//Mounted on /api/vending

//MVP for a Vending Machine is the following:
//Ability to Select an Item
//Ability to pay for an item (cash only in this scenario)
//Dispense the item
//Notify owner about the intentory status (STRETCH Goal)
//   ==> Send an email/SMS notification via Javascript

//When an "Order" is placed we want the following to occur:
//Inside of REQ.BODY contains the order info
// 1.) The Item ID to be dispensed, i.e "A29"
// 2.) The money for purchase
//     - It will contain the quantities of each currency too i.e. (5 one Dollars, 2 quarters, and a nickel) $5.55
//      Conditions for the Purchase
//      A.) Overflow =-> Provide change back to the user
//              - Payment amount will be stored into our bank
//              - Algorithm to dispense change calculates based on current quantities and change total
//                           - Gross simplification of this is sufficient for demo purposes
//      B.) Underflow ==> Throw a helpful error "Insufficient Funds"
//      C.) Exact Change ==> Dispense Item
//      D.) Selected Item is out of stock throw helpful error ==> "Insufficient Quantity "

//On the Front End I would consider the following:
// 4 States, each of which respresenting a phase of our vending machine process
// Idea is that each of these states would allow or bar certain functions from occuring
// 1.) Ready (For Operation)
// 2.) CashCollected
// 3.) DispenseChange
// 4.) Dispense Item
// 5.) Transaction Canceled
//
// I would considering storing these statuses with redux (in a store, or any type of state management system)
// or perhaps local state of a frontend component.
// In terms of a vending machine, when one state is active an LED light could glare red for TRANSACITON CANCELLED
// or yellow for DispenseChange, will text appearing like PROCESSING, to inform the user that a function is in motion
// Futhermore if Dispense Item is occuring, it would bar something like trying to place an order since
// vending machines are monolithic transactionally

//REQ.BODY EXAMPLE
// req.body = {
//  item: "A29"
//  coins: {
//  [{pennies:  10},
//  {nickels: 5},
//  {dimes: 0},
//  {quarter: 0},
//  {oneDollar: 5},
//  {fiveDollar: 0},
//  {tenDollar: 0},
//  {twentyDollar: 0},
//  {fiftyDollar: 0},
//  {hundredDollar: 0}]
//  }
//}

//Put Request to update the quantity of an item and ship it back out
//Utilize req.body since we're sending a conglomerate of data rather than
//just an id with req.params
//Now to Deal with price
//First Step Would be to sum everything inside of Req.body
//Compare to product.price
//If equal, perfect dispense
//If Overflow see overflow instructions above
//if less than throw error
//if no quantity throw error (see above )

router.put("/", async (req, res, next) => {
  try {
    let itemID = req.body.item;
    let coins = req.body.coins;
    const product = await Product.findOne({ where: { codePosition: itemID } });

    //Value in Cents
    let monetaryReference = {
      pennies: 1,
      nickels: 5,
      dimes: 10,
      quarter: 25,
      oneDollar: 100,
      fiveDollar: 500,
      tenDollar: 1000,
      twentyDollar: 2000,
      fiftyDollar: 5000,
      hundredDollar: 10000,
    };

    let totalprice = coins.reduce((accumulator, coin) => {
      let multiplier = monetaryReference[Object.keys(coin)[0]];
      let price = parseInt(Object.values(coin)[0]) * multiplier;
      accumulator += price;
      return accumulator;
    }, 0);

    //Underflow, throw an error
    if (totalprice < product.price) {
      throw "Insufficient Funds";
    }

    //Other two scenarios are Overflow and exact change
    if (totalprice > product.price) {
      //Calculate change
      let change = totalprice - product.price;

      //Algorithm to determine optimal change combination, for ease of use, and maintanability of system
      const changeAlgorithm = (change) => {
        let bank = Bank.findByPk(1);
        //Run Analysis on Currency Quantity to determine best combination to make change
        return "Best Combination of Coins";
      };
      //Dispense Item
      res.json(await product.decrement("quantity", { by: 1 }));

      //If exact change "dispense the item"
    } else {
      //Dispense Item
      res.json(await product.decrement("quantity", { by: 1 }));
    }

    // if (product.quantity < 5) {
    //Notify Vendor Owner of low quantity SMS/ Email
    // }
  } catch (error) {
    next(error);
  }
});

//Add a new product to the machine
router.post("/", async (req, res, next) => {
  try {
    res.status(201).json(await Product.create(req.body));
  } catch (error) {
    next(error);
  }
});
