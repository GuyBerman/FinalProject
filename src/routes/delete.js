const { Product } = require("../models/product");
const express = require("express");
const { User } = require("../models/user");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

router.delete("/api/deleteProduct", async (req, res) => {
  const { name } = req.body;
  const isExist = await Product.deleteOne({ name });

  if (!isExist) {
    return res.send("Item doesnt exists!!!!!!");
  }

  res.send(isExist);
});

exports.deleteRouter = router;
