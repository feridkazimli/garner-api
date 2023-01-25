class CustomError extends Error{
    constructor(message,code){
        super(mess);
        this.code = code;
        this.messages = message;
    }
}
module.exports = CustomError;