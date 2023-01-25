const express = require('express')
const router = express.Router()
const { postUser } = require('./controllers/register')
const {signInHandler} = require('./controllers/login')
const authMiddleware = require('../../middleware/auth')
router.post('/signup', postUser)
router.post('/signin', signInHandler)

router.get('/token', authMiddleware, postUser);

module.exports = router
