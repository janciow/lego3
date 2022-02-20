import { CustomError } from "./custom-error";

export class NotAuthorizedError extends CustomError {
    statusCode = 401

    constructor() {
        super('Not authorized');

        // Only bescose we are extegnig a build class
        Object.setPrototypeOf(this, NotAuthorizedError.prototype)
    }

    serializeErrors() {
        return [{message: 'Not authorized'}]

    }
}