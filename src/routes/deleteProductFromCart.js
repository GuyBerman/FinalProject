const express = require("express");
const router = express.Router();
const { User } = require("../models/user");

router.delete("/api/deleteProductFromCart", async (req, res) => {
  const { userId, productName } = req.body;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Remove the product from the user's cart
    delete user.cart[productName];

    // Save the updated user
    user.markModified("cart");
    await user.save();

    // Return the updated cart data
    res.json({ cart: user.cart });
  } catch (error) {
    console.error("Error deleting product from cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;