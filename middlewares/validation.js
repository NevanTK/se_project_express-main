const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const userValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email()
      .$messages({
        "string.empty": "Email is required",
        "string.email": "Invalid email format",
      }),

    password: Joi.string()
      .required()
      .min(8)
      .messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 8 characters long",
      }),

    userName: Joi.string()
      .required()
      .min(2)
      .max(30)
      .messages({
        "string.empty": "User name is required",
        "string.min": "User name must be at least 2 characters long",
        "string.max": "User name must be at most 30 characters long",
      }),

    userAvatar: Joi.string()
      .required()
      .custom(validateURL, "URL validation")
      .messages({
        "string.empty": "User avatar URL is required",
        "string.uri": "Invalid user avatar URL",
      }),
  }),
});

const clothingItemValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .required()
      .min(2)
      .max(30)
      .messages({
        "string.empty": "Name is required",
        "string.min": "Name must be at least 2 characters long",
        "string.max": "Name must be at most 30 characters long",
      }),

    imageUrl: Joi.string()
      .required()
      .custom(validateURL, "URL validation")
      .messages({
        "string.empty": "Image URL is required",
        "string.uri": "Invalid image URL",
      }),
  }),
});

const clothingItemIdValidation = celebrate({
  params: Joi.object().keys({
    clothingItemId: Joi.string().hex().length(24).required(),
  }),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email()
      .messages({
        "string.empty": "Email is required",
        "string.email": "Invalid email format",
      }),

    password: Joi.string()
      .required()
      .messages({ "string.empty": "Password is required" }),
  }),
});

module.exports = {
  userValidation,
  clothingItemValidation,
  clothingItemIdValidation,
  loginValidation,
};
