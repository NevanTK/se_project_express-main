const ClothingItem = require("../models/clothingItem");
const {
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST,
  NOT_FOUND,
  OK,
  FORBIDDEN,
} = require("../utils/errors");

const createClothingItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((clothingItem) => res.send({ data: clothingItem }))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: "Invalid clothing item data" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "Server error occurred" });
    });
};

const getClothingItem = (req, res) => {
  ClothingItem.find({})
    .then((clothingItem) => res.send(clothingItem))
    .catch((err) => {
      console.error(err);
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "Server error occurred" });
    });
};

const deleteClothingItem = (req, res) => {
  const { clothingItemId } = req.params;
  ClothingItem.findByIdAndDelete(clothingItemId)
    .orFail(new Error("DocumentNotFoundError"))
    .then((user) =>{
      if (!user) {
        return res.status(NOT_FOUND).send({ message: "Clothing item not found" });
      }
      return res
        .status(OK)
        .send({ message: "Clothing item deleted successfully" });
})
    .then(() =>
      res.status(OK).send({ message: "Clothing item deleted successfully" })
    )
    .catch((err) => {
      console.error(err);
      if (err.message === "DocumentNotFoundError") {
        return res
          .status(NOT_FOUND)
          .send({ message: "Clothing item not found" });
      }
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: "Invalid clothing item ID" });
      }
      if (err.name === "ForbiddenError") {
        return res
          .status(FORBIDDEN)
          .send({ message: "You are not authorized to delete this clothing item" });
      }
      return resn
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "Server error occurred" });
    });
};

const likeClothingItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(new Error("DocumentNotFoundError"))
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.message === "DocumentNotFoundError") {
        return res
          .status(NOT_FOUND)
          .send({ message: "Clothing item not found" });
      }
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: "Invalid clothing item ID" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "Server error occurred" });
    });
};

const dislikeClothingItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(new Error("DocumentNotFoundError"))
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.message === "DocumentNotFoundError") {
        return res
          .status(NOT_FOUND)
          .send({ message: "Clothing item not found" });
      }
      if (err.name === "CastError") {
        return res
          .status(BAD_REQUEST)
          .send({ message: "Invalid clothing item ID" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR)
        .send({ message: "Server error occurred" });
    });
};

module.exports = {
  getClothingItem,
  createClothingItem,
  deleteClothingItem,
  likeClothingItem,
  dislikeClothingItem,
};
