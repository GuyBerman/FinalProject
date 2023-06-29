const router = require("express");
const { Product } = require("../models/product");

router.get("/api/search", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});

exports.searchRouter = router;