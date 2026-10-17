const ClothingItem = require("../models/clothingItem");
const {
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST,
  NOT_FOUND,
  OK,
  FORBIDDEN, InternalServerError,
  NotFoundError,
  BadRequestError,
  ForbiddenError, 
} = require("../utils/errors");

const createClothingItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((clothingItem) => res.send({ data: clothingItem }))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return next(new BadRequestError('Invalid clothing item data'));
      }
      return next(new InternalServerError('Server error occurred'));
    });
};

const getClothingItem = (req, res, next) => {
  ClothingItem.find({})
    .then((clothingItem) => res.send(clothingItem))
    .catch((err) => {
      console.error(err);
      return next(new InternalServerError('Server error occurred'));
    });
};

const deleteClothingItem = (req, res, next) => {
  const { clothingItemId } = req.params;

  ClothingItem.findByIdAndDelete(clothingItemId)
    .orFail(new NotFoundError("DocumentNotFoundError"))
   .then((item) => {
      if (item.owner.toString() !== req.user._id.toString()) {
        throw new ForbiddenError(
          "You are not authorized to delete this clothing item"
        );
      }

      return item.deleteOne();
    })
    .then(() => {
      res.status(OK).send({ message: "Clothing item deleted successfully" });
    })
    .catch((err) => {
      console.error(err);
     if (err instanceof NotFoundError || err instanceof ForbiddenError) {
        return next(err);
      }
      if (err.name === "CastError") {
        return next(new BadRequestError('Invalid clothing item ID'));
      }
      if (err.name === "ForbiddenError") {
        return next(new ForbiddenError('You are not authorized to delete this clothing item'));
      }{
        return next(new InternalServerError('Server error occurred'));
      }
    });
};

const likeClothingItem = (req, res, next) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(new NotFoundError("DocumentNotFoundError"))
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.message === "DocumentNotFoundError") {
        return next(new NotFoundError('Clothing item not found'));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError('Invalid clothing item ID'));
      }
      else {
        return next(new InternalServerError('Server error occurred'));
      }
    });
};

const dislikeClothingItem = (req, res, next) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(new NotFoundError("DocumentNotFoundError"))
    .then((item) => res.send({ data: item }))
    .catch((err) => {
      console.error(err);
      if (err.message === "DocumentNotFoundError") {
        return next(new NotFoundError('Clothing item not found'));
      }
      if (err.name === "CastError") {
        return next(new BadRequestError('Invalid clothing item ID'));
      }
      else {
        return next(new InternalServerError('Server error occurred'));
      }
    });
};

module.exports = {
  getClothingItem,
  createClothingItem,
  deleteClothingItem,
  likeClothingItem,
  dislikeClothingItem,
};
