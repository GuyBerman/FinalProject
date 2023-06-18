const { Product } = require("../models/product");
const express = require("express");

const router = express.Router();

router.put("/api/updatePrice", async (req, res) => {
  const { name, price, admin } = req.body;
  if (!admin) {
    return res.send("You are not an admin");
  }
  const product = await Product.findOne({ name });

  if (!product) {
    return res.send("Item not found!!!!!!");
  }
  product.price = price;
  await product.save();
  res.send(product);
});

exports.updateRouter = router;
