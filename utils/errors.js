const INTERNAL_SERVER_ERROR = 500;
const BAD_REQUEST = 400;
const NOT_FOUND = 404;
const OK = 200;
const CONFLICT = 409;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;

class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.name = "InternalServerError";
    this.statusCode = INTERNAL_SERVER_ERROR;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = NOT_FOUND;
  }
}

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = "BadRequestError";
    this.statusCode = BAD_REQUEST;
  }
}

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = "ConflictError";
    this.statusCode = CONFLICT;
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = "UnauthorizedError";
    this.statusCode = UNAUTHORIZED;
  }
}

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = "ForbiddenError";
    this.statusCode = FORBIDDEN;
  }
}

module.exports = {
  INTERNAL_SERVER_ERROR,
  BAD_REQUEST,
  NOT_FOUND,
  OK,
  CONFLICT,
  UNAUTHORIZED,
  FORBIDDEN,
    InternalServerError,
  NotFoundError,
  BadRequestError,
  ConflictError,
  UnauthorizedError,
  ForbiddenError,
};
// const handleError = (res, err) => {
//   console.error(err);
//   return res.status(INTERNAL_SERVER_ERROR).send({ message: err.message });
// };
