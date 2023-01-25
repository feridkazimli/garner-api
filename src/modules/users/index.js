const express = require('express')
const router = express.Router()
const { postUser } = require('../../modules/users/controllers/register')
const { auth } = require('../../modules/users/controllers/login')

router.post('/signup', postUser)
router.post('/signin', auth)

module.exports = router
