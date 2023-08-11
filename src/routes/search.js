const express = require("express");
const { Product } = require("../models/product");

const router = express.Router();

router.get('/api/search', async (req, res) => {
  const searchQuery = req.query.q;
  
  try {
    const searchResults = await Product.find({
      name: { $regex: new RegExp(searchQuery, 'i') }
    });
    res.json(searchResults);
  } catch (error) {
    res.status(500).json({ message: 'Error searching products', error });
  }
});

exports.searchRouter = router;