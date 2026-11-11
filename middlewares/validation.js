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
    name: Joi.string().min(2).max(30),
    avatar: Joi.string().uri({ scheme: ["http", "https"] }),
  }).min(1),
});

const clothingItemValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    weather: Joi.string().required().valid("hot", "warm", "cold"),
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
