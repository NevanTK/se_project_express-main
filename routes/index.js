const router = require("express").Router();
const { NOT_FOUND } = require("../utils/errors");
const { createUser, loginUser } = require("../controllers/users");

const userRouter = require("./users");
const clothingItemsRouter = require("./clothingItems");

router.post("/signup", createUser);
router.post("/signin", loginUser);
router.use("/items", clothingItemsRouter);
router.use("/users", userRouter);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
});

module.exports = router;
