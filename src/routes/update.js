const { Product } = require("../models/product");
const express = require("express");
const { User } = require("../models/user");

const router = express.Router();

router.put("/api/updatePrice", async (req, res) => {
  const { name, price, quantity, admin } = req.body;
  if (!admin) {
    return res.send("You are not an admin");
  }
  const product = await Product.findOne({ name });

  if (!product) {
    return res.send("Item not found!!!!!!");
  }
  product.price = price;
  product.quantity = quantity;
  await product.save();
  res.send(product);
});

router.put("/api/updatePass", async (req, res) => {
  const { password, id } = req.body;

  const user = await User.findOne({ _id: id });

  if (!user) {
    return res.send("User not found!!!!!!");
  }
  user.password = password;
  user.markModified("password");
  await user.save();
  res.send(user);
});

exports.updateRouter = router;
