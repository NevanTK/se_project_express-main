const OK = 200;

class Ok extends Error {
  constructor(message) {
    super(message);
    this.name = "Ok";
    this.statusCode = OK;
  }
}

module.exports = {
  Ok,
};

