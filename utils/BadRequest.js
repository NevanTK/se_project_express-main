const BAD_REQUEST = 400;

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = "BadRequestError";
    this.statusCode = BAD_REQUEST;
  }
}

module.exports = {
  BadRequestError,
};
// const handleError = (res, err) => {
//   console.error(err);
//   return res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
// };
