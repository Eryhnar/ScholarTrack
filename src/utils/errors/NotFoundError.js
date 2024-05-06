class NotFoundError extends BaseError {
    constructor(statusCode, message) {
        super(statusCode, message);
        this.name = "NotFoundError";
        this.statusCode = statusCode;
    }
}

export default NotFoundError;