const router = require("express").Router();
const {
  models: { Product },
} = require("../db");
module.exports = router;
//Mounted on /api/vending




//Get Request
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll({
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
});
