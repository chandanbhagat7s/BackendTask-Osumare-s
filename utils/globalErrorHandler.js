
// if their is error then we are sending the response of error

module.exports = (err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        status: err.status,
        error: err,
        msg: err.message,
        stack: err.stack
    })
};