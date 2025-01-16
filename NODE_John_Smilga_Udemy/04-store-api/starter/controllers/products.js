const Product = require("./../models/product");

const getAllProductsStatic = async (req, res) => {
  //  throw new Error("error");       ---> to test the require("express-async-errors"); built in middleware

  const products = await Product.find({ price: { $gt: 300 } })
    .sort("price")
    .select("name price")
    .limit(40)
    .skip(0);
  res.status(200).json({ products, noOfItem: products.length });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;

  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }

  if (company) {
    queryObject.company = company;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  // little bit complex logic, as we are using regex and replace method. NEED to see the proper flow
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };

    const regex = /\b(<|<=|>|>=|=)\b/g;
    let filters = numericFilters.replace(regex, (match) => {
      return `-${operatorMap[match]}-`;
    });

    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  // const products = await Product.find(queryObject);

  // This is important concept related to await and how we are storing value and what will be the order of execution
  let result = Product.find(queryObject);

  // sorting fields
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  // select fields to display
  if (fields) {
    const selectFields = fields.split(",").join(" ");
    result = result.select(selectFields);
  }

  // pagination logic
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const products = await result;

  res.status(200).json({ products, noOfItem: products.length });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
