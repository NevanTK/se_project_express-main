const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  getClothingItem,
  createClothingItem,
  deleteClothingItem,
  likeClothingItem,
  dislikeClothingItem,
} = require("../controllers/clothingItems");
const { clothingItemValidation, clothingItemIdValidation, deleteClothingItemValidation } = require("../middlewares/validation");

router.post("/", auth, clothingItemValidation, createClothingItem);
router.get("/", getClothingItem);
router.delete("/:clothingItemId", auth, deleteClothingItemValidation, deleteClothingItem);
router.put("/:clothingItemId/likes", auth, clothingItemIdValidation, likeClothingItem);
router.delete("/:clothingItemId/likes", auth, clothingItemIdValidation, dislikeClothingItem);

module.exports = router;
