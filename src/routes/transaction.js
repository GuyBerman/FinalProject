const express = require("express");
const { User } = require("../models/user");

const router = express.Router();

router.post("/api/transaction", async (req, res) => {
  const userid = req.body.userid;
  const user = await User.findOne({ _id: userid });
  if (!user) {
    return res.send(
      "User doesnt exist!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
    );
  }

  user.transaction.push(user.cart);
  user.cart = {};
  user.markModified("cart");
  user.markModified("transaction");
  await user.save();
  res.send(user);
});

exports.transactionRouter = router;
