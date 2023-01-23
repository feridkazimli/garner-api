const express = require('express')
const router = express.Router()
const Handler = require('../utils/Handler')
const { getUsers, getUsersById, postUser } = require('../controllers/user')

router.get('/', Handler(getUsers))
router.get('/byId/:id', Handler(getUsersById))
router.post('/signup', Handler(postUser))

module.exports = router
