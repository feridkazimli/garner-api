class CustomError extends Error{
    constructor(message,code){
        super();
        this.code = code;
        this.message = message;
    }
}
module.exports = CustomError;