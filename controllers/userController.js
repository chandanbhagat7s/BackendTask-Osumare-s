const fs = require('fs');
const catchAsync = require("../utils/catchAsync");
const appError = require('../utils/appError');
const { readFileData, writeIntoFile } = require('../utils/fileOperation');






exports.signup = catchAsync(async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return next(new appError("please enter all the details to register", 400))
    }
    data = readFileData()
    console.log("data", data);
    // checking for existing user with mail
    let existing = false;
    data.map((el) => {
        console.log(el);
        if (el.email == email) {
            existing = true
        }
    })
    if (existing) {
        return next(new appError("email with this email id already exists", 400))
    }


    // otherwise creating the user 
    let user = {
        "id": Date.now(),
        "name": name,
        "email": email,
        "password": password
    };
    data.push(user)
    console.log("content is ", data);

    //updating the file
    writeIntoFile(data)

    res.status(201).send({
        status: "success",
        message: "user created 😊"
    })

})



exports.login = catchAsync(async (req, res, next) => {

    const { email, password } = req.body;
    if (!email || !password) {
        return next(new appError("please enter all credentials to login", 400))
    }
    let data = readFileData()

    let login = false;
    let loginDetails = {};
    [...data].map((el) => {
        if (el.email == email) {
            if (el.password == password) {
                login = true;
                loginDetails = {
                    id: el.id,
                    email: el.email,
                    password: el.password
                };
            }
        }
    })


    if (!login) {
        return next(new appError("please enter valid email and password", 400))
    }

    res.status(200).send({
        status: "success",
        message: "logged in successfully 😂 and use this loginKey as header(Autherization) for authentication now 😊 before hitting other resource routes 📝",
        loginKey: loginDetails
    })





})





