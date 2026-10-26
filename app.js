require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const mainRouter = require("./routes/index");

const app = express();
app.use(cors());
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use(express.json());
app.use(requestLogger);
app.use("/", mainRouter);
app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message =
    statusCode === 500 ? "An error occurred on the server" : err.message;

  return res.status(statusCode).send({ message });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}

module.exports = app;
