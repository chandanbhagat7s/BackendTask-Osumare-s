const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const { readFileData, writeIntoFile } = require("../utils/fileOperation");

async function createtask(id, task) {
    let allUser = readFileData();
    console.log("al users are", allUser);
    allUser.map((el) => {
        if (el.id == id) {
            if (el.task) {
                el.task.push(task)
            } else {

                el.task = [task]
            }
        }
    })
    writeIntoFile(allUser)


}


exports.createTask = catchAsync(async (req, res, next) => {
    const user = req.user;

    //validation
    if (!user) {
        return next(new appError("please pass login key or login first to get it", 400))
    }
    const { title, description, tag } = req.body;
    if (!title || !description || !tag) {
        return next(new appError("please enter all the fields to create your task 💥", 400))
    }
    if (title.length < 5) {
        return next(new appError("please provide title with minimum 5 words", 400))
    }
    if (description.length < 10) {
        return next(new appError("please provide description with minimum 10 words", 400))

    }


    //creation
    let task = {
        title,
        description,
        tag,
        createdAt: `${new Date().toLocaleTimeString()} ${new Date().toLocaleDateString()}`,
        id: Date.now()
    }




    createtask(user.id, task)

    res.status(200).send({
        status: "success",
        message: "Task created"
    })
})


exports.getAllTask = catchAsync(async (req, res, next) => {

    const user = req.user;
    if (!user) {
        return next(new appError("please pass login key or login first to get it", 400))
    }
    // console.log("user is", user);


    res.status(200).send({
        status: "success",
        data: user?.task?.length > 0 ? user?.task : "please create the task to see it 🧑‍🏫"
    })
})



exports.getTask = catchAsync(async (req, res, next) => {

    const user = req.user;
    if (!user) {
        return next(new appError("please pass login key or login first to get it", 400))
    }
    const taskId = req.params?.taskId;
    if (!taskId) {
        return next(new appError("please enter the task id ", 400))

    }

    // if (!user?.task?.) {

    // }

    // let found = Object.values({ ...user?.task }).includes(taskId)

    // if (!found) {
    //     return next(new appError("no task found with this id  ", 400))
    // }

    let taskdata = user?.task?.filter(task => task.id == taskId)

    console.log(taskdata);






    res.status(200).send({
        status: "success",
        data: taskdata.length > 0 ? taskdata : "no task found with this id"
    })
})



exports.updateTask = catchAsync(async (req, res, next) => {

    const user = req.user;
    if (!user) {
        return next(new appError("please pass login key or login first to get it", 400))
    }
    const taskId = req.params?.taskId;
    if (!taskId) {
        return next(new appError("please enter the task id ", 400))

    }
    if (user?.task?.length == 0) {
        return next(new appError("please create the task to update it 🤣 ", 400))
    }

    const { title, description } = req.body;

    if (!title || !description) {
        return next(new appError("please provide the task title or description to update on task", 400))

    }

    if (title.length < 5) {
        return next(new appError("please provide title with minimum 5 words", 400))
    }
    if (description.length < 10) {
        return next(new appError("please provide description with minimum 10 words", 400))

    }


    let allUser = readFileData();
    let updated = false;
    allUser.map((el) => {
        if (el?.id == user?.id) {
            el.task.map(task => {
                if (task.id == taskId) {
                    task.title = title || task.title;
                    task.description = description || task.description;
                    updated = true;
                }
            })
        }
    })

    if (!updated) {
        return next(new appError("task not found invalid id", 400))
    } else {

        writeIntoFile(allUser)
    }




    res.status(200).send({
        status: "success",
        data: "task updated sucessfully"
    })
})
exports.deleteTask = catchAsync(async (req, res, next) => {

    const user = req.user;
    if (!user) {
        return next(new appError("please pass login key or login first to get it", 400))
    }
    const taskId = req.params?.taskId;
    if (!taskId) {
        return next(new appError("please enter the task id ", 400))

    }
    if (user?.task?.length == 0) {
        return next(new appError("please create the task to delete it 🤣 ", 400))
    }




    let allUser = readFileData();
    let updated = false;

    let updatedTask = user.task.filter(task => {
        if (task.id != taskId) {
            return true
        } else {
            console.log("CAME FOR DELETING");
            updated = true;
            return false
        }
    })




    allUser.map((el) => {
        if (el?.id == user?.id) {
            el.task = updatedTask
        }
    })

    if (!updated) {
        return next(new appError("task not found invalid id", 400))
    } else {

        writeIntoFile(allUser)
        res.status(200).send({
            status: "success",
            data: "task deleted sucessfully"
        })
    }





})












