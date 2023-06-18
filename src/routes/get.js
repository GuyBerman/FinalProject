const express = require("express");
const { Product } = require("../models/product");

const router = express.Router();

router.get("/api/getProducts", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

exports.getRouter = router;
