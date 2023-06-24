const express = require("express");
const { User } = require("../models/user");

const router = express.Router();

router.get("/api/getUser", async (req, res) => {
  const user = await User.find({});
  res.send(user);
});

exports.getUserRouter = router;
