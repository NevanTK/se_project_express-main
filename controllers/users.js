const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Ok = require("../utils/OK");
const InternalServerError = require("../utils/Internal");
const NotFoundError = require("../utils/NotFound");
const BadRequestError = require("../utils/BadRequest");
const ConflictError = require("../utils/Conflict");
const UnauthorizedError = require("../utils/Unauthorized");

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      console.error(err);
      return next(new InternalServerError("Server error occurred"));
    });
};

const getCurrentUser = (req, res, next) => {
  const { _id } = req.user;
  User.findOne({ _id })
    .orFail(new NotFoundError("User not found"))
    .then((user) => {
      if (!user) {
        throw new NotFoundError("User not found");
      }
      res.status(Ok).send(user);
    })
    .catch((err) => {
      console.error(err);
      if (err instanceof NotFoundError) {
        return next(err);
      }
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid user ID"));
      }
      return next(new InternalServerError("Server error occurred"));
    });
};

const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) =>
      res.status(Ok).send({
        _id: user._id,
        name: user.name,
        avatar: user.avatar,
        email: user.email,
      })
    )
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid user data"));
      }
      if (err.code === 11000) {
        return next(new ConflictError("Email already exists"));
      }
      return next(new InternalServerError("Server error occurred"));
    });
};

const loginUser = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new BadRequestError("Email and password are required"));
  }
  const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.send({ token });
    })
    .catch((err) => {
      console.error(err);
      if (err.message === "Incorrect email or password") {
        return next(new UnauthorizedError("Invalid email or password"));
      }
      return next(new InternalServerError("Server error occurred"));
    });
};

const updateUser = (req, res, next) => {
  const { name, avatar } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(
    _id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        return next(new NotFoundError("User not found"));
      }
      return res.status(Ok).send(user);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid user data"));
      }
      return next(new InternalServerError("Server error occurred"));
    });
};

module.exports = {
  getUsers,
  createUser,
  getCurrentUser,
  loginUser,
  updateUser,
};
