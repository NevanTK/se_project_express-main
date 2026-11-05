const CONFLICT = 409;

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = "ConflictError";
    this.statusCode = CONFLICT;
  }
}

module.exports = {
  ConflictError,
};
// const handleError = (res, err) => {
//   console.error(err);
//   return res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
// };
