const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mainRouter = require("./routes/index");
// const auth = require("./middlewares/auth");
const app = express();
app.use(cors());
const { PORT = 3001} = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// app.use((req, res, next) => {
//   req.user = {
//     _id: "...",
//   };
//   next();
// });

app.use(express.json());
app.use("/", mainRouter);
// app.use('/', auth, require('./routes/posts'));

app.listen(PORT)
// console.log(`App listening on port ${PORT}`);
