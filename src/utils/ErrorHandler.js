const ErrorHandler = (res,err, next) => {
    const errStatus = err.code || 400;
    const errMsg = err.message || 'Something went wrong';
    res.status(errStatus).json({
        status: errStatus,
        message: errMsg,
        //stack:err.stack
    });
};
module.exports = ErrorHandler;