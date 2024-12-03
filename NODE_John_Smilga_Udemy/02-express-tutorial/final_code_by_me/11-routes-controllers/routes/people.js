const express = require("express");
const router = express.Router();

const {
  getPeople,
  createPerson,
  createPersonPostman,
  updatePerson,
  deletePerson,
} = require("../controllers/people");

/*
router.get("/", getPeople);

// post --> 2nd way
router.post("/", createPerson);

// post ---> postman
router.post("/postman", createPersonPostman);

// put
router.put("/:id", updatePerson);

// delete
router.delete("/:id", deletePerson);
*/

router.route("/").get(getPeople).post(createPerson);
router.route("/postman").post(createPersonPostman);
router.route("/:id").put(updatePerson).delete(deletePerson);

module.exports = router;
