const celebrate = require("celebrate");

const { Joi } = celebrate;

const signupValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),

    password: Joi.string().required().min(8),

    name: Joi.string().required().min(2).max(30),

    avatar: Joi.string().required().uri({ scheme: ["http", "https"] }),
  }),
});

const userValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),

    password: Joi.string().required().min(8),

    userName: Joi.string().required().min(2).max(30),

    userAvatar: Joi.string().required().uri({ scheme: ["http", "https"] }),
  }),
});

const clothingItemValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),

    imageUrl: Joi.string().required().uri({ scheme: ["http", "https"] }),
  }),
});

const clothingItemIdValidation = celebrate({
  params: Joi.object().keys({
    clothingItemId: Joi.string().hex().length(24).required(),
  }),
});

const deleteClothingItemValidation = celebrate({
  params: Joi.object().keys({
    clothingItemId: Joi.string().hex().length(24).required(),
  }),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),

    password: Joi.string().required(),
  }),
});

module.exports = {
  userValidation,
  clothingItemValidation,
  clothingItemIdValidation,
  deleteClothingItemValidation,
  loginValidation,
  signupValidation,
};
