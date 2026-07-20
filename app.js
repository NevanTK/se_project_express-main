const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const mainRouter = require("./routes/index");
const User = require("./models/user");
const { NOT_FOUND, UNAUTHORIZED } = require("./utils/errors");

const app = express();
app.use(cors());
const { PORT = 3001, JWT_SECRET = "dev-secret" } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use((req, res, next) => {
  req.user = {
    _id: "...",
  };
  next();
});

app.use(express.json());
app.use("/", mainRouter);

app.post("/signup", (req, res) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    User.create({
      email: req.body.email,
      password: hash,
    })
      .then((user) => {
        res.status(201).send(user);
      })
      .catch((err) => {
        console.error(err);
        res.status(NOT_FOUND).send({ message: "User not found" });
      });
  });
});

app.post("/signin", (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      console.error(err);
      res.status(UNAUTHORIZED).send({ message: "Invalid credentials" });
    });
});

app.listen(PORT)
console.log(`App listening on port ${PORT}`);
