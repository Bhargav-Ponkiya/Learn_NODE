let { people } = require("../../../data");

const getPeople = (req, res) => {
  res.status(200).json({ success: true, data: people });
};

const createPerson = (req, res) => {
  const { name } = req.body;

  if (name) {
    res.status(201).json({ success: true, person: name });
  } else {
    res.status(400).json({ success: false, msg: "please provide name value" });
  }
};

const createPersonPostman = (req, res) => {
  const { name } = req.body;

  if (name) {
    res.status(201).json({ success: true, data: [...people, name] });
  } else {
    res
      .status(400)
      .json({ success: false, msg: "please provide non-empty name value" });
  }
};

const updatePerson = (req, res) => {
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
};

const deletePerson = (req, res) => {
  const { id } = req.params;

  const person = people.find((person) => person.id === Number(id));

  if (person) {
    const newPeople = people.filter((person) => person.id !== Number(id));
    res.status(200).json({ success: true, data: newPeople });
  } else {
    res.status(404).json({ success: false, msg: `no person with id ${id}` });
  }
};

module.exports = {
  getPeople,
  createPerson,
  createPersonPostman,
  updatePerson,
  deletePerson,
};
