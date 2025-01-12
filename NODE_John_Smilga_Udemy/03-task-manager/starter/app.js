const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const tasks = require("./routes/tasks");
require("dotenv").config();
const { notFound } = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");

//middleware

//serve static content
app.use(express.static("./public"));

//The primary function of express.json() is to parse requests with a Content-Type header of application/json. Once parsed, the resulting data is stored in the req.body, allowing easy access to the JSON content sent from the client.
app.use(express.json());

//routes
app.use("/api/v1/tasks", tasks);

// custom middleware
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_CONNECT_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
