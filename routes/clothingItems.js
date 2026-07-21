const router = require("express").Router();
const auth = require("../middlewares/auth");

const {
  getClothingItem,
  createClothingItem,
  deleteClothingItem,
  likeClothingItem,
  dislikeClothingItem,
} = require("../controllers/clothingItems");

router.post("/", auth, createClothingItem);
router.get("/", auth, getClothingItem);
router.delete("/:clothingItemId", auth, deleteClothingItem);
router.put("/:itemId/likes", auth, likeClothingItem);
router.delete("/:itemId/likes", auth, dislikeClothingItem);

module.exports = router;
