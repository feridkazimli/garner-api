const jwt = require('jsonwebtoken')
const CustomError = require('../utils/CustomError')

const authMiddleware = async (req, res, next) => {
    const token = req.header('x-auth-token')

    if (!token) throw new CustomError('Access denied. No token provided')

    try {
        const decoded = jwt.decode(token, process.env.TOKEN_SECRET)
        req.user = decoded
        res.send('decoded', decoded)
        next()
    } catch (err) {
        res.status(401).send('Ivalid Token')
    }
}

module.exports = authMiddleware