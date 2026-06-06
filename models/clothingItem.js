const mongoose = require("mongoose");
const validator = require("validator");
const { validate } = require("./user");


const clothingItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  weather: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: 'You must enter a valid URL',
    }
  },
  owner: {
    type: String,
    required: true
  },
  likes: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("ClothingItem", clothingItemSchema);