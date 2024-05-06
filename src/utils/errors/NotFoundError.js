class NotFoundError extends Error {
    constructor(statusCode, message) {
        super(statusCode, message);
        this.name = "NotFoundError";
        this.statusCode = statusCode;
    }
}

export default NotFoundError;