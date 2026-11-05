const INTERNAL_SERVER_ERROR = 500;

class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.name = "InternalServerError";
    this.statusCode = INTERNAL_SERVER_ERROR;
  }
}

module.exports = {
  InternalServerError,
};
// const handleError = (res, err) => {
//   console.error(err);
//   return res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
// };
