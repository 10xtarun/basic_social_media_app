class ApiError extends Error {
    constructor(statusCode, message, err) {
        super(message)
        this.statusCode = statusCode
        this.err = err

        Error.captureStackTrace(this, this.constructor)
    }
}

module.exports = ApiError