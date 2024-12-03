const express = require("express");
const app = express();

let { people } = require("./data");

// static assets
app.use(express.static("./methods-public"));

// parse form data
app.use(express.urlencoded({ extended: false }));

// parse json
app.use(express.json());

// post --> 1st way
app.post("/login", (req, res) => {
  const { name } = req.body;

  if (name) {
    res.status(200).send(`Welcome ${name}`);
  } else {
    res.status(401).send(`name is empty. Please provide some value`);
  }
});

app.get("/api/people", (req, res) => {
  res.status(200).json({ success: true, data: people });
});

// post --> 2nd way
app.post("/api/people", (req, res) => {
  const { name } = req.body;

  if (name) {
    res.status(201).json({ success: true, person: name });
  } else {
    res.status(400).json({ success: false, msg: "please provide name value" });
  }
});

// post ---> postman
app.post("/api/people/postman", (req, res) => {
  const { name } = req.body;

  if (name) {
    res.status(201).json({ success: true, data: [...people, name] });
  } else {
    res
      .status(400)
      .json({ success: false, msg: "please provide non-empty name value" });
  }
});

// put
app.put("/api/people/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const person = people.find((person) => person.id === Number(id));

  if (person) {
    const newPeople = people.map((person) => {
      if (person.id === Number(id)) {
        person.name = name;
      }
      return person;
    });

    res.status(200).json({ success: true, data: newPeople });
  } else {
    res
      .status(404)
      .json({ success: false, msg: `person with id ${id} not exits` });
  }
});

// delete
app.delete("/api/people/:id", (req, res) => {
  const { id } = req.params;

  const person = people.find((person) => person.id === Number(id));

  if (person) {
    const newPeople = people.filter((person) => person.id !== Number(id));
    res.status(200).json({ success: true, data: newPeople });
  } else {
    res.status(404).json({ success: false, msg: `no person with id ${id}` });
  }
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000...");
});
