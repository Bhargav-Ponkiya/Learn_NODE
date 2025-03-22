const User = require("./../models/User");
const { StatusCodes } = require("http-status-codes");
const {
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
} = require("./../errors");
const {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
  createTokenUser,
} = require("./../utils");

// browser does all the work for cookies
// frontend/client cann't access it if httpOnly:true
// we can make it more securet by: secure:true
// cons: MAX size of cookies is 4096kb only

// if we want frontend application which is not in same domain to access backend then we need to use CORS

// if we have frontend on 3000 and backend on 5000. We will NOT be able to send cookies to frontend. We will need to user proxy: 5000 in package.json in frontend(create-react-app) -----> in deployment proxy will not work. We need to update according to platform in which we are deploying

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const emailAlreadyExists = await User.findOne({ email });

  if (emailAlreadyExists) {
    throw new BadRequestError("Email already exists");
  }

  //NOTE: Don't give frontend or postman API power to send or modify role as it is important thing

  // first registered user is an admin
  const isFirstAccount = (await User.countDocuments()) === 0;
  const role = isFirstAccount ? "admin" : "user";

  const user = await User.create({ name, email, password, role });

  const tokenUser = createTokenUser({ user });
  attachCookiesToResponse({ res, payload: tokenUser });

  res.status(StatusCodes.CREATED).json({ user: tokenUser });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  const isPasswordCorrect = user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  const tokenUser = createTokenUser({ user });
  attachCookiesToResponse({ res, payload: tokenUser });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};

const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "User logged out!" });
};

module.exports = { register, login, logout };
