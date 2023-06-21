const mongoose = require("mongoose");

const cartScheme = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  productname: {
    type: String,
    required: true,
  },
});

const Cart = mongoose.model("cart", cartScheme);

exports.Cart = Cart;
