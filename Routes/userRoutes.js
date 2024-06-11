
const express = require('express');
const { signup, login } = require('../controllers/userController');
const userRoutes = express.Router()



// documentation link       https://documenter.getpostman.com/view/36226497/2sA3XMhNJi
userRoutes.post("/sigup", signup)
userRoutes.post("/login", login)


module.exports = userRoutes;















