const _ = require('lodash')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dataSource = require('../configs/connect')
const User = require('../entities/Users')
const CustomError = require('../utils/CustomError')
const responseSuccess = require('../utils/ResponseSuccess')

const getUsers = async (req, res) => {
    const users = await dataSource.getRepository(User).find()
    responseSuccess(res, users, 'Users succesfully got')
}

const getUsersById = async (req, res) => {
    const user = await dataSource.getRepository(User).findOneBy({
        id: req.params.id
    })
    if (!user) throw new CustomError('User not found!', 404)

    responseSuccess(res, user)
}

const postUser = async (req, res) => {
    const isRegistered = await dataSource.getRepository(User).findOneBy({
        email: req.body.email
    })

    if (isRegistered) throw new CustomError('User already registered', 400)

    const user = dataSource.getRepository(User).create(req.body)

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)

    const result = await dataSource.getRepository(User).save(user)
    const selectedItems = _.omit(result, ['password'])

    // const token = jwt.sign({ _id: user.id }, process.env.TOKEN_SECRET)

    responseSuccess(res, selectedItems, 'User successfully created')
}

module.exports = {
    getUsers,
    getUsersById,
    postUser
}