const express = require('express')
const router = express.Router()
const Handler = require('../../utils/Handler')
const { postUser } = require('../../modules/users/controllers/register')
const { auth } = require('../../modules/users/controllers/login')

router.post('/signup', Handler(postUser))
router.post('/signin', Handler(auth))

module.exports = router
