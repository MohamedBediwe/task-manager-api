"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Server Error';
    // Mongoose bad ObjectId
    if (err.name === 'CastError') {
        statusCode = 404;
        message = 'Resource not found';
    }
    // Mongoose duplicate key
    if (err.name === 'MongoServerError' && err.code === 11000) {
        statusCode = 400;
        message = 'Duplicate field value entered';
    }
    // Mongoose validation error
    if (err.name === 'ValidationError') {
        statusCode = 400;
        const messages = Object.values(err.errors).map((val) => val.message);
        message = `Validation Error: ${messages.join(', ')}`;
    }
    res.status(statusCode).json({
        success: false,
        message,
        stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map