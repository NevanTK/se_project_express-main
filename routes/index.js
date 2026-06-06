const router = require("express").Router();

const userRouter = require("./users");
const clothingItemsRouter = require("./clothingItems");

router.use('/clothingItems', clothingItemsRouter);

router.use('/users', userRouter);

module.exports = router;