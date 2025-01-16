require("dotenv").config();

const connectDB = require("./db/connect");
const Product = require("./models/product");
const jsonProduct = require("./products.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    console.log("Database connected sucessfully...");
    await Product.deleteMany();
    await Product.create(jsonProduct);
    process.exit(0); // to come out of this process or terminate process
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
