const router = require("express").Router();
const auth = require("../middlewares/auth");
const { getCurrentUser, createUser, loginUser, updateUser } = require("../controllers/users");
// const User = require("../models/user");


router.post("/users/signup", createUser);
router.post("/users/signin", loginUser);
router.patch("/users/me", auth, updateUser);
router.get("/users/me", auth, getCurrentUser);
// router.patch("/users/me", auth,);


module.exports = router;