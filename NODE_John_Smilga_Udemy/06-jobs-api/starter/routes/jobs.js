const express = require("express");
const router = express.Router();

const {
  getAllJobs,
  getSingleJob,
  createJob,
  updateJob,
  deleteJob,
} = require("./../controllers/jobs");

router.route("/").get(getAllJobs).post(createJob);
router.route("/:id").get(getSingleJob).put(updateJob).delete(deleteJob);

module.exports = router;
