const express = require('express')
const router = express.Router()
const Handler = require('../utils/Handler')
const authMiddleware = require('../middleware/auth')
const { auth } = require('../controllers/auth')

router.post('/signin',  Handler(auth))

module.exports = router