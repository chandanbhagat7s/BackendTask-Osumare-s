const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { readFileData } = require("../utils/fileOperation");


exports.isLoggedIn = catchAsync(async (req, res, next) => {
    console.log("came into");
    let token;
    // console.log("header is ", req.headers);
    if (req.headers.authorization) {
        token = req.headers.authorization;
    }

    if (!token) {
        return next(new appError("please login and user  authorization  login key 😂", 400))
    }

    const user = JSON?.parse(token)

    if (!user?.id || !user?.email || !user?.password) {

        return next(new appError("please login with  the valid format of login key 😂", 400))
    }

    let data = readFileData()
    let login = false;
    [...data].map(el => {
        if (el.id == user.id) {
            if (el.password == user.password) {
                if (el.email == user.email) {
                    login = true;
                    req.user = el;
                }
            }
        }
    })

    if (!login) {
        return next(new appError("user do not exist please signup 💥", 400))
    }
    next()



})
















