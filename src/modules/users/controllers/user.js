const _ = require('lodash')
const CustomError = require('../../../utils/CustomError')
const responseSuccess = require('../../../utils/ResponseSuccess')
const User = require('../models/user')

const postUser = async (req, res, next) => {
    const isRegistered = await User.findByEmail(req.body)

    if (isRegistered) throw new CustomError('User already registered', 400)

    const result = await User.createUser(req.body)
    const selectedItems = _.omit(result, ['password'])

    responseSuccess(res, selectedItems, 'User successfully created')
}

module.exports = {
    postUser
}