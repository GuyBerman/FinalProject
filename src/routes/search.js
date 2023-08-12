const express = require("express");
const { Product } = require("../models/product");
const { User } = require("../models/user");

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

router.get('/api/searchUser', async (req, res) => {
  const searchQuery = req.query.q;
  
  try {
    const searchResults = await User.find({
      email: { $regex: new RegExp(searchQuery, 'i') }
    });
    res.json(searchResults);
  } catch (error) {
    res.status(500).json({ message: 'Error searching users', error });
  }
});

exports.searchRouter = router;