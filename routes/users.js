const router = require("express").Router();
const { getCurrentUser, createUser, getUserById, loginUser, updateUser } = require("../controllers/users");
// const User = require("../models/user");


router.post("/signup", createUser);
router.post("/login", loginUser);
router.patch("/me", updateUser);
router.get("/me", getCurrentUser);
router.patch("/me",);


module.exports = router;