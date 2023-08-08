const mongoose = require("mongoose");

const productScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  producttype:{
    type: String,
  },
  productbrand:{
    type: String,
  },
});

const Product = mongoose.model("product", productScheme);

exports.Product = Product;
