const Sequelize = require("sequelize");
const db = require("../db");

const Bank = db.define("bank", {
  penny: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
    },
  },
  nickel: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
    },
  },
  dime: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
    },
  },
  quarter: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
    },
  },
  oneDollar: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
    },
  },
  fiveDollar: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
    },
  },
  tenDollar: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
    },
  },
  twentyDollar: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
    },
  },
  fiftyDollar: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
    },
  },
  hundredDollar: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
    },
  },
});


module.exports = Bank;
