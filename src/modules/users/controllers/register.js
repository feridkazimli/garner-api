const lodash = require('lodash')
const CustomError = require('../../../utils/CustomError')
const responseSuccess = require('../../../utils/ResponseSuccess')
const User = require('../models/users/index')
const Handler = require('../../../utils/Handler')

const postUser = Handler(async (req, res, next) => {
    const isRegistered = await User.findByEmail(req.body)

    if (isRegistered) throw new CustomError('User already registered', 400)

    const result = await User.createUser(req.body)
    const selectedItems = lodash.omit(result, ['password'])

    responseSuccess(res, [selectedItems, isRegistered], 'User successfully created')
});

module.exports = {
    postUser
}