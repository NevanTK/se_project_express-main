const User = require("../models/user");

const getUsers = (req, res) => {
    User.find({})
        .then((users) => res.send(users))
        .catch((err) => {
            console.error(err) ;       
            return res.status(500).send({message: err.message});
});
};

const getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === 'UserNotFound') {
        return res.status(404).send({ message: 'User not found' });
      } else if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Invalid user ID' });
      }
      return res.status(500).send({ message: err.message });
    });
};

const createUser = (req, res) => {
  const { name, avatar} = req.body;
  console.log(name, avatar);
  User.create({ name, avatar })
  .then((user) => res.status(201).send(user))
  .catch((err) => {
    console.error(err);
    if (err.name === 'ValidationError') {
      return res.status(400).send({ message: err.message });
    }
    return res.status(500).send({message: err.message});
  });
}

module.exports = {
  getUsers, createUser, getUserById
};