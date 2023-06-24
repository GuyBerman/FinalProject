const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const { getRouter } = require("./routes/get");
const { createRouter } = require("./routes/create");
const { signinRouter } = require("./routes/signin");
const { updateRouter } = require("./routes/update");
const { deleteRouter } = require("./routes/delete");
const { updateCartRouter } = require("./routes/cart_update");
const { getUserRouter } = require("./routes/getuser");
const { transactionRouter } = require("./routes/transaction");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(getRouter);
app.use(createRouter);
app.use(signinRouter);
app.use(updateRouter);
app.use(deleteRouter);
app.use(updateCartRouter);
app.use(getUserRouter);
app.use(transactionRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/home.html"));
});
app.get("/adminusers", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/adminusers.html"));
});
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/register.html"));
});
app.get("/signin", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/login.html"));
});
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/admin.html"));
});
app.get("/admin2", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/adminproducts.html"));
});
app.get("/settings", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/settings.html"));
});
app.get("/cart", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/cart.html"));
});
const start = async () => {
  await mongoose.connect(
    "mongodb+srv://GuyBerman:ddhhttddhhtt11@store.emokjq8.mongodb.net/Store"
  );

  app.listen(4000, () => {
    console.log("Servers up");
  });
};
start();
