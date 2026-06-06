const ClothingItem = require("../models/clothingItem");

const createClothingItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  console.log(name, weather, imageUrl);

  ClothingItem.create({ name, weather, imageUrl })
    .then((clothingItem) => res.send({ data: clothingItem }))
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

const getClothingItem = (req, res) => {
  ClothingItem.find({})
    .then((clothingItem) => res.send(clothingItem))
    .catch((err) => {
      console.error(err);
      return res.status(500).send({ message: err.message });
    });
};

const getClothingItemById = (req, res) => {
  const { clothingItemId } = req.params;
  ClothingItem.findById(clothingItemId)
    .then((clothingItem) => {
      if (!clothingItem) {
        return res.status(404).send({ message: "Clothing item not found" });
      }
      return res.status(200).send(clothingItem);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Invalid clothing item ID" });
      }
      return res.status(500).send({ message: err.message });
    });
};

const deleteClothingItem = (req, res) => {
  const { clothingItemId } = req.params;
  ClothingItem.findByIdAndDelete(clothingItemId)
    .then((clothingItem) => {
      if (!clothingItem) {
        return res.status(404).send({ message: "Clothing item not found" });
      }
      return res
        .status(200)
        .send({ message: "Clothing item deleted successfully" });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res.status(400).send({ message: "Invalid clothing item ID" });
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports = {
  getClothingItem,
  getClothingItemById,
  createClothingItem,
  deleteClothingItem,
};
