//////////// Flow of JWT ////////////////////////////

// if username and password are provided, backend will send jwt token to frontend
// frontend will store in localstorage or cookies and send as Authorization header for other protected routes/resources

const jwt = require("jsonwebtoken");
const { BadRequest } = require("./../errors");

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequest("Please provide username and password");
  }

  // just for demo, normally provided by DB!!!!
  const id = new Date().getDate();

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({ msg: "User created", token });
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);

  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};
