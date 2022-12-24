const ResponseSuccess = (res, successData, msg) => {
    return res.status(200).json({
        message: msg,
        data: successData
    });
}
module.exports  = ResponseSuccess;