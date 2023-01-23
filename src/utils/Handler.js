const ErrorHandler = require("./ErrorHandler");
const Handler = (callback)=>{
    return async (req,res)=>{
        try {
            await callback(req,res).catch((err)=>{
                throw err;
            })
        } catch (err) {
            ErrorHandler(res,err);
        }
    }
}
module.exports = Handler;