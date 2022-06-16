//this is the access point for all things database related!

const db = require('./db')

const Product = require("./models/Product");
const Bank = require("./models/Bank");

//associations could go here!

module.exports = {
  db,
  models: {
    Product,
    Bank
  },
};
