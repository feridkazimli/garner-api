const express = require('express')
const router = express.Router()
const Handler = require('../../utils/Handler')
const { postUser } = require('../../modules/users/controllers/user')

router.post('/signup', Handler(postUser))

module.exports = router
