const { CustomErrorClass } = require("../errors/custom-error");

const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomErrorClass) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res
    .status(500)
    .json({ msg: "Something went wrong, please try again!" });
};

module.exports = errorHandler;
