class CustomErrorClass extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const createCustomError = (msg, statusCode) => {
  return new CustomErrorClass(msg, statusCode);
};

module.exports = { createCustomError, CustomErrorClass };
