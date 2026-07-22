const router = require("express").Router();
const { NOT_FOUND } = require("../utils/errors");
const { createUser, loginUser } = require("../controllers/users");

const userRouter = require("./users");
const clothingItemsRouter = require("./clothingItems");

router.use("/items", clothingItemsRouter);
router.use("/users", userRouter);
router.post("/users/signup", createUser);
router.post("/users/signin", loginUser);

router.use((req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
});

module.exports = router;
