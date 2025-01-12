const Task = require("./../models/Task");
const asyncWrapper = require("./../middleware/async");
const { createCustomError } = require("../errors/custom-error");

//Mongoose queries are thenables. In other words, queries have a then() function that behaves similarly to the Promise then() function. So you can use queries with promise chaining and async/await.
// Mongoose queries are not promises. Queries are thenables, meaning they have a .then() method for async/await as a convenience. However, unlike promises, calling a query's .then() executes the query, so calling then() multiple times will throw an error.

// Mongoose models provide several static helper functions for CRUD operations. Each of these functions returns a mongoose Query object.

// Model.deleteMany()
// Model.deleteOne()
// Model.find()
// Model.findById()
// Model.findByIdAndDelete()
// Model.findByIdAndRemove()
// Model.findByIdAndUpdate()
// Model.findOne()
// Model.findOneAndDelete()
// Model.findOneAndReplace()
// Model.findOneAndUpdate()
// Model.replaceOne()
// Model.updateMany()
// Model.updateOne()

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getTaskByID = asyncWrapper(async (req, res, next) => {
  const task = await Task.findOne({ _id: req.params.id });

  if (!task) {
    return next(createCustomError(`No task with id : ${req.params.id}`, 404));
  }

  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id });

  if (!task) {
    return next(createCustomError(`No task with id : ${req.params.id}`, 404));
  }

  res.status(200).json({ task });
  //  res.status(200).send();
  // res.status(200).json({ success: true });
});

// PUT vs PATCH
// PUT - replace whole item  ---> override:true
// PATCH - update properties only which are passed in req.body

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;

  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return next(createCustomError(`No task with id : ${req.params.id}`, 404));
  }

  res.status(200).json({ task });
});

module.exports = {
  getAllTasks,
  createTask,
  getTaskByID,
  updateTask,
  deleteTask,
};
