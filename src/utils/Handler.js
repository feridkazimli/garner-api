const ErrorHandler = require("./ErrorHandler");
const Handler = (callback)=>{
    return async (req,res,next)=>{
        try {
            await callback(req,res,next).catch((err)=>{
                throw err;
            })
        } catch (err) {
            ErrorHandler(res,err);
        }
    }
}
module.exports = Handler;