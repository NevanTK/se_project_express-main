const INTERNAL_SERVER_ERROR = 500;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const OK = 200;
const CONFLICT = 409;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;
// const handleError = (res, err) => {
//   console.error(err);
//   return res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
// };

module.exports = {
    INTERNAL_SERVER_ERROR,
    BAD_REQUEST,
    NOT_FOUND,
    OK,
    CONFLICT,
    UNAUTHORIZED,
    FORBIDDEN,
//   handleError,
};