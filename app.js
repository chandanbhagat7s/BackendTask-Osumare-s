
const express = require('express');
const userRoutes = require('./Routes/userRoutes');
const taskRouter = require('./Routes/todoRoutes');
const globalErrorHandler = require('./utils/globalErrorHandler');



const app = express()

// we can also use .env file
const PORT = 3000

app.use(express.json())


// i am not using database as per requirement then i will be storing it in file (/public/taskList.json)
// i am using files to store user for authentication and authorization mechanisms as per requirement 




//defining the routes 
app.use("/api/v1/user", userRoutes)
app.use("/api/v1/task", taskRouter)



// using global error handler which sends response error(with proper message and status code) thrown from the controller 
app.use(globalErrorHandler)




app.listen(PORT, () => {
    console.log("Server lisining on port : ", PORT);
})



































