const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const year = new Date().getFullYear();
  console.log(method, url, year);
  // res.send("end in middleware");
  next();
};

module.exports = logger;
