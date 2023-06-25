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
<<<<<<< HEAD
  productprice: {
    type: Number,
    required: true,
  },
=======
>>>>>>> 0acbe3a4bb962c649547d3a106e5e25de698bfbd
});

const Cart = mongoose.model("cart", cartScheme);

exports.Cart = Cart;
