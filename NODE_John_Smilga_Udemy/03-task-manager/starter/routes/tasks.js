const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  createTask,
  getTaskByID,
  updateTask,
  deleteTask,
} = require("./../controllers/tasks");

router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").get(getTaskByID).patch(updateTask).delete(deleteTask);

module.exports = router;
