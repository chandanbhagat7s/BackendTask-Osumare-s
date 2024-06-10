
const express = require('express');
const { isLoggedIn } = require('../middleware/isLoggedIn');
const { createTask, getAllTask, updateTask, getTask, deleteTask } = require('../controllers/taskController');
const taskRouter = express.Router()

taskRouter.use(isLoggedIn)
taskRouter.post("/createTask", createTask)
taskRouter.get("/getMyAllTask", getAllTask)
taskRouter.get("/getTask/:taskId", getTask)
taskRouter.patch("/updateTask/:taskId", updateTask)
taskRouter.delete("/deletetaks/:taskId", deleteTask)


module.exports = taskRouter












