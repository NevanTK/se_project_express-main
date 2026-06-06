const router = require("express").Router();

const { getClothingItem, getClothingItemById, createClothingItem, deleteClothingItem  } = require("../controllers/clothingItems");

router.post('/', createClothingItem);
router.get('/', getClothingItem);
router.get('/:clothingItemId', getClothingItemById);
router.delete('/:clothingItemId', deleteClothingItem);

module.exports = router;