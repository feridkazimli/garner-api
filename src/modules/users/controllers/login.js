const {
    findByEmail
} = require('../models/users')
const Handler = require('../../../utils/Handler')
const ResponseSuccess = require('../../../utils/ResponseSuccess')
const bcrypt = require('bcrypt')
const CustomError = require('../../../utils/CustomError')
const {
    v4: uuidv4
} = require('uuid');
const jwt = require('jsonwebtoken')
const {
    createRefreshToken,
    deleteRefreshToken,
    findTokenById
} = require('../models/users/')

const signInHandler = Handler(async (req, res, next) => {
    const user = await findByEmail(req.body);
    console.log(user, 'user email')

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    console.log(validPassword, 'valid password')

    if (!user.email) {
        throw new CustomError('Invalid email or password', 400)
    }

    const {
        id,
        email
    } = user

    const accessToken = jwt.sign({
        id,
        email
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '4m'
    })

    let tokenId = uuidv4()

    const refreshToken = jwt.sign({
        userId: id,
        id: tokenId
    }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '10m'
    })

    const validToken = await findTokenById(id);
    if (validToken) return await deleteRefreshToken(validToken)

    await createRefreshToken({
        id: tokenId,
        userId: id
    })

    // res.cookie('refreshToken', refreshToken, {
    //     httpOnly: true
    // })
    // res.cookie('accessToken', accessToken, {
    //     httpOnly: true
    // })


    ResponseSuccess(res, { refreshToken }, 'Successfully logged');
})


module.exports = {
    signInHandler
}