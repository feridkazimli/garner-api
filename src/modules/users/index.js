const express = require('express')
const router = express.Router()
const { postUser } = require('./controllers/register')
const {signInHandler} = require('./controllers/login')
const authMiddleware = require('../../middleware/auth')
const { refreshToken } = require('./controllers/RefreshToken')
router.post('/signup', postUser)
router.post('/signin', signInHandler)
router.post('/reftoken',refreshToken);
router.get('/token', authMiddleware, postUser);


module.exports = router
