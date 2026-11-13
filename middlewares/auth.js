const jwt = require("jsonwebtoken");
const {UnauthorizedError} = require("../utils/Unauthorized");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new UnauthorizedError("Authorization header missing or malformed"));
  }

  const token = authorization.replace("Bearer ", "");
  const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    return next(new UnauthorizedError("Invalid or expired token"));
  }
};