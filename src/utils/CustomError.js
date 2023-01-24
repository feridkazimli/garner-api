class CustomError extends Error{
    constructor(message,code){
        super();
        this.code = code;
        this.messages = message;
    }
}
module.exports = CustomError;