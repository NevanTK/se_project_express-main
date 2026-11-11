const ClothingItem = require("../models/clothingItem");
const InternalServerError = require("../utils/Internal");
const NotFoundError = require("../utils/NotFound");
const BadRequestError = require("../utils/BadRequest");
const ForbiddenError = require("../utils/Forbidden");

const createClothingItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((clothingItem) => res.send({ data: clothingItem }))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid clothing item data"));
      }
      return next(err);
    });
};

const getClothingItem = (req, res, next) => {
  ClothingItem.find({})
    .then((clothingItem) => res.send(clothingItem))
    .catch((err) => {
      console.error(err);
      return next(new InternalServerError("Server error occurred"));
    });
};

const deleteClothingItem = (req, res, next) => {
  const { clothingItemId } = req.params;

  ClothingItem.findOneAndDelete({
    _id: clothingItemId,
    owner: req.user._id,
  })
    .then((item) => {
      if (item) {
        return res
          .status(200)
          .send({ message: "Clothing item deleted successfully" });
      }

      return ClothingItem.exists({ _id: clothingItemId }).then((exists) => {
        if (exists) {
          return next(
            new ForbiddenError(
              "You are not authorized to delete this clothing item"
            )
          );
        }
        return next(new NotFoundError("Clothing item not found"));
      });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid clothing item ID"));
      }
      return next(new InternalServerError("Server error occurred"));
    });
};

const likeClothingItem = (req, res, next) => {
  const { clothingItemId } = req.params;
  ClothingItem.findByIdAndUpdate(
    clothingItemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(new NotFoundError("DocumentNotFoundError"))
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.message === "DocumentNotFoundError") {
        return next(new NotFoundError("Clothing item not found"));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid clothing item ID"));
      }
      return next(new InternalServerError("Server error occurred"));
    });
};

const dislikeClothingItem = (req, res, next) => {
  const { clothingItemId } = req.params;
  ClothingItem.findByIdAndUpdate(
    clothingItemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(new NotFoundError("DocumentNotFoundError"))
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.message === "DocumentNotFoundError") {
        return next(new NotFoundError("Clothing item not found"));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid clothing item ID"));
      }
      return next(new InternalServerError("Server error occurred"));
    });
};

module.exports = {
  getClothingItem,
  createClothingItem,
  deleteClothingItem,
  likeClothingItem,
  dislikeClothingItem,
};
