const { User } = require("../models/user");
const express = require("express");

const router = express.Router();

router.post("/api/addToCart", async (req, res) => {
  try {
    const { userId, productName, price } = req.body;

    // Find the user by their ID and update their cart in the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    // Add the product to the user's cart
    const cart = user.cart;
    cart[productName] = {
      price,
      quantity: !cart[productName] ? 1 : cart[productName].quantity + 1,
    };
    user.cart = cart;
    user.markModified("cart");
    await user.save();

    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Server error" });
  }
});

exports.updateCartRouter = router;
