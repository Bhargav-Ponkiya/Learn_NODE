const express = require("express");
const app = express();
const { products } = require("./data");

/*
app.get("/", (req, res) => {
  // here, .json()  --> set content-type and send reponse as json.stringify()
  res.json(products);
});
*/

app.get("/", (req, res) => {
  res.send(`<h1>Home page</h1><a href="/api/products">products</a>`);
});

app.get("/api/products", (req, res) => {
  const newProducts = products.map((product) => {
    const { id, name, image } = product;
    return { id, name, image };
  });

  res.json(newProducts);
});

// params
app.get("/api/products/:productID", (req, res) => {
  const { productID } = req.params;
  const singleProduct = products.find((product) => {
    return product.id === Number(productID);
  });

  if (!singleProduct) {
    res.status(404).send("Product doesn't exits");
  } else {
    res.json(singleProduct);
  }
});

app.get("/api/products/:productID/reviews/:reviewID", (req, res) => {
  const paramData = req.params;
  res.json(paramData);
});

// query
app.get("/api/v1/query", (req, res) => {
  const { search, limit } = req.query;

  let resultendProduct = [...products];

  if (search) {
    resultendProduct = products.filter((product) => {
      return product.name.startsWith(search);
    });
  }

  if (limit) {
    resultendProduct = resultendProduct.slice(0, Number(limit));
  }

  if (resultendProduct.length === 0) {
    return res.status(200).send({ success: true, data: [] });
  }

  res.json(resultendProduct);
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000...");
});
