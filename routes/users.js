const router = require("express").Router();
const auth = require("../middlewares/auth");
const { getCurrentUser, updateUser } = require("../controllers/users");
// const User = require("../models/user");



router.patch("/me", auth, updateUser);
router.get("/me", auth, getCurrentUser);
// router.patch("/users/me", auth,);


module.exports = router;