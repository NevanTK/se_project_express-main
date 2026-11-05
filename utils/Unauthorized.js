const UNAUTHORIZED = 401;

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnauthorizedError";
    this.statusCode = UNAUTHORIZED;
  }
}

module.exports = {
  UnauthorizedError,
};
// const handleError = (res, err) => {
//   console.error(err);
//   return res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
// };
