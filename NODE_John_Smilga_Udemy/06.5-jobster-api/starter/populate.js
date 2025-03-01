require("dotenv").config();

const mockJobData = require("./MOCK_JOB_DATA.json");
const Job = require("./models/Job");
const connectDB = require("./db/connect");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Job.create(mockJobData);
    console.log("SUCCESS!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
