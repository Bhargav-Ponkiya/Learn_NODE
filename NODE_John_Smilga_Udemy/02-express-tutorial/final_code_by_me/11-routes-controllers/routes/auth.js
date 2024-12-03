const express = require("express");
const router = express.Router();

// post --> 1st way
router.post("/", (req, res) => {
  const { name } = req.body;

  if (name) {
    res.status(200).send(`Welcome ${name}`);
  } else {
    res.status(401).send(`name is empty. Please provide some value`);
  }
});

module.exports = router;
