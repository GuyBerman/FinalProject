const express = require("express");
const { Product } = require("../models/product");

const router = express.Router();


router.post("/api/SearchProduct", async (req, res) => {
  const { name } = req.body;
  const product = await Product.findOne({ name });

  if (!product) {
    return res.send({ status: false, error: "No user found" });
  }
  res.send({ status: true, error: user });
});



router.get('/', async (req, res) => {
  try {
    const searchTerm = req.query.term;

    // Create a regular expression to match the search term (case-insensitive)
    const regex = new RegExp(searchTerm, 'i');

    // Query the database for products matching the search term
    const products = await Product.find({ name: regex }).limit(10).select('name');

    const suggestions = products.map(product => product.name);
    res.json(suggestions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while retrieving autocomplete suggestions.' });
  }
});


exports.searchRouter = router;