const router = require("express").Router();
const auth = require("../middlewares/auth");
const { getCurrentUser, createUser, loginUser, updateUser } = require("../controllers/users");
// const User = require("../models/user");


router.post("/signup", createUser);
router.post("/login", loginUser);
router.patch("/me", auth, updateUser);
router.get("/me", auth, getCurrentUser);
// router.patch("/me", auth,);


module.exports = router;