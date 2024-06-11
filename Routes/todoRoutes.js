
const express = require('express');
const { isLoggedIn } = require('../middleware/isLoggedIn');
const { createTask, getAllTask, updateTask, getTask, deleteTask } = require('../controllers/taskController');
const taskRouter = express.Router()


// documentation link       https://documenter.getpostman.com/view/36226497/2sA3XMhNJi

taskRouter.use(isLoggedIn)
taskRouter.post("/createTask", createTask)
taskRouter.get("/getMyAllTask", getAllTask)
taskRouter.get("/getTask/:taskId", getTask)
taskRouter.patch("/updateTask/:taskId", updateTask)
taskRouter.delete("/deletetask/:taskId", deleteTask)


module.exports = taskRouter












