export abstract class CustomError extends Error {
    abstract statusCode: number

    constructor(message: string ) {
        super()

        // Only bescose we are extegnig a build class
        Object.setPrototypeOf(this, CustomError.prototype)
    }

    abstract serializeErrors(): {message: string, field?: string}[]
}