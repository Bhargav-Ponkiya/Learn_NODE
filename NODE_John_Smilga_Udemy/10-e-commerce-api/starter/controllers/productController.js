const Product = require("./../models/Product");
const { StatusCodes } = require("http-status-codes");
const {
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
} = require("./../errors");
const path = require("path");

const createProduct = async (req, res) => {
  req.body.user = req.user.userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ products, count: products.length });
};

const getSingleProduct = async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id }).populate(
    "reviews"
  );

  if (!product) {
    throw new NotFoundError(`Product with id: ${req.params.id} not exists`);
  }

  res.status(StatusCodes.OK).json({ product });
};

const updateProduct = async (req, res) => {
  const product = await Product.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true, runValidators: true }
  );

  if (!product) {
    throw new NotFoundError(`Product with id: ${req.params.id} not exists`);
  }

  res.status(StatusCodes.OK).json({ product });
};

const deleteProduct = async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });

  if (!product) {
    throw new NotFoundError(`Product with id: ${req.params.id} not exists`);
  }

  await product.deleteOne();
  res.status(StatusCodes.OK).json({ msg: "Success! Product deleted" });
};

const uploadImage = async (req, res) => {
  const productImage = req.files.image;
  if (!productImage) {
    throw new BadRequestError("Please upload file");
  }
  if (!productImage.mimetype.startsWith("image")) {
    throw new BadRequestError("Please upload image");
  }

  const maxImageSize = 1024 * 1024;

  if (productImage.size > maxImageSize) {
    throw new BadRequestError("Please upload image size less than 1MB");
  }

  const imagePath = path.join(
    __dirname,
    `./../public/uploads/${productImage.name}`
  );

  await productImage.mv(imagePath);

  res.status(StatusCodes.OK).json({ image: `/uploads/${productImage.name}` });
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  uploadImage,
};
