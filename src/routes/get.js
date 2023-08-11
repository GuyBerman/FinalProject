const express = require("express");
const { Product } = require("../models/product");

const router = express.Router();

router.get("/api/getProducts", async (req, res) => {
  const productType = req.query.type;
  const productBrand = req.query.brand;

  try {
    let products;

    if (productType) {
      products = await Product.find({ producttype: productType });
    } else if (productBrand) {
      products = await Product.find({ productbrand: productBrand });
    } else {
      products = await Product.find({});
    }

    res.send(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
});


exports.getRouter = router;
