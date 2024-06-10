// creating error class 
class appError extends Error {
    constructor(message, statusCode) {
        super(message);

        this.statusCode = statusCode;
        this.status = this.statusCode

    }
}


module.exports = appError;


