const jwt = require('jsonwebtoken')
const CustomError = require('../utils/CustomError')
const Handler  = require("../utils/Handler")
const authMiddleware = Handler(async (req, res, next) => {
    const token = req.header('Authorization').split(' ')[1];

    if (!token) throw new CustomError('Access denied. No token provided')
   const verified =  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
   if (!verified) {
        throw  new CustomError("Invalid Token",400)
   }
    const decoded = jwt.decode(token, process.env.ACCESS_TOKEN_SECRET)
    req.user = decoded;
    next();
})

module.exports = authMiddleware;