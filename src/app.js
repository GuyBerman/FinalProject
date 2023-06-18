const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const { getRouter } = require("./routes/get");
const { createRouter } = require("./routes/create");
const { signinRouter } = require("./routes/signin");
const { updateRouter } = require("./routes/update");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(getRouter);
app.use(createRouter);
app.use(signinRouter);
app.use(updateRouter);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/home.html"));
});
app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/register.html"));
});
app.get("/signin", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/signin.html"));
});
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "./views/admin.html"));
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
