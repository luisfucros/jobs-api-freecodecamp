const { StatusCodes } = require('http-status-codes')
const CustomAPIError = require('./custom-error')

class BadRequestError extends CustomAPIError {
    constructor(message) {
        super(message)
        this.statuscode = StatusCodes.BAD_REQUEST
    }
}

module.exports = BadRequestError
