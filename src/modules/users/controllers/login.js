const {
    findByEmail
} = require('../models/users')
const Handler = require('../../../utils/Handler')
const ResponseSuccess = require('../../../utils/ResponseSuccess')
const bcrypt = require('bcrypt')
const CustomError = require('../../../utils/CustomError')
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken')
const {
    createRefreshToken,
    deleteRefreshToken,
    findTokenById
} = require('../models/users/')

const signInHandler = Handler(async (req, res, next) => {
    const user = await findByEmail(req.body);

    if (!user) throw new CustomError('Invalid email or password', 400)

    const tokenId = uuidv4()

    const validPassword = await bcrypt.compare(req.body.password, user.password)

    if (!validPassword) throw new CustomError('Invalid email or password', 400)

    const { id, email } = user
    console.log(id)
    const accessToken = jwt.sign({
        id,
        email
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '4m' })

    const refreshToken = jwt.sign({
        userId: id,
        id: tokenId
    }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '10m'
    })

    const validToken = await findTokenById(id);

    if (validToken) {
        await deleteRefreshToken(validToken)
    }

    await createRefreshToken({
        id: tokenId,
        userId: user.id
    })

<<<<<<< HEAD
    // res.cookie('refreshToken', refreshToken, {
    //     httpOnly: true
    // })
    // res.cookie('accessToken', accessToken, {
    //     httpOnly: true
    // })


    ResponseSuccess(res, { refreshToken }, 'Successfully logged');
=======
    ResponseSuccess(res, { accessToken, refreshToken }, 'Successfully logged')
>>>>>>> b15d65719e3fed56d777a68702030371c4c78e45
})

module.exports = {
    signInHandler
}