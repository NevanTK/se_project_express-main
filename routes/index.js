const router = require("express").Router();
const NotFoundError = require("../utils/NotFound");
const { createUser, loginUser } = require("../controllers/users");
const userRouter = require("./users");
const clothingItemsRouter = require("./clothingItems");
const { signupValidation, loginValidation } = require("../middlewares/validation");

// router.post('/post', celebrate({
//   body: Joi.object().keys({
//     title: Joi.string().required().min(2).max(30),
//     text: Joi.string().required().min(2),
//   }),
// }), createPost);

router.post("/signup", signupValidation, createUser);
router.post("/signin", loginValidation, loginUser);
router.use("/items", clothingItemsRouter);
router.use("/users", userRouter);

router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;
