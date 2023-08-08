const express = require("express");
const { Product } = require("../models/product");

const router = express.Router();


router.post("/api/search", async (req, res) => {
  const { name } = req.body;
  const product = await Product.findOne({ name });

  if (!product) {
    return res.send({ status: false, error: "No product found" });
  }
  return res.send(product);
});

exports.searchRouter = router;