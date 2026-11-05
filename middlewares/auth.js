const jwt = require("jsonwebtoken");
const Unauthorized = require("../utils/Unauthorized");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(Unauthorized).send({ message: "Authorization required" });
  }

  const token = authorization.replace("Bearer ", "");
  const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    return res.status(Unauthorized).send({ message: "Invalid token" });
  }
};