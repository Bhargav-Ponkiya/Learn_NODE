const path = require("path");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const uploadProductImageLocal = async (req, res) => {
  // check if file exists
  // check format
  // check size

  if (!req.files) {
    throw new BadRequestError("No file uploaded");
  }

  const productImage = req.files.image;

  if (!productImage.mimetype.startsWith("image")) {
    throw new BadRequestError("Please upload image");
  }

  const maxImageSize = 1024 * 1024;
  if (productImage.size > maxImageSize) {
    throw new BadRequestError(
      `Please upload image size less than ${maxImageSize / 1024} KB`
    );
  }

  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${productImage.name}`
  );
  await productImage.mv(imagePath);
  res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${productImage.name}` } });
};

const uploadProductImage = async (req, res) => {
  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    { use_filename: true, folder: "file-upload" }
  );

  // remove temp file ------> But why we have used Sync? Can't we use Async here?????
  fs.unlinkSync(req.files.image.tempFilePath);

  res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
};

module.exports = { uploadProductImage };
