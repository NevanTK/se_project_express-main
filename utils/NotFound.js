const NOT_FOUND = 404;

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = NOT_FOUND;
  }
}

module.exports = {
  NotFoundError,
};
// const handleError = (res, err) => {
//   console.error(err);
//   return res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
// };
