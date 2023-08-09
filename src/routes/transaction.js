const express = require("express");
const { User } = require("../models/user");
const { Product } = require("../models/product");

const router = express.Router();

router.post("/api/transaction", async (req, res) => {
  const userid = req.body.userid;
  const user = await User.findOne({ _id: userid });
  if (!user) {
    return res.send(
      "User doesnt exist!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
    );
  }

    // Update counterSell for products in user's cart
    for (const productName in user.cart) {
      if (user.cart.hasOwnProperty(productName)) {
        const quantityBought = user.cart[productName].quantity;
        const product = await Product.findOne({ name: productName });
  
        if (product) {
          product.counterSell += quantityBought; // Increment counterSell
          await product.save();
        }
      }
    }

  user.transaction.push(user.cart);
  user.cart = {};
  user.markModified("cart");
  user.markModified("transaction");
  await user.save();
  res.send(user);
});

exports.transactionRouter = router;
