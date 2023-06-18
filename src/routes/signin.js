const express = require("express");
const { User } = require("../models/user");

const router = express.Router();

router.post("/api/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });

  if (!user) {
    return res.send({ status: false, error: "No user found" });
  }
  res.send({ status: true, error: user });
});

exports.signinRouter = router;
