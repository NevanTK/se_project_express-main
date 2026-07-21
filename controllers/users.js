const User = require("../models/user");
const { INTERNAL_SERVER_ERROR, BAD_REQUEST, NOT_FOUND, OK, CONFLICT, UNAUTHORIZED  } = require("../utils/errors");

const getUsers = (req, res) => {
    User.find({})
        .then((users) => res.send(users))
        .catch((err) => {
            console.error(err) ;       
            return res.status(INTERNAL_SERVER_ERROR).send({message: "Server error occurred"});
});
};

const getCurrentUser = (req, res) => {
  const { userId } = req.user;
  User.findById(userId).orFail(new Error('UserNotFound'))
    .then((user) => res.status(OK).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === 'DocumentNotFoundError') {
        return res.status(NOT_FOUND).send({ message: 'User not found' });
      }
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST).send({ message: 'Invalid user ID' });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: "Server error occurred" });
    });
};

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  User.create({ name, avatar, email, password })
  .then((user) => res.status(OK).send(user))
  .catch((err) => {
    console.error(err);
    if (err.name === 'ValidationError') {
      return res.status(BAD_REQUEST ).send({ message: "Invalid user data" });
    }
    if (err.code === 11000) {
      return res.status(CONFLICT).send({ message: "Email already exists" });
    }
    return res.status(INTERNAL_SERVER_ERROR).send({message: "Server error occurred" });
  });
}

const loginUser = (req, res) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({ message: 'Authentication successful', user });
    })
    .catch((err) => {
      res.status(UNAUTHORIZED).send({ message: err.message });
    });
};

const updateUser = (req, res) => {
  const { name, avatar } = req.body;
  const { userId } = req.user;

  User.findByIdAndUpdate(userId, { name, avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND).send({ message: 'User not found' });
      }
      return res.status(OK).send(user);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST).send({ message: 'Invalid user data' });
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: 'Server error occurred' });
    });
};

module.exports = {
  getUsers,
  createUser,
  getCurrentUser,
  loginUser,
  updateUser
};


