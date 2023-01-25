const express = require('express')
const router = express.Router()
const { postUser } = require('./controllers/register')

router.post('/signup', postUser)


module.exports = router
